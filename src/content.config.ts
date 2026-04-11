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
    confidence: z.number().min(1).max(5).optional(),
    confidenceNote: z.string().optional(),
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

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    brand: z.string(),
    category: z.string(),
    image: z.string(),
    price: z.string(),
    size: z.string().optional(),
    origin: z.string().optional(),
    certifications: z.array(z.string()).optional(),
    url: z.string(),
    relatedTopics: z.array(z.string()).optional(),
  }),
});

export const collections = { topics, products };
