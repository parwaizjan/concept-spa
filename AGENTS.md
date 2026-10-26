# AGENTS.md

This file is the entry point for any AI agent or developer working in this
repository. Read it fully before making changes. It explains what this repository
is, what it is for, and the rules that must be preserved when it is cloned.

## 1. What this repo is

`concept-spa` is **a reusable reference/template website for small spas and
wellness studios in Sri Lanka**. It is a _concept_ that is pitched to real spa
owners. It is not a single spa's production site.

The business model is:

1. A prospective spa owner is shown the live demo.
2. If they like it, **this repo is cloned (it is a GitHub Template Repository)** and
   rebranded into that spa's real website.
3. Downtime between showing the demo and going live should be as close to zero as
   possible. Cloning + rebranding must be a quick, mechanical, repeatable process.

Because of this, the repository is optimized for **fast turnaround and low ongoing
cost**, not for one-off bespoke work.

- Demo site: `https://demo-spa.zuvo.lk`
- Hosting: Cloudflare Workers, custom domain via `*.zuvo.lk`
- Source: private GitHub repo (`parwaizjan/concept-spa`)
- Catalogue: listed on `zuvo.lk` (see `docs/EXPRESS-HANDOFF.md`)
- Target market: Sri Lankan day spas, wellness centres and beauty studios
- Languages: **English first**, with first-class Sinhala (`si`) and Tamil (`ta`)
  structure already in place (see rule §3.6)

This is the sixth entry in the Zuvo Web Studio concept series, after
`concept-laundry-shop`, `concept-bakery`, `concept-salon`, `concept-restaurant`
and `concept-cafe`. It ports `concept-cafe`'s structure and toolchain (see
`docs/DECISIONS.md` D-S01) but must look and feel **clearly distinct** from every
sibling (D-S02).

## 2. The one feature that sells this concept

**Tranquil presentation + booking enquiries on WhatsApp.**

A spa is a **booking** category. Unlike a café (discovery-first), the site's job is
to make the spa look **calm, premium and trustworthy**, present treatments and
packages clearly (**durations + prices**), and turn that into a WhatsApp booking
enquiry. There is **no online payment, no checkout, no calendar sync, no contact
form, no email**.

The two primary actions are:

1. **Book on WhatsApp** — a pre-filled booking enquiry (topic, treatment, preferred
   date/time, name, notes) addressed to the spa owner.
2. **View treatments** — an in-page jump to the full treatment menu.

Everything else is presentation around "browse treatments → send a booking enquiry
on WhatsApp". If a proposed change does not serve that, question whether it belongs.

## 3. Non-negotiable rules

These are product and business constraints. Do not violate them without explicit
human instruction recorded in this file.

1. **Zero running cost.** No paid services, no servers, no databases that cost
   money. The owner must be able to run the site on free tiers indefinitely.
2. **Static output only.** Astro renders to static HTML. No SSR, no server routes
   that require a running Worker at request time (Cloudflare's static asset serving
   is fine). This keeps hosting free and fast.
3. **WhatsApp-only bookings.** No contact forms, no email endpoints, no checkout, no
   calendar integration. Requests are "enquiries only": the spa confirms
   availability, therapist and price in chat. Do not label the CTA "Confirm
   booking" or "Pay now".
4. **Owner must be able to update prices for free, with minimal tech skill.** The
   chosen mechanism is a Google Sheet (see `docs/CONTENT-AND-PRICES.md`). Do not
   introduce a login/admin panel/CMS that adds cost or complexity for the owner.
   The owner does **not** add new treatment categories themselves; new treatments
   and photos are sent to the developer.
5. **No indexing by default.** The concept/demo must not appear in search results,
   and it must carry a small "sample website" note (rule §3.11). Cloning a real spa
   turns indexing on in **three** places together: set `indexable: true` in
   `src/data/site.ts`, **delete the `X-Robots-Tag: noindex` line from
   `public/_headers`**, and set `siteUrl` to the real domain. Missing any of the
   three keeps the site out of search results. See "Turning on indexing" in
   `docs/CUSTOMIZATION.md`. Never ship a demo with indexing on, and never ship a
   paid spa clone with indexing off.
6. **English first, translation-ready from day one.** The content model, UI string
   catalog and locale routing must all support `si` and `ta` even while only `en`
   is enabled. When translations are needed, enabling a locale should be a config
   change plus translated strings/content — never a structural change. Do not
   hardcode English copy into components. See `docs/ARCHITECTURE.md` §i18n.
7. **All spa-specific values live in one place.** Brand name, logo, colors, WhatsApp
   number, address, map, geo coordinates, hours, socials, locales, Sheet ID and
   feature flags live in `src/data/site.ts` and the content collections. Components
   must not contain spa-specific literals.
