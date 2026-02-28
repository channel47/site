/**
 * Skill Delivery Endpoint
 *
 * Called after user submits email. Subscribes user via Kit and returns
 * skill content for client-side download.
 *
 * v1 note: skill content is generated on the client from the form payload.
 * Future: switch to server-side skill storage keyed by conversation ID.
 */

import type { APIRoute } from 'astro';

export const prerender = false;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_SKILL_CONTENT_LENGTH = 200000;
const MAX_META_LENGTH = 1000;
const REQUEST_TIMEOUT_MS = 10000;

function isValidEmail(email: string): boolean {
  if (!email || email.length > MAX_EMAIL_LENGTH) return false;
  return EMAIL_REGEX.test(email);
}

function sanitizeText(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, maxLength).replace(/[<>\"']/g, '');
}

function buildFilename(skillName?: string): string {
  const fallback = 'my-skill.skill';
  if (!skillName) return fallback;
  const base = skillName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
  return base ? `${base}.skill` : fallback;
}

function createResponse(body: object, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    }
  });
}

export const POST: APIRoute = async ({ request }) => {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host) {
    const originHost = new URL(origin).host;
    if (originHost !== host) {
      return createResponse({ error: 'Forbidden', message: 'Cross-origin requests not allowed' }, 403);
    }
  }

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return createResponse({ error: 'Invalid content type' }, 415);
  }

  let body: {
    email?: string;
    skill_content?: string;
    metadata?: {
      role?: string;
      platform?: string;
      workflow?: string;
      skillName?: string;
    };
  };

  try {
    body = await request.json();
  } catch {
    return createResponse({ error: 'Invalid JSON' }, 400);
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!isValidEmail(email)) {
    return createResponse({ error: 'Invalid email' }, 400);
  }

  const skillContent = typeof body.skill_content === 'string' ? body.skill_content : '';
  if (!skillContent || skillContent.length > MAX_SKILL_CONTENT_LENGTH) {
    return createResponse({ error: 'Invalid skill content' }, 400);
  }

  const metadata = {
    role: sanitizeText(body.metadata?.role, MAX_META_LENGTH),
    platform: sanitizeText(body.metadata?.platform, MAX_META_LENGTH),
    workflow: sanitizeText(body.metadata?.workflow, MAX_META_LENGTH),
    skillName: sanitizeText(body.metadata?.skillName, 120)
  };

  const API_KEY = import.meta.env.KIT_API_KEY;
  if (API_KEY) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      await fetch('https://api.kit.com/v4/subscribers', {
        method: 'POST',
        headers: {
          'X-Kit-Api-Key': API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email_address: email,
          fields: {
            signup_source: 'skill_builder',
            signup_context: 'skill-builder',
            ...(metadata.role && { build_role: metadata.role }),
            ...(metadata.platform && { build_tool: metadata.platform }),
            ...(metadata.workflow && { build_task: metadata.workflow })
          }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
    } catch (err) {
      console.error('Kit subscription error:', err);
      // Do not block skill delivery if Kit is unavailable.
    }
  }

  return createResponse(
    {
      success: true,
      skill: skillContent,
      filename: buildFilename(metadata.skillName)
    },
    200
  );
};
