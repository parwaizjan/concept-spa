# concept-spa — Spa & Wellness concept website

A tranquil, mobile-first, translation-ready website template for small Sri Lankan
**spas and wellness studios**. It presents treatments and packages beautifully
(durations + prices) and turns interest into a **WhatsApp booking enquiry**.

This is a **concept/demo** for [Zuvo Web Studio Express](https://express.zuvo.lk),
and the template we clone for paying spa clients.

- Demo: <https://demo-spa.zuvo.lk>
- Brand (placeholder): **Lotus & Lime Wellness**, Colombo 07
- Primary action: **Book on WhatsApp** (pre-filled enquiry)
- Secondary action: **View treatments** (in-page anchor)

## What's in the box

One static, anchored page:

1. **Hero** — calm imagery, tagline, Book on WhatsApp / View treatments.
2. **Signature treatments** — featured services with photos.
3. **Treatments** — full menu by category with **durations + prices**, each with an
   enquire link.
4. **Packages** — curated multi-treatment packages.
5. **Gallery** — the space and treatments.
6. **Our story** — about the spa.
7. **What to expect** — four-step "how it works".
8. **Reviews** — placeholder guest quotes (no aggregate rating).
9. **Visit us** — address, hours, embedded map, one-tap directions.
10. **Request a booking** — WhatsApp enquiry form (topic, treatment, date, time,
    name, notes).
11. **Gift vouchers** — optional add-on hint.

Plus `404`, generated `robots.txt`, per-page meta, Open Graph and `DaySpa` JSON-LD.

## Quickstart

```sh
corepack pnpm install
corepack pnpm dev       # http://localhost:4321
corepack pnpm build     # static build to dist/
corepack pnpm check     # types + content schema
corepack pnpm lint      # prettier check
corepack pnpm deploy    # wrangler deploy
```

## Editing content

- Brand, contacts, geo, hours, socials, feature flags → `src/data/site.ts`
- Colors/fonts → `src/styles/theme.css`
- Treatments + categories → `src/content/treatments/`, `src/content/categories/`
- Packages → `src/data/packages.ts`
- Reviews → `src/data/testimonials.ts`
- All copy/UI labels → `src/i18n/ui.ts`
- Live prices (owner) → Google Sheet (see `docs/CONTENT-AND-PRICES.md`)

## The demo/demo-clone rules

The demo ships **`noindex`** with a **"sample website" ribbon**. A real clone turns
indexing on in **three** places together (`indexable: true`, delete the
`X-Robots-Tag` line in `public/_headers`, set `siteUrl`) and sets
`showDemoRibbon: false`. See `docs/CUSTOMIZATION.md`.

## Documentation

See `AGENTS.md` §9 for the full documentation map. Start with
`docs/ARCHITECTURE.md`, `docs/DESIGN-BRIEF.md` and `docs/BOOKING-FLOW.md`.

## Licence / imagery

Imagery is licensed stock (Unsplash/Pexels — free for commercial use, no on-page
attribution required), committed as optimized WebP. Never use another business's
photos, logos or trademarks.
