# Design Brief

## Brand feeling

**Calm, natural, premium, unhurried.** A quiet escape in the city — soft daylight,
warm stone, greenery and gentle terracotta accents. Elegant serif headings
(**Cormorant**) over a clean humanist sans body (**Manrope**), generous whitespace,
soft rounded photography and hairline rules. It must feel clearly different from the
laundry (blue), bakery (crumb orange), salon (rose), restaurant (dark charcoal) and
café (espresso/matcha) concepts — see `DECISIONS.md` D-S02.

Demo brand (placeholder, invented — D-S12):

| Field        | Value                                                             |
| ------------ | ----------------------------------------------------------------- |
| Name         | **Lotus & Lime Wellness**                                         |
| Tagline (EN) | Massage, facials and body rituals — a quiet pause in Colombo 07.  |
| Location     | 18 Rosmead Place, Colombo 07, Sri Lanka                           |
| WhatsApp     | +94 74 343 0033 (Zuvo demo number)                                |
| Hours        | Mon closed; Tue–Fri 10:00–20:00; Sat 09:00–20:00; Sun 10:00–19:00 |
| Currency     | LKR (Rs.)                                                         |

## Theme tokens

Edit `src/styles/theme.css` to rebrand; `global.css` maps tokens to Tailwind.

| Token                | Value     | Use                              |
| -------------------- | --------- | -------------------------------- |
| `--c-bg`             | `#F4F1EA` | Warm sand/stone page canvas      |
| `--c-surface`        | `#FFFFFF` | Cards / raised panels            |
| `--c-surface-alt`    | `#E9EDE3` | Soft sage section background     |
| `--c-text`           | `#2B2F2A` | Primary text (deep stone black)  |
| `--c-text-muted`     | `#6E7369` | Secondary text                   |
| `--c-primary`        | `#4C6B5B` | Soft jade — buttons              |
| `--c-primary-strong` | `#3C5749` | Primary hover                    |
| `--c-on-primary`     | `#F7F5EF` | Text on primary                  |
| `--c-accent`         | `#B5714B` | Muted terracotta — eyebrows/tags |
| `--c-border`         | `#DDD8CB` | Hairline borders                 |
| `--c-success`        | `#4E7D5E` | Open now / available             |
| `--c-danger`         | `#B2463A` | Closed / error                   |
| `--c-focus`          | `#1D4ED8` | Focus ring                       |

- Radius: `--radius-sm 6px`, `--radius-md 12px`, `--radius-lg 20px`.
- Type: `font-heading` **Cormorant**, `font-body` **Manrope**, both stacks append
  Noto Sans Sinhala/Tamil.
- Utilities/classes: `bg-bg bg-surface text-text text-text-muted border-border
bg-primary bg-accent`, plus `.eyebrow .btn .btn-primary .btn-outline .card .badge
.input .price-leader .section .container-page`.
- Light theme is default. Clone presets live in `theme.css` under `data-theme`
  (`terracotta`, `indigo`).

## The single page and its sections

One route (`/`) with anchored sections so the whole spa is scannable on a phone:

| #   | Section              | Anchor           | Job                                                                    |
| --- | -------------------- | ---------------- | ---------------------------------------------------------------------- |
| 1   | Hero                 | —                | Calm image, name, tagline, **Book on WhatsApp** + **View treatments**. |
| 2   | Signature treatments | `#treatments`    | Featured treatments with photos.                                       |
| 3   | Treatments           | `#treatments`    | Full menu by category with **durations + prices** and enquire links.   |
| 4   | Packages             | `#packages`      | Curated multi-treatment packages.                                      |
| 5   | Gallery              | `#gallery`       | The space and treatments — the trust signal.                           |
| 6   | Our story            | `#about`         | About the spa and its values.                                          |
| 7   | What to expect       | `#expect`        | Four-step "how it works".                                              |
| 8   | Reviews              | `#reviews`       | Short invented quotes (no rating badge).                               |
| 9   | Visit us             | `#visit`         | Address, hours, embedded map, one-tap directions.                      |
| 10  | Request a booking    | `#booking`       | WhatsApp enquiry form + add-ons hint.                                  |
| 11  | Gift vouchers        | `#gift-vouchers` | Add-on hint.                                                           |
| 12  | Footer               | —                | Brand, anchors, socials, hours/address, Book on WhatsApp.              |

