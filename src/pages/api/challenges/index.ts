import type { APIRoute } from 'astro';
export const prerender = false;

import { db } from '../../../db/index';
import { challenges } from '../../../db/schema';
import { eq, and, desc, inArray } from 'drizzle-orm';
import { getSessionUser } from '../../../lib/auth';
import { checkOrigin, sanitizeText, isValidPubmedUrl } from '../../../lib/security';
import { checkUserChallengeRateLimit } from '../../../lib/rate-limit';
import { ChallengeInput } from '../../../lib/validate';

export const GET: APIRoute = async ({ url, request }) => {
  const topicId = url.searchParams.get('topic_id');
  const userFilter = url.searchParams.get('user');

  if (userFilter === 'me') {
    const user = await getSessionUser(request);
    if (!user) {
      return new Response(JSON.stringify({ challenges: [] }), { status: 401 });
    }

    const rows = await db
      .select()
      .from(challenges)
      .where(eq(challenges.userId, user.id))
      .orderBy(desc(challenges.createdAt))
      .limit(50);

    return new Response(JSON.stringify({ challenges: rows }), { status: 200 });
  }

  if (!topicId) {
    return new Response(JSON.stringify({ error: 'topic_id is required' }), { status: 400 });
  }

  const statusFilter = url.searchParams.get('status');
  const statuses = statusFilter ? statusFilter.split(',') : ['submitted', 'under_review'];

  const rows = await db
    .select({
      id: challenges.id,
      topicId: challenges.topicId,
      status: challenges.status,
      claim: challenges.claim,
      counterEvidence: challenges.counterEvidence,
      pubmedUrl: challenges.pubmedUrl,
      sourceUrls: challenges.sourceUrls,
      createdAt: challenges.createdAt,
    })
    .from(challenges)
    .where(and(eq(challenges.topicId, topicId), inArray(challenges.status, statuses)))
    .orderBy(desc(challenges.createdAt))
    .limit(50);

  return new Response(JSON.stringify({ challenges: rows, count: rows.length }), { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
  if (!checkOrigin(request, import.meta.env.SITE_URL)) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const user = await getSessionUser(request);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Authentication required' }), { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const parsed = ChallengeInput.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: 'Invalid input', details: parsed.error.flatten() }),
      { status: 400 },
    );
  }

  const { topicId, claim, counterEvidence, pubmedUrl, sourceUrls } = parsed.data;

  // Validate PubMed URL if provided
  if (pubmedUrl && pubmedUrl !== '' && !isValidPubmedUrl(pubmedUrl)) {
    return new Response(JSON.stringify({ error: 'Invalid PubMed URL' }), { status: 400 });
  }

  // Rate limit: 5 challenges per user per 24 hours
  const withinLimit = await checkUserChallengeRateLimit(user.id, 5, 24);
  if (!withinLimit) {
    return new Response(
      JSON.stringify({ error: 'Too many challenges submitted. Try again tomorrow.' }),
      { status: 429 },
    );
  }

  const [inserted] = await db
    .insert(challenges)
    .values({
      userId: user.id,
      topicId,
      claim: sanitizeText(claim),
      counterEvidence: sanitizeText(counterEvidence),
      pubmedUrl: pubmedUrl && pubmedUrl !== '' ? pubmedUrl : null,
      sourceUrls: sourceUrls?.filter((u) => u.length > 0) ?? null,
    })
    .returning({ id: challenges.id });

  return new Response(JSON.stringify({ id: inserted.id }), { status: 201 });
};