8. **Low JavaScript.** The only client script is the booking-enquiry link builder,
   the "open now" badge and the runtime Sheet price refresh. Do not add a client
   framework (React/Vue/Svelte) unless a feature genuinely requires it and it is
   documented as a deliberate decision.
9. **Mobile-first.** Most visitors arrive on phones from a Facebook/Instagram/
   Google search. Test every change at mobile widths first. Large tap targets; fast
   on 3G.
10. **Accessibility and SEO hygiene** (when indexable): semantic HTML, alt text,
    language attributes, per-page meta, accessible controls. Accessibility always,
    regardless of indexability.
11. **The demo carries a "sample website" note.** A slim, non-dismissible,
    brand-tinted ribbon sits above the header on every page: "Sample website — a
    demo by Zuvo Web Studio" with an optional "Message us" link. This is a
    deliberate honesty/rights signal (stock imagery, invented brand) and must not
    be removed from the demo. A real clone removes it.
12. **Visually distinct from the other concepts.** The layout, section order and
    palette must not be a copy of any sibling. Reuse the architecture and
    toolchain; do not reuse the skin. See `docs/DESIGN-BRIEF.md`.
13. **Imagery rights.** The demo uses **licensed stock imagery** (Unsplash/Pexels —
    free for commercial use, no on-page attribution required), committed as
    optimized WebP. Canva AI is an acceptable fallback where stock is weak. Never
    use another business's photo, logo or trademark. Keep imagery calm, natural and
    tasteful — no clichéd or over-sexualised spa imagery. See
    `docs/DESIGN-BRIEF.md`.
14. **Baseline vs add-ons.** Baseline is treatments + packages, gallery, about,
    what-to-expect, booking-enquiry button, Google Business Profile, map/hours and
    basic SEO. Online booking system, package builder and gift vouchers are **paid
    add-ons** the demo only hints at — never implement them in the baseline.

## 4. Toolchain (locked)

Porting `concept-cafe`'s structure onto the same current Astro 7 toolchain. Full
rationale in `docs/DECISIONS.md`.

| Concern   | Choice                                                                       |
| --------- | ---------------------------------------------------------------------------- |
| Framework | Astro 7.3.x (`output: 'static'`)                                             |
| Styling   | Tailwind CSS v4.3.x via `@tailwindcss/vite`                                  |
| Adapter   | `@astrojs/cloudflare` 14.3.x (`session: false`, build-time `compile` images) |
| Fonts     | Fontsource variable, self-hosted (Cormorant + Manrope)                       |
| Content   | Astro Content Collections (`src/content/*`)                                  |
| SEO       | `@astrojs/sitemap` + per-page meta + `DaySpa` JSON-LD                        |
| Runtime   | Cloudflare Workers                                                           |
| Toolchain | Node 22, pnpm 12, TypeScript 6 (not 7 — see `astro check`)                   |

## 5. Where to change what

| You want to change...                                     | Edit this                                                                                                 |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Spa name, tagline, logo, colors, fonts                    | `src/data/site.ts`, `src/styles/theme.css`, `public/logo.svg`                                             |
| WhatsApp number, phone, address, geo, map, hours, socials | `src/data/site.ts`                                                                                        |
| One-tap directions link / embedded map                    | `src/data/site.ts` (`directionsUrl`, `mapEmbedUrl`, `mapLink`), `src/lib/directions.ts`                   |
| Indexing on/off, sitemap, robots                          | `src/data/site.ts` (`indexable`), `src/pages/robots.txt.ts`, `public/_headers` (`X-Robots-Tag`)           |
| Sample-website ribbon on/off and copy                     | `src/data/site.ts` (`showDemoRibbon`), `src/i18n/ui.ts` (`ribbon.*`), `src/components/SampleRibbon.astro` |
| Enabled languages / default language                      | `src/data/site.ts`, `astro.config.mjs`                                                                    |
| Treatment categories, treatments, durations, prices       | `src/content/treatments/`, `src/content/categories/`, `src/assets/treatments/`                            |
| Packages                                                  | `src/data/packages.ts`                                                                                    |
| Live prices / availability (owner)                        | Google Sheet (documented in `docs/CONTENT-AND-PRICES.md`)                                                 |
| Reviews                                                   | `src/data/testimonials.ts`                                                                                |
| About / what-to-expect copy                               | `src/i18n/ui.ts` (`about.*`, `expect.*`)                                                                  |
| UI labels, buttons, nav, booking message copy             | `src/i18n/ui.ts` (all enabled languages)                                                                  |
| Hero layout / section order                               | `src/components/hero/`, `src/components/pages/HomePage.astro`                                             |
| Booking message format / WhatsApp links                   | `src/lib/booking.ts`, `src/lib/whatsapp.ts`, `src/scripts/site.ts`                                        |
| JSON-LD (DaySpa, services, hours)                         | `src/components/Seo.astro`                                                                                |
| Deployment / domain / worker name                         | `wrangler.jsonc`, `docs/DEPLOYMENT.md`                                                                    |

