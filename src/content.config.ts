import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * The site is bilingual: English is the default and every entry is written in
 * English. Add an optional `es:` block to translate an entry — any field left
 * out of it falls back to the English one.
 *
 * Files whose name starts with `_` are ignored, so `_example.md` in each
 * content folder is a template to copy rather than a live entry.
 */
const worksTranslation = z
  .object({
    title: z.string().optional(),
    medium: z.string().optional(),
    size: z.string().optional(),
    summary: z.string().optional(),
  })
  .optional();

/**
 * Works: one markdown file per artwork in `src/content/works/`.
 * The markdown body is optional and unused — all display data lives in the
 * frontmatter so a new work is just a new file.
 */
const works = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    medium: z.string(),
    year: z.number(),
    /** Physical dimensions, e.g. "120 x 90 cm". */
    size: z.string(),
    /** Optional longer text shown on the work detail page. */
    summary: z.string().optional(),
    /**
     * Image for the work. Leave it out and a placehold.co placeholder is
     * generated automatically (see src/lib/works.ts).
     * To use a real image: drop the file in `public/works/` and set
     * `image: /works/my-file.jpg`.
     */
    image: z.string().optional(),
    /** Aspect used by the auto-generated placeholder. */
    imageWidth: z.number().default(1200),
    imageHeight: z.number().default(1500),
    /** Sort key — newest first across the site. */
    date: z.coerce.date(),
    /** Hide a work without deleting the file. */
    draft: z.boolean().default(false),
    /** Spanish overrides. */
    es: worksTranslation,
  }),
});

const cvTranslation = z
  .object({
    title: z.string().optional(),
    venue: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
  })
  .optional();

/**
 * CV: one markdown file per timeline entry in `src/content/cv/`.
 */
const cv = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/cv' }),
  schema: z.object({
    title: z.string(),
    year: z.string(),
    venue: z.string().optional(),
    location: z.string().optional(),
    /**
     * Groups the timeline. Use one of the known keys — solo, group,
     * residencies, education — which are translated in src/i18n/ui.ts.
     * Any other value is shown as-is in both languages.
     */
    category: z.string().default('solo'),
    description: z.string().optional(),
    date: z.coerce.date(),
    /** Spanish overrides. */
    es: cvTranslation,
  }),
});

export const collections = { works, cv };
