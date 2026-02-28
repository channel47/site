/**
 * Skill Delivery Endpoint
 *
 * Called after user submits email. Looks up the generated skill
 * by conversation_id, subscribes user via Kit, and returns the
 * skill content for client-side download.
 *
 * For v1: skill content is passed directly from the client
 * (stored in sessionStorage after webhook response).
 * Future: server-side storage with conversation_id lookup.
 */

import type { APIRoute } from 'astro';

export const prerender = false;

function createResponse(body: object, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}

export const POST: APIRoute = async ({ request }) => {
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

  const { email, skill_content: skillContent, metadata } = body;

  if (!email || !skillContent) {
    return createResponse({ error: 'Email and skill content required' }, 400);
  }

  const API_KEY = import.meta.env.KIT_API_KEY;
  if (API_KEY) {
    try {
      await fetch('https://api.kit.com/v4/subscribers', {
        method: 'POST',
        headers: {
          'X-Kit-Api-Key': API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email_address: email.trim().toLowerCase(),
          fields: {
            signup_source: 'skill_builder',
            signup_context: 'skill-builder',
            ...(metadata?.role && { build_role: metadata.role }),
            ...(metadata?.platform && { build_tool: metadata.platform }),
            ...(metadata?.workflow && { build_task: metadata.workflow })
          }
        })
      });
    } catch (err) {
      console.error('Kit subscription error:', err);
    }
  }

  return createResponse(
    {
      success: true,
      skill: skillContent,
      filename: metadata?.skillName
        ? `${metadata.skillName.toLowerCase().replace(/\s+/g, '-')}.skill`
        : 'my-skill.skill'
    },
    200
  );
};