## 6. Standard workflow

```sh
corepack pnpm install   # install deps
corepack pnpm dev       # local dev server at http://localhost:4321
corepack pnpm build     # static build to dist/
corepack pnpm preview   # preview the built site
corepack pnpm check     # astro check (types + content schema)
corepack pnpm lint      # prettier check
corepack pnpm format    # prettier write
corepack pnpm deploy    # wrangler deploy dist/ to Cloudflare Workers
```

Always run `pnpm check`, `pnpm lint` and `pnpm build` before considering a change
done. There is no test suite yet; if you add one, document it here and in
`README.md`.

## 7. Cloning this repo into a real spa site

This repo is the source. A clone must be a fast, mechanical rebrand. The full
checklist lives in `docs/CUSTOMIZATION.md`. Summary:

1. Create a new repo from this template (or copy the files), not a fork with
   history, so the new spa starts clean.
2. `corepack pnpm install`.
3. Edit `src/data/site.ts` end to end (name, contacts, geo, colors, locales,
   `indexable`). For a real spa set `indexable: true` **and** delete the
   `X-Robots-Tag` line from `public/_headers`, and set `siteUrl` to the real
   domain — all three. Also set `showDemoRibbon: false` and `demoTag: ""`.
4. Replace `public/logo.svg`, `public/favicon.svg`, the hero/OG images and the
   gallery/treatment photos.
5. Update content: categories, treatments, packages and reviews.
6. Point the price list at the spa's own Google Sheet.
7. `corepack pnpm check && corepack pnpm build`.
8. Deploy with `wrangler deploy`; attach the spa's custom domain.
9. Verify: the booking enquiry opens WhatsApp with the right number, one-tap
   directions opens the right pin, `robots.txt` allows indexing and no
   `X-Robots-Tag` header is sent, the language config is correct, hours/geo are
   right.

Do not leave placeholder branding, the demo phone number, the demo ribbon or
`indexable: false` in a production clone.

## 8. Open questions / decisions pending

Track unresolved decisions here so agents do not silently pick one:

- **Sheet build trigger.** The event-driven rebuild mechanism for production clones
  (Workers Builds deploy hook vs GitHub Actions `workflow_dispatch`) is not yet
  chosen. See `docs/CONTENT-AND-PRICES.md`.
- **Legal pages.** The concept currently does not ship Privacy/Terms pages. Decide
  whether clones need them (especially if analytics are enabled).
- **Translations.** Sinhala/Tamil content will be supplied later. Decide whether
  treatment names come from the Sheet, the content collections, or both.
- **Screenshot for zuvo.lk.** `public/demos/spa.webp` must be captured for
  `zuvo.lk` once the demo is live. See `docs/EXPRESS-HANDOFF.md`.
- **Native-speaker review** of Sinhala/Tamil strings before pitching, once enabled.

When you resolve one of these, move the decision into `docs/DECISIONS.md` and leave
a short note here.

## 9. Documentation map

- `README.md` — human-facing overview and quickstart.
- `docs/DECISIONS.md` — every locked decision and its rationale.
- `docs/ARCHITECTURE.md` — stack, folder structure, data flow, i18n, sections.
- `docs/DESIGN-BRIEF.md` — sections, mobile-first rules, theme tokens,
  component inventory, licensed image shot list.
- `docs/CONTENT-AND-PRICES.md` — treatment/package data, the Google Sheet,
  translations.
- `docs/BOOKING-FLOW.md` — the booking-enquiry form and WhatsApp flow.
- `docs/DISCOVERY-AND-CONTACT.md` — local SEO, `DaySpa` JSON-LD, one-tap
  directions and Google Business Profile.
- `docs/CUSTOMIZATION.md` — step-by-step rebrand/clone checklist.
- `docs/CLIENT-CHECKLIST.md` — client-facing intake list and WhatsApp message; keep
  it free of developer jargon and credentials.
- `docs/DEPLOYMENT.md` — Cloudflare Workers, domain, GitHub, indexing headers.
- `docs/EXPRESS-HANDOFF.md` — what the zuvo.lk repo must change to list this
  demo.
