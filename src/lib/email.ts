import { EmailClient } from '@azure/communication-email';

let emailClient: EmailClient | null = null;

function getClient(): EmailClient {
  if (!emailClient) {
    emailClient = new EmailClient(import.meta.env.ACS_CONNECTION_STRING);
  }
  return emailClient;
}

export async function sendMagicLinkEmail(to: string, token: string): Promise<void> {
  const verifyUrl = `${import.meta.env.SITE_URL}/api/auth/verify?token=${token}`;
  const client = getClient();

  const poller = await client.beginSend({
    senderAddress: import.meta.env.ACS_SENDER_ADDRESS || 'DoNotReply@whatshealthyandwhy.com',
    content: {
      subject: "Sign in to What's Healthy and Why",
      plainText: `Click to sign in:\n\n${verifyUrl}\n\nThis link expires in 15 minutes. If you didn't request this, you can safely ignore it.`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 2rem;">
          <h2 style="color: #2a7d4f; margin-bottom: 1.5rem;">Sign in to What's Healthy and Why</h2>
          <p style="color: #333; line-height: 1.6;">Click the button below to sign in. This link expires in 15 minutes.</p>
          <a href="${verifyUrl}" style="display: inline-block; background: #2a7d4f; color: #fff; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; margin: 1.5rem 0;">Sign in</a>
          <p style="color: #666; font-size: 0.875rem; line-height: 1.5;">If you didn't request this, you can safely ignore this email.</p>
          <p style="color: #999; font-size: 0.75rem; margin-top: 2rem;">whatshealthyandwhy.com</p>
        </div>
      `,
    },
    recipients: { to: [{ address: to }] },
  });

  await poller.pollUntilDone();
}
