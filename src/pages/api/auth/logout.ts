import type { APIRoute } from 'astro';
export const prerender = false;

import { destroySession } from '../../../lib/auth';
import { checkOrigin } from '../../../lib/security';

export const POST: APIRoute = async ({ request }) => {
  if (!checkOrigin(request, import.meta.env.SITE_URL)) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  await destroySession(request);

  const isSecure = import.meta.env.PROD;
  const cookieFlags = `HttpOnly; SameSite=Lax; Path=/; Max-Age=0${isSecure ? '; Secure' : ''}`;

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Set-Cookie': `session=; ${cookieFlags}`,
    },
  });
};