There is no `/menu`, `/treatments`, `/gallery` or `/about` route. Legal pages are
deferred (`AGENTS.md` §8). `robots.txt` is generated.

## Mobile-first rules

- Design and test at **375px first**, then scale up.
- Tap targets ≥ 44px; primary actions thumb-reachable.
- Header keeps one row on desktop; on mobile the nav is a horizontally scrollable
  chip row (no hamburger) and the CTA collapses to a short label.
- The hero image is `heroImageMobile` below `sm`; gallery/treatment images are
  lazy-loaded with explicit dimensions to avoid layout shift.
- Sticky treatment category tabs park beneath ribbon + header via `--header-h`.
- No horizontal scroll; one visual accent competing with the CTAs at most.
- Verify jade-on-sand and terracotta badge contrast at WCAG AA.

## Component inventory

| Component                                                    | Notes                                                          |
| ------------------------------------------------------------ | -------------------------------------------------------------- |
| `SampleRibbon`                                               | Demo-only slim strip; "sample website" + "Message us".         |
| `Header`                                                     | Logo, anchor nav, **Book on WhatsApp** CTA, language switcher. |
| `Footer`                                                     | Brand, anchors, socials, address, Book on WhatsApp.            |
| `LangSwitcher`                                               | Hidden when only one locale is enabled.                        |
| `Seo`                                                        | Title/description/canonical/OG/hreflang/`DaySpa` JSON-LD.      |
| `MediaImage`                                                 | Renders an optimized imported WebP or a public path.           |
| `hero/SpaHero`                                               | Two-column hero with image, tagline and the two primary CTAs.  |
| `treatments/TreatmentTabs`                                   | Sticky category jump chips.                                    |
| `treatments/TreatmentsList`                                  | Category-grouped treatments.                                   |
| `treatments/TreatmentItem`                                   | Name, duration, dotted leader, price, enquire/unavailable.     |
| `treatments/FeaturedTreatments`                              | Featured treatments with images.                               |
| `packages/PackagesList`                                      | Package cards with includes, duration and price.               |
| `gallery/GalleryGrid`                                        | Responsive masonry image grid.                                 |
| `about/AboutStory`                                           | Story copy + value ticks.                                      |
| `expect/HowItWorks`                                          | Four numbered steps.                                           |
| `reviews/Reviews`                                            | Invented short quotes.                                         |
| `visit/LocationSection`                                      | Address, hours, map embed, directions.                         |
| `visit/ContactLinks`, `visit/OpeningHours`, `visit/MapEmbed` | Reusable visit blocks.                                         |
| `booking/BookingSection`                                     | WhatsApp booking-enquiry form + add-ons hint.                  |
| `gift/GiftVouchers`                                          | Gift-voucher hint block.                                       |
| `pages/HomePage.astro`                                       | Composes the single page.                                      |

## Accessibility

- Semantic landmarks; one `h1` per page; anchors are links, not JS tabs.
- All images have localized alt text; decorative images are `alt=""`.
- Focus visible on all interactive elements; `lang` set per locale.
- Contrast targets WCAG AA across the palette.

## Image shot list (licensed stock)

All demo imagery is **licensed stock** from Unsplash (free for commercial use, no
on-page attribution required), committed as **WebP** (≤ ~200 KB, ≤ ~1600 px). Keep a
calm, natural, daylight spa look; no text, logos or watermarks; no clichéd or
over-sexualised imagery (D-S11).

| Slot                   | File                             | Size / ratio | Notes                                      |
| ---------------------- | -------------------------------- | ------------ | ------------------------------------------ |
| Hero (wide)            | `public/images/hero.webp`        | 1600×1000    | Calm treatment room, soft daylight         |
| Hero (mobile)          | `public/images/hero-mobile.webp` | 1000×1333    | Portrait crop of the same scene            |
| Open Graph             | `public/og.jpg`                  | 1200×630     | Spa room, room for the wordmark            |
| Gallery ×6             | `src/assets/gallery/*.webp`      | 1200×900     | Room, treatment, facial, oils, towels, tea |
| Featured treatments ×4 | `src/assets/treatments/*.webp`   | 1200×900     | Named after the treatment id               |

Brand marks (`public/logo.svg`, `public/favicon.svg`) are simple SVGs made in-repo
(jade rounded square, lotus petals, terracotta waterline). `placeholder.svg` is the
fallback for treatments without a photo.
