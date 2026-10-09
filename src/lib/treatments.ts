import type { ImageMetadata } from "astro";
import { getCollection } from "astro:content";

import { treatmentImages } from "../data/treatment-images";
import { type Locale, type LocalizedText } from "../data/site";
import pricesLive from "../data/treatments-live.json";

/** An item image: an optimized imported asset, or a public path (e.g. an SVG). */
export type ItemImage = ImageMetadata | string;

export type LiveItemRow = {
  price?: number;
  available?: boolean;
  note?: string;
};

const live = pricesLive as Record<string, LiveItemRow>;

export type TreatmentItem = {
  id: string;
  category: string;
  name: string;
  description?: string;
  image: ItemImage;
  duration: number;
  price: number;
  available: boolean;
  featured: boolean;
  order: number;
  note?: string;
};

export type TreatmentCategory = {
  id: string;
  name: string;
  description?: string;
  order: number;
};

/** Pick a localized string, falling back to English then an empty string. */
export function pickLocalized(
  text: LocalizedText | undefined,
  lang: Locale,
): string {
  if (!text) return "";
  return text[lang] ?? text.en;
}

/** The full treatment list for a locale, with build-time Sheet overrides merged in. */
export async function getTreatments(lang: Locale): Promise<TreatmentItem[]> {
  const items = await getCollection("treatments");

  return items
    .map((entry): TreatmentItem => {
      const data = entry.data;
      const override = live[entry.id] ?? {};
      return {
        id: entry.id,
        category: data.category,
        name: pickLocalized(data.name, lang),
        description: data.description
          ? pickLocalized(data.description, lang)
          : undefined,
        image:
          treatmentImages[entry.id] ?? data.image ?? "/images/placeholder.svg",
        duration: data.duration,
        price: override.price ?? data.price,
        available: override.available ?? data.available,
        featured: data.featured,
        order: data.order,
        note: override.note,
      };
    })
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

/** Treatment categories for a locale, ordered. */
export async function getCategories(
  lang: Locale,
): Promise<TreatmentCategory[]> {
  const categories = await getCollection("categories");

  return categories
    .map((entry): TreatmentCategory => ({
      id: entry.id,
      name: pickLocalized(entry.data.name, lang),
      description: entry.data.description
        ? pickLocalized(entry.data.description, lang)
        : undefined,
      order: entry.data.order,
    }))
    .sort((a, b) => a.order - b.order);
}
