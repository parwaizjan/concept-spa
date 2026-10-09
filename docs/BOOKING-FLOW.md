# Booking flow

The one job of the site: **browse treatments → send a booking enquiry on WhatsApp.**
There is no payment, no backend and no calendar. The spa confirms availability,
therapist and price in chat.

## Entry points

Every WhatsApp entry routes through `src/lib/whatsapp.ts` (`buildWhatsAppUrl`) and
`src/lib/booking.ts` (`buildBookingMessage`). Never inline `wa.me` URLs.

1. **Header** — persistent "Book on WhatsApp" button.
2. **Hero** — primary "Book on WhatsApp" + secondary "View treatments".
3. **Each treatment** — a small "Enquire" link pre-filled with that treatment.
4. **Each package** — "Enquire about this package" pre-filled with the package.
5. **Booking section** — the full form (below).
6. **Gift vouchers** — "Ask about vouchers".
7. **Ribbon & Footer** — generic enquiry.

## The booking form

`src/components/booking/BookingSection.astro` renders a form with:

- **What's it about?** — topic chips driven by `site.booking.topics`
  (`treatment`, `package`, `voucher`, `general`), labels in `ui.ts`.
- **Treatment** — a `<select>` of all treatments.
- **Preferred date** — `<input type="date">`.
- **Preferred time** — free text (spas vary; a strict time picker would overpromise).
- **Name** and **notes**.

`src/scripts/site.ts` (`bindBookingForm`) listens for `input`/`change`, rebuilds the
message and rewrites the anchor's `href`. Site-specific values and strings arrive via
the `#site-config` JSON block, so the script holds no spa literals.

## Message shape

```
I found you online and I'd like to request a booking.

*About*: A treatment
*Treatment*: Balinese Massage
*Preferred date*: 2026-10-20
*Preferred time*: morning
*Name*: Nimal
*Details*: First visit, prefer firm pressure

Thank you!
```

Empty fields are omitted. Labels come from `ui.ts` (`msg.*`), so the message is
localised with the page.

## Why not a real booking system?

Static-only keeps hosting free and the build trivial (`AGENTS.md` §3.2–3.3). A
calendar-based booking system is a **paid add-on** (see `categories.ts`); the
baseline deliberately says "enquiry", never "confirmed".

## Testing

- Tap each entry point at 375px and confirm the number is +94 74 343 0033 and the
  message is sensible.
- Fill the form and confirm the link updates live (topic, treatment, date, time,
  name, notes).
- Confirm no field is required and the anchor always opens WhatsApp.
