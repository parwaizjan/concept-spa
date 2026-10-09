/**
 * All user-facing UI strings.
 *
 * English ships complete. `si` and `ta` are intentionally empty until translated;
 * missing values fall back to English at runtime (see `utils.ts`). Every new
 * string must be added to `en` (and translated later) — do not hardcode English
 * copy into components.
 */

import type { Locale } from "../data/site";

export const languages = {
  en: "English",
  si: "සිංහල",
  ta: "தமிழ்",
} as const;

export const defaultLang: Locale = "en";

const en = {
  "a11y.skip": "Skip to content",

  "nav.treatments": "Treatments",
  "nav.packages": "Packages",
  "nav.gallery": "Gallery",
  "nav.about": "About",
  "nav.visit": "Find us",

  "common.viewTreatments": "View treatments",
  "common.viewPackages": "View packages",
  "common.bookWhatsApp": "Book on WhatsApp",
  "common.bookShort": "Book",
  "common.getDirections": "Get directions",
  "common.directionsShort": "Directions",
  "common.messageUs": "Message us",
  "common.language": "Language",
  "common.minutes": "min",
  "common.from": "from",

  "ribbon.text": "Sample website — a demo by Zuvo Web Studio Express",

  "hero.eyebrow": "Massage · Facials · Body rituals · Colombo 07",
  "hero.cta": "Book on WhatsApp",
  "hero.treatments": "View treatments",
  "hero.imageAlt": "A warm oil massage in progress at Lotus & Lime Wellness",

  "treatments.title": "Treatments",
  "treatments.subtitle":
    "Explore our full treatment menu — every service includes a consultation and a quiet room to unwind in. Prices are in Sri Lankan rupees.",
  "treatments.jumpTo": "Jump to a section",
  "treatments.empty":
    "Our treatment menu is being updated. Please check back soon.",
  "treatments.unavailable": "Currently unavailable",
  "treatments.book": "Enquire",
  "treatments.featuredTitle": "Signature treatments",
  "treatments.featuredSubtitle":
    "Not sure where to start? These are the treatments our guests return for.",

  "packages.title": "Packages",
  "packages.subtitle":
    "More time to unwind, better value. Each package combines several treatments into one booking.",
  "packages.includes": "Includes",
  "packages.popular": "Most popular",
  "packages.book": "Enquire about this package",

  "gallery.title": "The space",
  "gallery.subtitle": "A quiet escape in the heart of Colombo 07.",
  "gallery.altRoom": "A sunlit relaxation lounge",
  "gallery.altTreatment": "A guest enjoying a warm stone massage",
  "gallery.altFacial": "A soothing steam facial treatment",
  "gallery.altOils": "Bottles of massage and essential oils",
  "gallery.altDetail": "Fresh towels rolled and ready",
  "gallery.altTea": "A cup of herbal tea with fresh leaves",

  "about.title": "Our story",
  "about.p1":
    "Lotus & Lime began with a simple idea: a genuinely calm place in the city where treatments are unhurried and every detail is considered.",
  "about.p2":
    "Our therapists are trained in both traditional Sri Lankan Ayurvedic techniques and modern wellness therapies. We use botanical oils and products that are kind to your skin and to the island.",
  "about.p3":
    "From the moment you step in — the tea, the quiet rooms, the warm towels — the goal is the same: that you leave lighter than you arrived.",
  "about.value1": "Qualified therapists",
  "about.value2": "Botanical, cruelty-free products",
  "about.value3": "Private treatment rooms",
  "about.value4": "Ayurvedic and modern therapies",

  "expect.title": "What to expect",
  "expect.subtitle": "Your visit, from booking to afterglow.",
  "expect.step1.title": "Send an enquiry",
  "expect.step1.body":
    "Tell us the treatment or package you'd like and a preferred day and time on WhatsApp. We reply to confirm your slot.",
  "expect.step2.title": "Arrive and settle in",
  "expect.step2.body":
    "Come 10 minutes early for a cup of herbal tea and a short consultation so your therapist can tailor the treatment.",
  "expect.step3.title": "Your treatment",
  "expect.step3.body":
    "Unwind in a private room with warm towels, soft light and quiet music. Phones away; the time is yours.",
  "expect.step4.title": "Leave refreshed",
  "expect.step4.body":
    "Finish with tea and a moment to rest. We'll share simple after-care advice and can rebook before you go.",

  "visit.title": "Visit us",
  "visit.address": "Address",
  "visit.hours": "Opening hours",
  "visit.phone": "Phone",
  "visit.whatsapp": "WhatsApp",
  "visit.map": "Find us on the map",
  "visit.directions": "Get directions",
  "visit.openNow": "Open now",
  "visit.closedNow": "Closed",
  "visit.messageUs": "Message us",

  "testimonials.title": "What guests say",

  "booking.title": "Request a booking",
  "booking.subtitle":
    "Send us a booking enquiry on WhatsApp and we'll confirm your time. No payment is taken here.",
  "booking.whatAbout": "What's it about?",
  "booking.treatment": "Treatment",
  "booking.treatmentPlaceholder": "Not sure yet",
  "booking.date": "Preferred date",
  "booking.time": "Preferred time",
  "booking.timePlaceholder": "e.g. morning, or 3pm",
  "booking.note": "Anything we should know?",
  "booking.notePlaceholder":
    "Optional — how many people, any injuries or preferences…",
  "booking.send": "Send on WhatsApp",
  "booking.topic.general": "A question",
  "booking.topic.treatment": "A treatment",
  "booking.topic.package": "A package",
  "booking.topic.voucher": "Gift vouchers",

  "msg.intro": "I found you online and I'd like to request a booking.",
  "msg.topic": "About",
  "msg.treatment": "Treatment",
  "msg.date": "Preferred date",
  "msg.time": "Preferred time",
  "msg.name": "Name",
  "msg.notes": "Details",
  "msg.footer": "Thank you!",

  "gift.title": "Gift vouchers",
  "gift.body":
    "Give someone a few quiet hours. Gift vouchers can be made to any value or for a specific treatment, and are valid for six months.",
  "gift.cta": "Ask about vouchers",

  "addOns.title": "Want more?",
  "addOns.body":
    "Online booking, a package builder, gift vouchers and a loyalty programme can be added whenever you need them.",

  "cta.title": "Ready for a quiet pause?",
  "cta.body":
    "Send us a message on WhatsApp with the treatment you'd like and a preferred time. We'll take care of the rest.",
  "cta.message": "Book on WhatsApp",

  "footer.note": "Booking enquiries are answered on WhatsApp.",
  "footer.rights": "All rights reserved.",

  "notFound.title": "Page not found",
  "notFound.body": "Sorry, we could not find that page.",
  "notFound.cta": "Back to the beginning",
};

const si: Partial<typeof en> = {};

const ta: Partial<typeof en> = {};

export const ui = { en, si, ta } as const;

export type UiKey = keyof typeof en;
