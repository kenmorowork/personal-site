import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Content collections — the site's publishing layer.
// Every item is ONE Markdown file with frontmatter; pages render from
// these collections automatically. See AGENTS.md for the full rules.
//
// `lang` separates the Japanese and English trees: each item exists as
// a ja file and an en file, and each language's pages only show items
// in their own language.

const lang = z.enum(['ja', 'en']);

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    sector: z.string(),
    summary: z.string(),
    externalUrl: z.string(),
    lang,
  }),
});

const reports = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reports' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    ticker: z.string(),
    sector: z.string(),
    date: z.coerce.date(),
    type: z.enum(['initiation', 'update']),
    externalUrl: z.string(),
    lang,
    // J-Core publishes no ratings or target prices (see /ja/policy/).
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    kind: z.string(),
    summary: z.string(),
    externalUrl: z.string(),
    lang,
  }),
});

const fieldnotes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/fieldnotes' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    no: z.number(),
    group: z.enum(['industrials', 'materials', 'energy']),
    date: z.coerce.date(),
    lang,
  }),
});

export const collections = { news, reports, portfolio, fieldnotes };
