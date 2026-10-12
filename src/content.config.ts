import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const articles = defineCollection({ loader: glob({pattern:'**/*.md',base:'./src/content/articles'}), schema: z.object({ title:z.string(), description:z.string(), category:z.enum(['guides','blog','glossary']), published:z.string(), updated:z.string(), tags:z.array(z.string()), sources:z.array(z.url()), draft:z.boolean().default(false) }) });
const reviews = defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/reviews'}),schema:z.object({title:z.string(),description:z.string(),brand:z.string(),published:z.string(),updated:z.string(),draft:z.boolean().default(true),evidence:z.array(z.string()).default([]),conclusion:z.string(),sources:z.array(z.url())})});
export const collections = { articles, reviews };
