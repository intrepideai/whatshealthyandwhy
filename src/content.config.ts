import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const topics = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/topics' }),
  schema: z.object({
    topic: z.string(),
    title: z.string(),
    order: z.number(),
    description: z.string(),
    level: z.number().optional(),
    references: z.array(
      z.object({
        id: z.string(),
        pmid: z.string().optional(),
        url: z.string().optional(),
        title: z.string(),
        authors: z.string(),
        year: z.number(),
        journal: z.string(),
      })
    ),
  }),
});

export const collections = { topics };
