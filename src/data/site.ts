/**
 * THE per-spa configuration.
 *
 * Every spa-specific value lives here. A clone only needs to edit this file,
 * `src/styles/theme.css`, the content collections and `public/`. Components must
 * never contain spa-specific literals.
 */

export type Locale = "en" | "si" | "ta";

export type LocalizedText = {
  en: string;
  si?: string;
  ta?: string;
};

export type OpeningHour = {
  /** 0 = Sunday … 6 = Saturday */
  day: number;
  /** 24h "HH:MM". Leave `open` empty to mark the day closed. */
  open: string;
  close: string;
};

export type GeoPoint = {
  lat: number;
  lng: number;
};

/** Keys for the booking-enquiry topics; labels live in `src/i18n/ui.ts`. */
export type BookingTopic = "general" | "treatment" | "package" | "voucher";

const tagline: LocalizedText = {
  en: "Massage, facials and body rituals — a quiet pause in Colombo 07.",
};

const address: LocalizedText = {
  en: "18 Rosmead Place, Colombo 07, Sri Lanka",
};

export const site = {
  // Identity
  name: "Lotus & Lime Wellness",
  tagline,
  logo: "/logo.svg",
  ogImage: "/og.jpg",
  heroImage: "/images/hero.webp",
  heroImageMobile: "/images/hero-mobile.webp",

  // Contact
  whatsappNumber: "94743430033", // digits only, country code, no "+"
  phone: "+94 74 343 0033",
  email: "", // display only; enquiries go to WhatsApp
  address,
  locality: "Colombo 07",
  geo: { lat: 6.9157, lng: 79.8648 } as GeoPoint,
  mapEmbedUrl:
    "https://www.google.com/maps?q=Rosmead%20Place%2C%20Colombo%2007%2C%20Sri%20Lanka&output=embed",
  mapLink: "https://maps.google.com/?q=18+Rosmead+Place,+Colombo+07,+Sri+Lanka",
  /** Used if `geo` is absent; otherwise the directions link is built from `geo`. */
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=6.9157,79.8648",

  // Opening hours (0 = Sunday … 6 = Saturday). Monday closed.
  hours: [
    { day: 0, open: "10:00", close: "19:00" },
    { day: 1, open: "", close: "" }, // Monday — closed
    { day: 2, open: "10:00", close: "20:00" },
    { day: 3, open: "10:00", close: "20:00" },
    { day: 4, open: "10:00", close: "20:00" },
    { day: 5, open: "10:00", close: "20:00" },
    { day: 6, open: "09:00", close: "20:00" },
  ] as OpeningHour[],

  // Socials (empty string hides the link)
  socials: {
    facebook: "https://facebook.com/lotusandlimewellness",
    instagram: "https://instagram.com/lotusandlimewellness",
    tiktok: "",
  },

  // i18n — English ships first; add "si"/"ta" when translations exist.
  defaultLocale: "en" as Locale,
  locales: ["en"] as Locale[],

  // Booking-enquiry topics. These are keys; labels live in i18n.
  booking: {
    topics: ["treatment", "package", "voucher", "general"] as BookingTopic[],
  },

  // Treatment price data source.
  //  - "runtime": the demo fetches the public Sheet in the browser (instant edits).
  //  - "build":   clones fetch the Sheet during the build (static, event-driven rebuild).
  // Leave `sheetId` empty to run entirely from the content collections.
  prices: {
    mode: "runtime" as "runtime" | "build",
    sheetId: "",
    sheetTab: "Prices",
    refreshMinutes: 5,
  },

  // Paid add-ons the demo only hints at (never implemented in the baseline).
  addOns: [
    "Online booking system",
    "Package builder",
    "Gift vouchers",
    "Loyalty programme",
  ],

  // SEO — false for the concept demo, true for a real spa clone.
  indexable: false,
  /** Demo-only "sample website" ribbon above the header. */
  showDemoRibbon: true,
  siteUrl: "https://demo-spa.zuvo.lk",
  currency: { code: "LKR", symbol: "Rs." },
  priceRange: "Rs. 4,500–16,500",
} as const;

export type Site = typeof site;
