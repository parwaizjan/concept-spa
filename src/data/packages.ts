import type { LocalizedText } from "./site";

/**
 * Curated treatment packages. Developer-edited; localized. Each package combines
 * several treatments into one price and duration. A clone replaces these with the
 * spa's own packages (see `docs/CONTENT-AND-PRICES.md`).
 */
export type SpaPackage = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  /** Total duration in minutes. */
  duration: number;
  price: number;
  includes: LocalizedText[];
  featured?: boolean;
};

export const packages: SpaPackage[] = [
  {
    id: "signature-journey",
    name: { en: "Signature Journey" },
    description: {
      en: "Our most-loved three hours: a full-body massage, a brightening facial and a scalp ritual to finish.",
    },
    duration: 180,
    price: 16500,
    includes: [
      { en: "Full-body aromatherapy massage (90 min)" },
      { en: "Botanical brightening facial (60 min)" },
      { en: "Warm oil scalp ritual (30 min)" },
    ],
    featured: true,
  },
  {
    id: "couples-ritual",
    name: { en: "Couples Ritual" },
    description: {
      en: "Two therapists, one quiet room. A side-by-side massage followed by a foot ritual over tea.",
    },
    duration: 120,
    price: 15500,
    includes: [
      { en: "Side-by-side relaxation massage (75 min)" },
      { en: "Himalayan salt foot ritual (30 min)" },
      { en: "Herbal tea for two" },
    ],
  },
  {
    id: "ayurvedic-reset",
    name: { en: "Ayurvedic Reset" },
    description: {
      en: "Traditional Sri Lankan abhyanga with warm herbal oils, finished with a soothing shirodhara.",
    },
    duration: 150,
    price: 14500,
    includes: [
      { en: "Abhyanga warm-oil massage (90 min)" },
      { en: "Shirodhara warm-oil flow (45 min)" },
      { en: "Steam and herbal tea" },
    ],
  },
  {
    id: "half-day-escape",
    name: { en: "Half-Day Escape" },
    description: {
      en: "An unhurried half day for when you need to properly switch off — treatments, steam and a light lunch.",
    },
    duration: 240,
    price: 22500,
    includes: [
      { en: "Deep tissue massage (60 min)" },
      { en: "Detox body wrap (60 min)" },
      { en: "Express facial (45 min)" },
      { en: "Steam, tea and a light lunch" },
    ],
  },
];
