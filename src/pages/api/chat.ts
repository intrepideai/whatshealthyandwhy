import type { APIRoute } from 'astro';
export const prerender = false;

import Anthropic from '@anthropic-ai/sdk';
import { checkOrigin } from '../../lib/security';

const SYSTEM_PROMPT = `You are a helpful health research assistant for the website "What's Healthy and Why" — a site that presents peer-reviewed PubMed research in an accessible format.

Your role:
- Answer health questions based on scientific evidence
- Reference PubMed studies when possible (include PMID numbers)
- Be honest about what's well-researched vs preliminary
- Suggest relevant topics the user can read on the site (link format: /topic-slug/subtopic-slug)
- Keep responses concise — 2-4 paragraphs max
- Always note that this is not medical advice

You cover: supplements, foods, environmental health (plastics, PFAS, pesticides), natural remedies, sleep, exercise, gut health, and more. Always prioritize accuracy over comprehensiveness.`;

export const POST: APIRoute = async ({ request }) => {
  if (!checkOrigin(request, import.meta.env.SITE_URL)) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'AI service not configured' }), { status: 503 });
  }

  let body: { question?: string; history?: { role: string; content: string }[] };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const question = body.question?.trim();
  if (!question || question.length > 2000) {
    return new Response(JSON.stringify({ error: 'Invalid question' }), { status: 400 });
  }

  const messages: { role: 'user' | 'assistant'; content: string }[] = [];

  // Include recent conversation history if provided (max 10 messages)
  if (body.history && Array.isArray(body.history)) {
    for (const msg of body.history.slice(-10)) {
      if ((msg.role === 'user' || msg.role === 'assistant') && typeof msg.content === 'string') {
        messages.push({ role: msg.role, content: msg.content.slice(0, 2000) });
      }
    }
  }

  messages.push({ role: 'user', content: question });

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('');

    return new Response(JSON.stringify({ answer: text }), { status: 200 });
  } catch (err) {
    console.error('Chat API error:', err);
    return new Response(JSON.stringify({ error: 'Failed to generate response' }), { status: 500 });
  }
};
