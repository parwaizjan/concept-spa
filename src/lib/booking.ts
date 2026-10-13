import { site, type BookingTopic } from "../data/site";
import type { UiKey } from "../i18n/ui";

/**
 * The WhatsApp booking enquiry. This is deliberately NOT a confirmed
 * reservation — no calendar, no payment, no cart. The spa confirms availability
 * in chat. See `docs/BOOKING-FLOW.md`.
 */
export type BookingDetails = {
  topic?: BookingTopic;
  treatment?: string;
  date?: string;
  time?: string;
  name?: string;
  notes?: string;
};

/** Assemble the WhatsApp enquiry text. `t` is the locale-bound translator. */
export function buildBookingMessage(
  details: BookingDetails,
  t: (key: UiKey) => string,
): string {
  // Every visitor-facing enquiry is tagged for the demo (empty in a real clone).
  const lines: string[] = [`${site.demoTag}${t("msg.intro")}`, ""];

  if (details.topic) {
    lines.push(
      `*${t("msg.topic")}*: ${t(`booking.topic.${details.topic}` as UiKey)}`,
    );
  }
  if (details.treatment?.trim()) {
    lines.push(`*${t("msg.treatment")}*: ${details.treatment.trim()}`);
  }
  if (details.date?.trim()) {
    lines.push(`*${t("msg.date")}*: ${details.date.trim()}`);
  }
  if (details.time?.trim()) {
    lines.push(`*${t("msg.time")}*: ${details.time.trim()}`);
  }
  if (details.name?.trim()) {
    lines.push(`*${t("msg.name")}*: ${details.name.trim()}`);
  }
  if (details.notes?.trim()) {
    lines.push(`*${t("msg.notes")}*: ${details.notes.trim()}`);
  }

  lines.push("", t("msg.footer"));
  return lines.join("\n");
}
