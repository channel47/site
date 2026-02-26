import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tag: z.enum(['breakdown', 'story', 'guide']),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const tools = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    type: z.enum(['skill', 'mcp', 'subagent', 'plugin']),
    author: z.string(),
    source: z.enum(['channel47', 'curated', 'community']),
    repo: z.string().url().optional(),
    install: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { notes, tools };
