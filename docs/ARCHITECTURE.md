# Architecture

## Stack

| Concern   | Choice                                                                       |
| --------- | ---------------------------------------------------------------------------- |
| Framework | Astro 7.3.x, `output: 'static'`                                              |
| Styling   | Tailwind CSS v4.3.x via `@tailwindcss/vite`                                  |
| Adapter   | `@astrojs/cloudflare` 14.3.x, `session: false`, build-time `compile` images  |
| Fonts     | Fontsource variable: Cormorant, Manrope, Noto Sans Sinhala/Tamil (self-host) |
| Content   | Astro Content Collections (`src/content/*`)                                  |
| SEO       | `@astrojs/sitemap` (indexable only) + per-page meta + `DaySpa` JSON-LD       |
| Runtime   | Cloudflare Workers                                                           |
| Toolchain | Node 22, pnpm 12, TypeScript 6                                               |

## Folder structure

```
src/
  assets/
    gallery/        # gallery photos (WebP, imported + optimized by Astro)
    treatments/     # treatment photos, named after the treatment id
  components/
    about/ booking/ expect/ gallery/ gift/ hero/ icons/
    packages/ reviews/ treatments/ visit/
    Footer.astro Header.astro LangSwitcher.astro MediaImage.astro
    SampleRibbon.astro Seo.astro
    pages/HomePage.astro
  content/
    categories/*.md     # treatment categories
    treatments/*.md     # treatments (duration + price)
  data/
    site.ts             # THE per-spa config (see rule §3.7)
    packages.ts         # curated packages
    gallery.ts          # gallery imports + alt keys
    testimonials.ts     # placeholder reviews
    treatment-images.ts # auto-glob treatment photos by id
    treatments-live.json# build-time Sheet overrides (owner prices)
  i18n/
    ui.ts               # every user-facing string, per locale
    utils.ts            # t(), localizePath(), switchLocalePath()
  layouts/BaseLayout.astro
  lib/
    booking.ts          # WhatsApp booking message builder
    whatsapp.ts         # wa.me URL builder
    directions.ts       # one-tap Google Maps directions
    treatments.ts       # collection readers + Sheet merge
    sheet.ts            # Google Sheet CSV parser (shared build/runtime)
    format.ts           # currency formatting
  pages/
    index.astro         # renders HomePage lang="en"
    [lang]/index.astro  # renders HomePage for non-default locales
    robots.txt.ts       # generated from site.indexable
    404.astro
  scripts/site.ts       # client: open-now badge, runtime prices, booking link
  styles/
    global.css          # base + component classes
    theme.css           # design tokens + clone presets
scripts/fetch-prices.ts # prebuild: fetch the Sheet in build mode
public/                 # logo, favicon, hero images, og.jpg, placeholder, _headers
```

## Data flow

1. `src/data/site.ts` is imported by `astro.config.mjs` (site URL, locales,
   indexing) and by `BaseLayout` (which serialises a small config into
   `#site-config`).
2. `HomePage.astro` reads the `treatments` and `categories` collections via
   `src/lib/treatments.ts`. Build-time Sheet overrides in `treatments-live.json`
   are merged over the collection values.
3. Components render static HTML. Anchors (`#treatments`, `#packages`, `#gallery`,
   `#about`, `#expect`, `#reviews`, `#visit`, `#booking`, `#gift-vouchers`) make it
   one scannable page.
4. `src/scripts/site.ts` is the only client script (no framework). It:
   - shows the "open now" badge from `data-hours-*`,
   - refreshes prices/availability from the public Sheet in `runtime` mode,
   - rewrites the booking link as the form changes.

## i18n

- `site.defaultLocale` ("en") and `site.locales` (currently `["en"]`) drive
  `astro.config.mjs` and `[lang]/index.astro` static paths.
- `src/i18n/ui.ts` holds all strings. `si`/`ta` are empty now and fall back to
  English in `useTranslations()`.
- `localizePath()` keeps English unprefixed and prefixes other locales.
- `BaseLayout` sets `lang`, adds `hreflang` alternates, and marks non-default
  locales `notranslate`.
- Enabling a locale = add it to `site.locales`, add `si`/`ta` strings and content,
  and translate asset alt text. No structural change.

## Client bundle

Intentionally tiny and dependency-free: one TypeScript entry (`src/scripts/site.ts`)
plus the shared CSV parser. No React/Vue/Svelte islands. See `AGENTS.md` §3.8.

## Build & deploy

`pnpm build` runs `scripts/fetch-prices.ts` (a no-op in runtime mode), then Astro's
static build with compile-time image optimization. `wrangler.jsonc` names the Worker
`concept-spa` with `workers_dev: false`; assets are served statically. There is no
server route at request time.
