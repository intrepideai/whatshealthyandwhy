import type { APIRoute } from 'astro';
export const prerender = false;

import { db } from '../../../db/index';
import { challenges, users } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing challenge ID' }), { status: 400 });
  }

  const rows = await db
    .select({
      id: challenges.id,
      topicId: challenges.topicId,
      status: challenges.status,
      claim: challenges.claim,
      counterEvidence: challenges.counterEvidence,
      pubmedUrl: challenges.pubmedUrl,
      sourceUrls: challenges.sourceUrls,
      reviewerNotes: challenges.reviewerNotes,
      createdAt: challenges.createdAt,
      resolvedAt: challenges.resolvedAt,
      userDisplayName: users.displayName,
      userEmail: users.email,
    })
    .from(challenges)
    .innerJoin(users, eq(challenges.userId, users.id))
    .where(eq(challenges.id, id))
    .limit(1);

  if (rows.length === 0) {
    return new Response(JSON.stringify({ error: 'Challenge not found' }), { status: 404 });
  }

  const row = rows[0];
  return new Response(
    JSON.stringify({
      challenge: {
        ...row,
        submittedBy: row.userDisplayName || row.userEmail.split('@')[0],
      },
    }),
    { status: 200 },
  );
};
