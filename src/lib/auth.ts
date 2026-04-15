import { db } from '../db/index';
import { users, sessions, magicLinks } from '../db/schema';
import { eq, and, gt, isNull } from 'drizzle-orm';
import { hashToken, generateToken } from './security';
import { sendMagicLinkEmail } from './email';

const MAGIC_LINK_EXPIRY_MINUTES = 15;
const SESSION_EXPIRY_DAYS = 30;

export async function createMagicLink(email: string): Promise<void> {
  const token = generateToken();
  const tokenHash = await hashToken(token);
  const expiresAt = new Date(Date.now() + MAGIC_LINK_EXPIRY_MINUTES * 60 * 1000);

  await db.insert(magicLinks).values({
    email,
    tokenHash,
    expiresAt,
  });

  await sendMagicLinkEmail(email, token);
}

export async function verifyMagicLink(
  token: string,
): Promise<{ email: string } | null> {
  const tokenHash = await hashToken(token);

  const rows = await db
    .select()
    .from(magicLinks)
    .where(
      and(
        eq(magicLinks.tokenHash, tokenHash),
        gt(magicLinks.expiresAt, new Date()),
        isNull(magicLinks.usedAt),
      ),
    )
    .limit(1);

  if (rows.length === 0) return null;

  await db
    .update(magicLinks)
    .set({ usedAt: new Date() })
    .where(eq(magicLinks.id, rows[0].id));

  return { email: rows[0].email };
}

export async function createSession(
  userId: string,
): Promise<string> {
  const token = generateToken();
  const tokenHash = await hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

  await db.insert(sessions).values({
    userId,
    tokenHash,
    expiresAt,
  });

  return token;
}

export async function getSessionUser(
  request: Request,
): Promise<{ id: string; email: string; displayName: string | null; trustLevel: number } | null> {
  const cookies = request.headers.get('cookie');
  if (!cookies) return null;

  const sessionToken = cookies
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('session='))
    ?.split('=')[1];

  if (!sessionToken) return null;

  const tokenHash = await hashToken(sessionToken);

  const rows = await db
    .select({
      id: users.id,
      email: users.email,
      displayName: users.displayName,
      trustLevel: users.trustLevel,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(eq(sessions.tokenHash, tokenHash), gt(sessions.expiresAt, new Date())))
    .limit(1);

  if (rows.length === 0) return null;
  return rows[0];
}

export async function findOrCreateUser(
  email: string,
): Promise<{ id: string }> {
  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing.length > 0) return existing[0];

  const inserted = await db
    .insert(users)
    .values({ email })
    .returning({ id: users.id });

  return inserted[0];
}

export async function destroySession(request: Request): Promise<void> {
  const cookies = request.headers.get('cookie');
  if (!cookies) return;

  const sessionToken = cookies
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('session='))
    ?.split('=')[1];

  if (!sessionToken) return;

  const tokenHash = await hashToken(sessionToken);
  await db.delete(sessions).where(eq(sessions.tokenHash, tokenHash));
}
