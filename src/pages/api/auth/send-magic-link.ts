import type { APIRoute } from 'astro';
export const prerender = false;

import { MagicLinkInput } from '../../../lib/validate';
import { checkOrigin } from '../../../lib/security';
import { checkMagicLinkRateLimit } from '../../../lib/rate-limit';
import { createMagicLink } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  if (!checkOrigin(request, import.meta.env.SITE_URL)) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const parsed = MagicLinkInput.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
  }

  const { email } = parsed.data;

  const withinLimit = await checkMagicLinkRateLimit(email, 5, 1);
  if (!withinLimit) {
    return new Response(JSON.stringify({ error: 'Too many requests. Try again later.' }), { status: 429 });
  }

  try {
    await createMagicLink(email);
  } catch (err) {
    console.error('Failed to send magic link:', err);
    // Don't reveal whether the email exists or not
  }

  // Always return success to prevent email enumeration
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
