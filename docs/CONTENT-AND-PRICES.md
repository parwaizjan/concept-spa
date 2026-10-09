# Content & prices

## Where content lives

| Content                         | Source                                                  |
| ------------------------------- | ------------------------------------------------------- |
| Treatment categories            | `src/content/categories/*.md`                           |
| Treatments (duration + price)   | `src/content/treatments/*.md`                           |
| Packages                        | `src/data/packages.ts`                                  |
| Gallery images + alt keys       | `src/data/gallery.ts`, `src/assets/gallery/`            |
| Treatment photos                | `src/assets/treatments/<treatment-id>.webp` (auto-glob) |
| Reviews                         | `src/data/testimonials.ts`                              |
| About / what-to-expect / labels | `src/i18n/ui.ts`                                        |
| Brand, contacts, hours, socials | `src/data/site.ts`                                      |
| Live prices (owner)             | Google Sheet (below)                                    |

## Treatment frontmatter

```yaml
---
category: massage # must match a file in src/content/categories/
name:
  en: Balinese Massage
description:
  en: Long, flowing strokes with warm oil to ease tension and calm the mind.
duration: 60 # minutes
price: 8500
featured: true # shows in Signature treatments (and needs a photo)
order: 1
---
```

The **file name** (without `.md`) is the treatment **id** — it keys the Google
Sheet and the `src/assets/treatments/<id>.webp` photo. Keep ids stable once live.

## The Google Sheet (owner-editable prices)

The owner updates **prices and availability** only, for free, in a Google Sheet. New
treatments/categories/photos are sent to the developer.

**Columns** (first row is the header, exact names):

| id                  | name | price | available | note       |
| ------------------- | ---- | ----- | --------- | ---------- |
| balinese-massage    |      | 9000  | yes       |            |
| deep-tissue-massage |      | 9500  | yes       | Book early |

- `id` matches the treatment file name. Required.
- `price` overrides the collection price. `available` accepts yes/no/true/false/1/0.
- `name` and `note` are ignored by the baseline (kept for future use).
- **Share the Sheet**: Share → Anyone with the link → Viewer. The site reads the
  public CSV endpoint (`gviz/tq?tqx=out:csv`), so no API key is needed.

**Configure** in `src/data/site.ts`:

```ts
prices: {
  mode: "runtime", // demo: fetch in the browser
  sheetId: "",     // empty = run entirely from the content collections
  sheetTab: "Prices",
  refreshMinutes: 5,
},
```

- `runtime` (the demo): the browser refreshes prices every `refreshMinutes` and
  caches per session. Instant edits, no rebuild.
- `build` (production clones): `scripts/fetch-prices.ts` runs as `prebuild` and
  writes `src/data/treatments-live.json`; a rebuild publishes the change. On fetch
  failure it keeps the last-known-good file, so a build never breaks.

**Build trigger (pending).** For `build` mode the event-driven rebuild is not yet
chosen (Workers Builds deploy hook vs GitHub Actions `workflow_dispatch`). See
`AGENTS.md` §8.

## Translations

English ships complete. To add Sinhala or Tamil:

1. Add `"si"`/`"ta"` to `site.locales` in `src/data/site.ts`.
2. Fill the `si`/`ta` objects in `src/i18n/ui.ts`.
3. Add `si`/`ta` values to treatment `name`/`description`, category names, packages,
   testimonials and gallery alt text.
4. Have a native speaker review before pitching.

No structural change is required — see `docs/ARCHITECTURE.md` §i18n.
