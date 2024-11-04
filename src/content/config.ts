import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const categories = defineCollection({
	type: 'data',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		path: z.string(),
		image: z.string(),
		all_images: z.array(z.object({
			title: z.string(),
			description: z.string(),
			src: z.string(),
			alt: z.string().optional(),
		}))
	}),
});

export const collections = { blog, categories };
