import type { APIRoute } from 'astro';
export const prerender = false;

import { getSessionUser } from '../../../lib/auth';

export const GET: APIRoute = async ({ request }) => {
  const user = await getSessionUser(request);

  if (!user) {
    return new Response(JSON.stringify({ user: null }), { status: 401 });
  }

  return new Response(
    JSON.stringify({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        trustLevel: user.trustLevel,
      },
    }),
    { status: 200 },
  );
};
