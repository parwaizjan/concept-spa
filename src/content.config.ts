import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro:schema";

const localizedText = z.object({
  en: z.string(),
  si: z.string().optional(),
  ta: z.string().optional(),
});

/**
 * Spa treatments. The file name (without `.md`) is the treatment id used to match
 * rows in the owner's Google Sheet, so keep it stable once live.
 */
const treatments = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/treatments" }),
  schema: z.object({
    category: z.string(),
    name: localizedText,
    description: localizedText.optional(),
    /** Duration in minutes. */
    duration: z.number().positive(),
    price: z.number().nonnegative(),
    available: z.boolean().default(true),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    image: z.string().optional(),
  }),
});

/** Treatment categories. The file name is the category id referenced by items. */
const categories = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/categories" }),
  schema: z.object({
    name: localizedText,
    description: localizedText.optional(),
    order: z.number().default(0),
  }),
});

export const collections = { treatments, categories };
