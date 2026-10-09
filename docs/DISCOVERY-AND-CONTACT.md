# Discovery & contact

Even though the concept demo stays `noindex`, the site is built so a real clone
ranks well locally for "spa in &lt;area&gt;". This document covers structured data,
one-tap directions and the Google Business Profile.

## On-page SEO (per clone)

- `src/data/site.ts` `siteUrl` must be the real domain.
- `Seo.astro` emits title, description, canonical, `hreflang` alternates, Open Graph
  and Twitter meta per page.
- One `h1` (the spa name), descriptive `h2`s per section, meaningful alt text.

## Structured data — `DaySpa`

`src/components/Seo.astro` outputs a schema.org **`DaySpa`** graph on the home page:

- `name`, `description`, `url`, `image`, `telephone`, `priceRange`,
  `currenciesAccepted`
- `address` (`PostalAddress`) from `site.address` / `site.locality`
- `geo` from `site.geo` (`lat`/`lng`)
- `openingHoursSpecification` from `site.hours` (closed days omitted)
- `sameAs` from `site.socials`
- `hasOfferCatalog` listing every treatment with name, description, price and
  currency

To keep it accurate for a clone, update `site.address`, `site.geo`, `site.hours`,
`site.socials` and the treatments — no component edits.

## One-tap directions

`src/lib/directions.ts` prefers precise coordinates:

```
https://www.google.com/maps/dir/?api=1&destination=<lat>,<lng>
```

falling back to `site.directionsUrl`, then the address. Rendered in the header,
hero, visit section, map block and footer.

## Embedded map

`site.mapEmbedUrl` is a Google Maps embed URL (`.../maps?q=...&output=embed`)
rendered lazily by `visit/MapEmbed.astro` with an accessible title.

## Google Business Profile

Included in the express baseline: create/claim the profile, set the primary
category (Day spa), hours, address and photos, and point the website field at the
live domain. The `DaySpa` JSON-LD mirrors the profile so the two agree — consistency
is what local search rewards.

## Indexing

The demo is `noindex` three ways (`AGENTS.md` §3.5). A clone turns indexing on in
**all three** together: `indexable: true`, delete the `X-Robots-Tag` line in
`public/_headers`, and set `siteUrl`. Then `@astrojs/sitemap` is enabled and
`robots.txt` allows crawling with a sitemap reference.
