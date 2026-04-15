import type { APIRoute } from 'astro';
export const prerender = false;

import { db } from '../../db/index';
import { topicWatches } from '../../db/schema';
import { eq, and } from 'drizzle-orm';
import { getSessionUser } from '../../lib/auth';
import { checkOrigin } from '../../lib/security';

export const GET: APIRoute = async ({ request, url }) => {
  const user = await getSessionUser(request);
  if (!user) {
    return new Response(JSON.stringify({ watching: false }), { status: 200 });
  }

  const topicId = url.searchParams.get('topic_id');
  if (!topicId) {
    return new Response(JSON.stringify({ error: 'topic_id required' }), { status: 400 });
  }

  const rows = await db
    .select()
    .from(topicWatches)
    .where(and(eq(topicWatches.userId, user.id), eq(topicWatches.topicId, topicId)))
    .limit(1);

  return new Response(JSON.stringify({ watching: rows.length > 0 }), { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
  if (!checkOrigin(request, import.meta.env.SITE_URL)) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const user = await getSessionUser(request);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Authentication required' }), { status: 401 });
  }

  let body: { topicId?: string; action?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const topicId = body.topicId?.trim();
  const action = body.action;
  if (!topicId) {
    return new Response(JSON.stringify({ error: 'topicId required' }), { status: 400 });
  }

  if (action === 'unwatch') {
    await db
      .delete(topicWatches)
      .where(and(eq(topicWatches.userId, user.id), eq(topicWatches.topicId, topicId)));
    return new Response(JSON.stringify({ watching: false }), { status: 200 });
  }

  // Watch — upsert
  const existing = await db
    .select()
    .from(topicWatches)
    .where(and(eq(topicWatches.userId, user.id), eq(topicWatches.topicId, topicId)))
    .limit(1);

  if (existing.length === 0) {
    await db.insert(topicWatches).values({ userId: user.id, topicId });
  }

  return new Response(JSON.stringify({ watching: true }), { status: 200 });
};
