import type { ImageMetadata } from "astro";

import detail from "../assets/gallery/detail.webp";
import facial from "../assets/gallery/facial.webp";
import hero from "../assets/gallery/hero.webp";
import oils from "../assets/gallery/oils.webp";
import room from "../assets/gallery/room.webp";
import tea from "../assets/gallery/tea.webp";
import type { UiKey } from "../i18n/ui";

/**
 * Photos shown in the gallery section. Imported assets are optimized to WebP
 * variants at build time. Replace the files in `src/assets/gallery/` (keeping the
 * imports) and keep each `altKey` present in every enabled language
 * (`src/i18n/ui.ts`).
 */
export type GalleryImage = {
  src: ImageMetadata | string;
  altKey: UiKey;
};

export const gallery: GalleryImage[] = [
  { src: hero, altKey: "gallery.altRoom" },
  { src: room, altKey: "gallery.altTreatment" },
  { src: facial, altKey: "gallery.altFacial" },
  { src: oils, altKey: "gallery.altOils" },
  { src: detail, altKey: "gallery.altDetail" },
  { src: tea, altKey: "gallery.altTea" },
];
