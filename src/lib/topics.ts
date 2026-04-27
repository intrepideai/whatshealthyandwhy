import { getCollection } from 'astro:content';

export interface TopicSummary {
  slug: string;
  name: string;
  description: string;
  subtopicCount: number;
}

let cache: Map<string, TopicSummary> | null = null;

function topicNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export async function loadTopicMap(): Promise<Map<string, TopicSummary>> {
  if (cache) return cache;

  const allSubtopics = await getCollection('topics');
  const map = new Map<string, TopicSummary>();

  for (const entry of allSubtopics) {
    const name = entry.data.topic;
    const slug = topicNameToSlug(name);
    if (!map.has(slug)) {
      map.set(slug, { slug, name, description: '', subtopicCount: 0 });
    }
    const topic = map.get(slug)!;
    topic.subtopicCount++;
    if (topic.subtopicCount === 1 || entry.data.order === 1) {
      topic.description = entry.data.description;
    }
  }

  cache = map;
  return map;
}

export async function resolveTopics(slugs: string[]): Promise<TopicSummary[]> {
  const map = await loadTopicMap();
  return slugs
    .map((s) => map.get(s))
    .filter((t): t is TopicSummary => Boolean(t));
}

export function sortByName<T extends { name: string }>(items: T[]): T[] {
  return [...items].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
  );
}
