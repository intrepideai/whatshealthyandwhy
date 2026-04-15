import { db } from '../db/index';
import { topicRequests, challenges, magicLinks } from '../db/schema';
import { eq, and, gt, sql } from 'drizzle-orm';

export async function checkIpRateLimit(
  ipHash: string,
  maxRequests: number,
  windowHours: number,
): Promise<boolean> {
  const since = new Date(Date.now() - windowHours * 60 * 60 * 1000);
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(topicRequests)
    .where(and(eq(topicRequests.ipHash, ipHash), gt(topicRequests.createdAt, since)));
  return (result[0]?.count ?? 0) < maxRequests;
}

export async function checkUserChallengeRateLimit(
  userId: string,
  maxRequests: number,
  windowHours: number,
): Promise<boolean> {
  const since = new Date(Date.now() - windowHours * 60 * 60 * 1000);
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(challenges)
    .where(and(eq(challenges.userId, userId), gt(challenges.createdAt, since)));
  return (result[0]?.count ?? 0) < maxRequests;
}

export async function checkMagicLinkRateLimit(
  email: string,
  maxRequests: number,
  windowHours: number,
): Promise<boolean> {
  const since = new Date(Date.now() - windowHours * 60 * 60 * 1000);
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(magicLinks)
    .where(and(eq(magicLinks.email, email), gt(magicLinks.createdAt, since)));
  return (result[0]?.count ?? 0) < maxRequests;
}
