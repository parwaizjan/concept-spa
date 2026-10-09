import type { LocalizedText } from "./site";

/**
 * Guest quotes shown in the reviews section.
 *
 * These are placeholder, invented quotes (see DECISIONS.md D-S...). A clone
 * replaces them with the spa's real reviews (with permission). No aggregate
 * rating is shown. Add `si`/`ta` values when translated.
 */
export type Testimonial = {
  quote: LocalizedText;
  author: string;
  detail?: LocalizedText;
};

export const testimonials: Testimonial[] = [
  {
    quote: {
      en: "The most peaceful ninety minutes I've had in Colombo. I left feeling completely reset.",
    },
    author: "Nadia R.",
    detail: { en: "Deep tissue massage" },
  },
  {
    quote: {
      en: "Booked on WhatsApp in the morning and was in the treatment room by lunchtime. Beautiful space.",
    },
    author: "Tharindu P.",
    detail: { en: "Signature facial" },
  },
  {
    quote: {
      en: "Everything smells incredible and the therapists actually listen. My skin has never looked better.",
    },
    author: "Ishara M.",
    detail: { en: "Regular guest" },
  },
  {
    quote: {
      en: "We came as a pair for the couples ritual — calm, unhurried and worth every rupee.",
    },
    author: "Dinesh & Aisha",
    detail: { en: "Couples ritual" },
  },
];
