export async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function hashIp(ip: string): Promise<string> {
  return hashToken(ip);
}

export function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function checkOrigin(request: Request, siteUrl: string): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true; // Same-origin requests may not have Origin header
  try {
    const requestOrigin = new URL(origin).origin;
    const siteOrigin = new URL(siteUrl).origin;
    return requestOrigin === siteOrigin;
  } catch {
    return false;
  }
}

const PUBMED_URL_REGEX = /^https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/\d+\/?$/;

export function isValidPubmedUrl(url: string): boolean {
  return PUBMED_URL_REGEX.test(url);
}

export function sanitizeText(text: string): string {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim();
}
