import type { APIRoute } from 'astro';
export const prerender = false;

import { db } from '../../../db/index';
import { topicRequests } from '../../../db/schema';
import { checkOrigin, hashIp, sanitizeText } from '../../../lib/security';
import { checkIpRateLimit } from '../../../lib/rate-limit';
import { TopicRequestInput } from '../../../lib/validate';

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

  const parsed = TopicRequestInput.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: 'Invalid input', details: parsed.error.flatten() }),
      { status: 400 },
    );
  }

  const { topicName, reason, website, _ts } = parsed.data;

  // Honeypot check — silently accept if bot fills hidden field
  if (website) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  // Timing check — reject if submitted in under 2 seconds
  if (_ts && Date.now() - _ts < 2000) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  // Rate limit: 3 requests per IP per 24 hours
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-client-ip')
    || 'unknown';
  const ipHash = await hashIp(ip);

  const withinLimit = await checkIpRateLimit(ipHash, 3, 24);
  if (!withinLimit) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Try again tomorrow.' }),
      { status: 429 },
    );
  }

  await db.insert(topicRequests).values({
    topicName: sanitizeText(topicName),
    reason: sanitizeText(reason),
    ipHash,
  });

  return new Response(JSON.stringify({ ok: true }), { status: 201 });
};
