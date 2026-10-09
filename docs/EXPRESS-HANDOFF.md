# Express hand-off — listing `demo-spa.zuvo.lk`

**Status: pending live verification.** Apply these changes only after
`https://demo-spa.zuvo.lk` is deployed and verified. The `concept-spa` repo must
**not** edit the express repo; apply the changes in
`~/Projects/zuvo-studio-express` (**express.zuvo.lk**).

The `spa` category page and position already exist in express
(`src/data/categories.ts`, `slug: 'spa'`, `ctaLabel: 'Book on WhatsApp'`, baseline
extras "Treatments and packages / Photo gallery / Booking enquiry button", add-ons
"Online booking system / Package builder / Gift vouchers"). Only the **demo** is
`coming-soon`. This hand-off flips it to `live` and updates the registry docs.

**Verify the live demo first:** the home page loads at 375px, **Book on WhatsApp**
opens WhatsApp to +94 74 343 0033 with a pre-filled booking message, **View
treatments** jumps to `#treatments`, the treatment rows show durations + prices,
**Get directions** opens the right pin, and the demo is `noindex` with the sample
ribbon.

## 1. `src/data/demos.ts` — flip the spa demo to live

Replace the existing `spa` entry:

```ts
  {
    slug: 'spa',
    category: 'Spa & Wellness',
    tagline: 'Treatments and packages presented beautifully.',
    url: '',
    screenshot: '',
    features: ['Treatments', 'Packages', 'Booking enquiry'],
    status: 'coming-soon',
    order: 6,
  },
```

with:

```ts
  {
    slug: 'spa',
    category: 'Spa & Wellness',
    tagline: 'Treatments and packages presented beautifully.',
    url: 'https://demo-spa.zuvo.lk',
    screenshot: '/demos/spa.webp',
    features: [
      'Treatments & packages',
      'Gallery',
      'Location & directions',
      'WhatsApp bookings',
    ],
    status: 'live',
    order: 6,
  },
```

`CategoryCard.astro` and `DemoPreview.astro` read `getDemo(category.demoSlug)`, so
this single edit makes the home card and `/websites/spa/` show the live demo,
screenshot and link. No page/code changes are needed.

## 2. `public/demos/spa.webp` — add the screenshot

- Capture the live demo and save to `public/demos/spa.webp`.
- Match the existing screenshots: **1280×960 (4:3)**, WebP.
- Capture the mobile/home view (a phone-width screenshot scaled to 4:3 is what the
  other demos use). The hero + treatments is the most representative frame.

## 3. `docs/demos.md` — update the registry

In the **Registry** table, change the Spa & Wellness row:

```md
| Spa & Wellness | `spa` | Rs. 44,500 | Rs. 18,000 | https://demo-spa.zuvo.lk | `/websites/spa/` | **Live** |
```

In **Live demos**, add a spa line, e.g.:

```md
- **Spa & Wellness** ("Lotus & Lime Wellness", soft jade/sage + terracotta) —
  treatments & packages with durations + prices, gallery, about, what-to-expect,
  location & one-tap directions, WhatsApp booking enquiries, optional gift-voucher
  hint (online booking is a paid add-on, not baseline), EN (SI/TA ready).
```

## 4. `docs/product.md` — category catalogue table

Change the Spa & Wellness row's Demo column from `Planned` to
`` `demo-spa.zuvo.lk` ✅ ``.

## 5. `docs/strategy.md` — target categories table

Change the Spa & Wellness row's Demo column from `Planned` to
`` `demo-spa.zuvo.lk` ✅ ``.

## 6. `docs/roadmap.md` — Phase 7 progress

In **Phase 7 — Growth**, update:

```md
- [x] Build the remaining category demos — **laundry ✅, bakery ✅, salon ✅,
      restaurant ✅, café ✅, spa ✅**.
```

## 7. `AGENTS.md` and `README.md`

- Update any list/table of live demos or category status to mark spa as live.
- If a "demo count" or "remaining demos" line exists, update it.

## 8. `docs/decisions.md` — optional note

If desired, add an entry recording that the sixth demo (`concept-spa`) shipped:
booking-first (like salon/restaurant, not discovery-first like café), soft
jade/sage + warm sand + terracotta palette to stay visually distinct, a single
anchored page, `DaySpa` JSON-LD, and no baseline online booking (booking system,
package builder and gift vouchers are paid add-ons). No decision is strictly
required for listing.

## Notes / possible follow-ups

- **Copy alignment:** `docs/product.md` "Value proposition" lists "WhatsApp orders,
  bookings and enquiries" generically — no change needed. Do not imply spa online
  booking is included; it is an add-on.
- **Languages:** the demo ships English-only with SI/TA structure in place, matching
  the express add-on position.
- **Noindex:** the demo stays `noindex` and carries the sample-website ribbon.
- **Screenshot** must be captured after deploy and polish; do not advertise the
  category before the demo is live.

## What is already in express (no change needed)

- `spa` category entry in `src/data/categories.ts` (includes, add-ons, FAQs,
  `ctaLabel: 'Book on WhatsApp'`, SEO).
- Demo page route `/websites/spa/`.
- Category grid card rendering from `demos.ts`.
