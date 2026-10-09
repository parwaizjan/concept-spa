# Decisions

Locked decisions for `concept-spa` and their rationale. IDs are `D-S##` (S for
Spa). When a pending item in `AGENTS.md` §8 is resolved, record it here.

## D-S01 — Port `concept-cafe`'s structure and toolchain

**Decision.** Build the sixth concept on the same Astro 7 / Tailwind v4 /
`@astrojs/cloudflare` toolchain and folder layout as `concept-cafe` (the newest
sibling), including `src/data/site.ts`, the Google Sheet price mechanism, the
sample-website ribbon and the i18n scaffolding.

**Why.** The toolchain is proven, static-only and free to run; the café repo is the
most current expression of the conventions. Reusing it keeps rebrands mechanical.

## D-S02 — Visually distinct skin

**Decision.** Spa must not reuse any sibling's skin. Palette is **soft jade/sage +
warm sand/stone + muted terracotta**; headings **Cormorant**, body **Manrope**;
layout leads with a two-column hero and image-led treatment cards rather than the
café's full-bleed hero and menu list.

**Why.** A reused skin makes the demos look like one generic template (see
`AGENTS.md` §3.12). The calm jade/terracotta palette is unused by laundry, bakery,
salon, restaurant or café.

## D-S03 — Booking category, not discovery

**Decision.** The primary action is **Book on WhatsApp**; the secondary action is
**View treatments**. There is no cart, no checkout, no calendar and no contact/form
email.

**Why.** A spa is a booking business. The express spa category page states
`ctaLabel: 'Book on WhatsApp'` and the same baseline extras (services/packages,
gallery, booking enquiry).

## D-S04 — Treatments are an Astro content collection

**Decision.** Treatments live in `src/content/treatments/*.md` (with `duration` and
`price`), grouped by `src/content/categories/*.md`. Packages live in
`src/data/packages.ts`.

**Why.** Developer-edited, typed, and optimised at build. The owner updates only
**prices/availability** via the Sheet; new treatments are sent to the developer
(`AGENTS.md` §3.4).

## D-S05 — WhatsApp-only booking enquiries

**Decision.** All enquiries are pre-filled `wa.me` deep links built by
`src/lib/booking.ts` + `src/lib/whatsapp.ts`. The booking form (topic, treatment,
date, time, name, notes) only assembles a message; nothing is submitted anywhere.

**Why.** Zero cost, zero backend, matches how Sri Lankan spas already take bookings.

## D-S06 — Google Sheet for live prices

**Decision.** `src/data/site.ts` `prices` block configures `mode` (`runtime` for the
demo, `build` for clones), `sheetId`, `sheetTab` and `refreshMinutes`. Columns:
`id | name | price | available | note`, keyed by treatment file name.

**Why.** The owner updates prices for free with no CMS/login. Runtime mode gives
instant edits in the demo; build mode gives static, event-driven rebuilds for
clones. See `docs/CONTENT-AND-PRICES.md`.

## D-S07 — Demo is `noindex` with the sample ribbon

**Decision.** `indexable: false`, `showDemoRibbon: true`, and
`X-Robots-Tag: noindex, nofollow` in `public/_headers`.

**Why.** The demo uses stock imagery and an invented brand and must not be indexed
or mistaken for a real business. Three coordinated changes turn indexing on for a
clone.

## D-S08 — Self-hosted Fontsource fonts

**Decision.** Cormorant (headings), Manrope (body), plus Noto Sans Sinhala and Noto
Sans Tamil for future locales, all self-hosted via Fontsource.

**Why.** No third-party font requests, fast on 3G, translation-ready.

## D-S09 — `DaySpa` structured data

**Decision.** The home page emits `DaySpa` JSON-LD with name, address, geo, opening
hours, price range, `sameAs` socials and a `hasOfferCatalog` of treatments.

**Why.** Correct schema for local spa discovery; drives the "spa in &lt;area&gt;"
search story on express.

## D-S10 — Gift vouchers are an add-on

**Decision.** A gift-vouchers **hint** block is baseline; a real voucher system is a
paid add-on (matching `categories.ts` add-ons: online booking, package builder, gift
vouchers).

**Why.** Keeps the baseline static and simple while signalling upsell value
(`AGENTS.md` §3.14).

## D-S11 — Imagery is licensed stock, committed as WebP

**Decision.** Unsplash imagery, exported to WebP (≤ ~200 KB, ≤ ~1600 px). Calm,
natural, tasteful — no clichéd or over-sexualised spa imagery.

**Why.** Rights-safe, fast, and sets the tone. See `AGENTS.md` §3.13 and
`docs/DESIGN-BRIEF.md`.

## D-S12 — Placeholder brand and reviews

**Decision.** Invented brand "Lotus & Lime Wellness" and invented first-name reviews
(no aggregate rating).

**Why.** A concept needs a coherent identity without implying a real business or
fabricating Google ratings.
