import type { APIRoute } from 'astro';
export const prerender = false;

import { db } from '../../db/index';
import { emailSubscriptions } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { checkOrigin, hashIp } from '../../lib/security';
import { z } from 'astro/zod';

const SubscribeInput = z.object({
  email: z.string().email().max(254),
});

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

  const parsed = SubscribeInput.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
  }

  const { email } = parsed.data;

  // Upsert — reactivate if previously unsubscribed
  const existing = await db
    .select()
    .from(emailSubscriptions)
    .where(eq(emailSubscriptions.email, email))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(emailSubscriptions)
      .set({ digestEnabled: true, unsubscribedAt: null })
      .where(eq(emailSubscriptions.email, email));
  } else {
    await db.insert(emailSubscriptions).values({ email });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
