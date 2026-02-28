/**
 * Skill Generation API Endpoint
 *
 * Receives ElevenLabs post-call webhook with conversation transcript.
 * Generates a .skill file using Claude API with skill-creator context.
 * Stores result for email delivery.
 *
 * Required environment variables:
 * - ELEVENLABS_WEBHOOK_SECRET: HMAC verification secret
 * - ANTHROPIC_API_KEY: Claude API key for skill generation
 */

import type { APIRoute } from 'astro';

export const prerender = false;

const REQUEST_TIMEOUT_MS = 60000; // 60s - generation can take a while

/**
 * Verify ElevenLabs webhook HMAC signature
 */
async function verifySignature(body: string, signature: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign'
  ]);
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
  const expected = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return expected === signature;
}

/**
 * Build the skill-generation system prompt
 */
function buildSystemPrompt(role: string, platform: string, workflow: string, transcript: string): string {
  return `You are a skill creator for Claude Code and Cowork. Your job is to generate a complete, production-ready .skill file (SKILL.md format) based on the user's context.

## User Context
- Role: ${role}
- Platform/tools: ${platform}
- Workflow to automate: ${workflow}

## Voice Conversation Transcript
${transcript}

## Output Requirements

Generate a complete SKILL.md file with:

1. **YAML frontmatter** with name and description fields. The description should be specific and include triggering phrases.
2. **Markdown body** with clear, imperative instructions for what Claude should do when this skill is invoked.
3. Structure the skill with: purpose, when to use, step-by-step process, output format, and edge cases.
4. Write in imperative/infinitive form (verb-first), not second person.
5. Keep it under 500 lines. Be specific and actionable, not generic.
6. Include references to the user's specific platform and tools.

## Format

Return ONLY the SKILL.md content. Start with the YAML frontmatter fence (---). No explanation text before or after.`;
}

/**
 * Creates response with security headers
 */
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
  const WEBHOOK_SECRET = import.meta.env.ELEVENLABS_WEBHOOK_SECRET;
  const ANTHROPIC_KEY = import.meta.env.ANTHROPIC_API_KEY;

  if (!WEBHOOK_SECRET || !ANTHROPIC_KEY) {
    console.error('Missing required environment variables');
    return createResponse({ error: 'Server configuration error' }, 500);
  }

  const rawBody = await request.text();

  const signature = request.headers.get('x-elevenlabs-signature') || '';
  if (signature) {
    const valid = await verifySignature(rawBody, signature, WEBHOOK_SECRET);
    if (!valid) {
      return createResponse({ error: 'Invalid signature' }, 401);
    }
  }

  let payload: {
    transcript?: Array<{ role: string; message: string }>;
    dynamic_variables?: { user_role?: string; user_platform?: string; user_workflow?: string };
  };
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return createResponse({ error: 'Invalid JSON' }, 400);
  }

  const transcript =
    payload.transcript?.map((t) => `${t.role}: ${t.message}`).join('\n') || '';

  const dynamicVars = payload.dynamic_variables || {};
  const role = dynamicVars.user_role || 'Unknown';
  const platform = dynamicVars.user_platform || 'Unknown';
  const workflow = dynamicVars.user_workflow || 'Unknown';

  if (!transcript && !workflow) {
    return createResponse({ error: 'No transcript or workflow data' }, 400);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20241022',
        max_tokens: 4096,
        system: buildSystemPrompt(role, platform, workflow, transcript),
        messages: [
          {
            role: 'user',
            content: 'Generate the SKILL.md file based on the context provided.'
          }
        ]
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Claude API error:', response.status, errorData);
      return createResponse({ error: 'Skill generation failed' }, 502);
    }

    const data: { content?: Array<{ text?: string }> } = await response.json();
    const skillContent = data.content?.[0]?.text || '';

    if (!skillContent) {
      return createResponse({ error: 'Empty skill generated' }, 500);
    }

    return createResponse(
      {
        success: true,
        skill: skillContent,
        metadata: { role, platform, workflow }
      },
      200
    );
  } catch (err: unknown) {
    if ((err as { name?: string })?.name === 'AbortError') {
      console.error('Claude API timeout');
      return createResponse({ error: 'Generation timeout' }, 504);
    }
    console.error('Generation error:', err);
    return createResponse({ error: 'Server error' }, 500);
  }
};
