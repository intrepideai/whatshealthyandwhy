import type { APIRoute } from 'astro';
export const prerender = false;

import { verifyMagicLink, findOrCreateUser, createSession } from '../../../lib/auth';

export const GET: APIRoute = async ({ url }) => {
  const token = url.searchParams.get('token');

  if (!token) {
    return new Response(null, {
      status: 302,
      headers: { Location: '/login?error=missing-token' },
    });
  }

  const result = await verifyMagicLink(token);

  if (!result) {
    return new Response(null, {
      status: 302,
      headers: { Location: '/login?error=invalid-or-expired' },
    });
  }

  const user = await findOrCreateUser(result.email);
  const sessionToken = await createSession(user.id);

  const isSecure = import.meta.env.PROD;
  const cookieFlags = `HttpOnly; SameSite=Lax; Path=/; Max-Age=${30 * 24 * 60 * 60}${isSecure ? '; Secure' : ''}`;

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/profile',
      'Set-Cookie': `session=${sessionToken}; ${cookieFlags}`,
    },
  });
};
