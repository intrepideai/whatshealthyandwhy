import { z } from 'astro/zod';

export const MagicLinkInput = z.object({
  email: z.string().email().max(254),
});

export const ChallengeInput = z.object({
  topicId: z.string().min(1).max(200),
  claim: z.string().min(10).max(2000),
  counterEvidence: z.string().min(20).max(5000),
  pubmedUrl: z
    .string()
    .regex(/^https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/\d+\/?$/, 'Must be a valid PubMed URL')
    .optional()
    .or(z.literal('')),
  sourceUrls: z
    .array(z.string().url().max(2000))
    .max(5)
    .optional(),
});

export const TopicRequestInput = z.object({
  topicName: z.string().min(2).max(200),
  reason: z.string().min(10).max(2000),
  website: z.string().optional(), // honeypot
  _ts: z.number().optional(), // timestamp for timing check
});
