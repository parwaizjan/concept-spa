# Customization — cloning into a real spa site

This repo is the template. A clone must be a fast, mechanical rebrand. Work through
the steps in order, then run the verification checklist.

## 1. Start clean

- Create a new repo **from this template** (or copy the files) — not a fork with
  history — so the client repo starts clean.
- `corepack pnpm install`.

## 2. Brand and config — `src/data/site.ts`

Edit end to end:

- `name`, `tagline`, `logo`, `ogImage`, `heroImage`, `heroImageMobile`
- `whatsappNumber` (digits only, country code, no `+`), `phone`, `email`
- `address`, `locality`, `geo`, `mapEmbedUrl`, `mapLink`, `directionsUrl`
- `hours` (set `open: ""` for closed days)
- `socials` (empty string hides a link)
- `locales` / `defaultLocale` (English first)
- `booking.topics` (keep the keys unless the form changes)
- `prices` (`mode`, `sheetId`, `sheetTab`)
- `indexable`, `showDemoRibbon`, `siteUrl`, `currency`, `priceRange`

## 3. Colors, fonts, logo

- Rebrand via `src/styles/theme.css` (tokens) — optionally a `data-theme` preset.
- Swap fonts in `package.json` + `BaseLayout.astro` if a different pairing is
  wanted.
- Replace `public/logo.svg` and `public/favicon.svg`.

## 4. Imagery

- Replace `public/images/hero.webp` (1600×1000), `public/images/hero-mobile.webp`
  (1000×1333) and `public/og.jpg` (1200×630).
- Replace `src/assets/gallery/*.webp` (keep the imports in `src/data/gallery.ts`).
- Add treatment photos as `src/assets/treatments/<treatment-id>.webp`.
- Keep WebP ≤ ~200 KB and ≤ ~1600 px; keep alt text accurate and localized.

## 5. Content

- `src/content/categories/*.md` — treatment categories (developer-edited).
- `src/content/treatments/*.md` — treatments with `duration` + `price`.
- `src/data/packages.ts` — packages.
- `src/i18n/ui.ts` — about, what-to-expect and every label.
- `src/data/testimonials.ts` — the spa's real reviews (with permission).

## 6. Prices

Point `prices.sheetId` at the spa's own Google Sheet (see
`docs/CONTENT-AND-PRICES.md`). For production use `mode: "build"`.

## 7. Turn on indexing (all three)

1. `indexable: true` in `src/data/site.ts`.
2. Delete the `X-Robots-Tag: noindex, nofollow` line from `public/_headers`.
3. Set `siteUrl` to the real domain.

Also set `showDemoRibbon: false`.

## 8. Build & deploy

```sh
corepack pnpm check && corepack pnpm lint && corepack pnpm build
wrangler deploy
```

Rename the Worker in `wrangler.jsonc` and attach the spa's custom domain
(`workers_dev: false`). See `docs/DEPLOYMENT.md`.

## 9. Verify

- Booking: every entry point opens WhatsApp to the **right number** with a sensible
  pre-filled message.
- Directions: `#visit` and the header open the **right pin**.
- Indexing: `robots.txt` allows crawling, **no** `X-Robots-Tag` header is sent, and
  the canonical uses the real domain.
- Languages: `site.locales` is correct and `[lang]` routes render.
- Hours/geo/address match the Google Business Profile.
- The ribbon is gone and no placeholder branding or demo number remains.

## Do not leave behind

Placeholder branding, the demo phone number, the demo ribbon, `indexable: false`,
`sheetId: ""`, or treatment ids that no longer match the Sheet.
