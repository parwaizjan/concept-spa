/**
 * Client script: runtime Google Sheet price refresh, the "open now" badge, and
 * the WhatsApp booking-enquiry link builder. Plain DOM, no framework. Runs on
 * every page (there is only one). All spa-specific values and UI strings arrive
 * through the `#site-config` JSON block rendered by `BaseLayout`.
 */
import { formatPrice } from "../lib/format";
import { getSheetCsvUrl, parsePriceSheet } from "../lib/sheet";
import { buildBookingMessage } from "../lib/booking";
import { buildWhatsAppUrl } from "../lib/whatsapp";
import type { BookingTopic } from "../data/site";
import type { UiKey } from "../i18n/ui";

type SiteConfig = {
  whatsappNumber: string;
  siteName: string;
  lang: string;
  i18n: Record<string, string>;
  prices: {
    mode: "runtime" | "build";
    sheetId: string;
    sheetTab: string;
    refreshMinutes: number;
  };
};

const CACHE_PREFIX = "lotus-and-lime-prices-sheet-v1";

function readConfig(): SiteConfig | null {
  const node = document.getElementById("site-config");
  if (!node?.textContent) return null;
  try {
    return JSON.parse(node.textContent) as SiteConfig;
  } catch {
    return null;
  }
}

function updateOpenNow(t: (key: UiKey) => string): void {
  const badge = document.querySelector<HTMLElement>("[data-open-badge]");
  if (!badge) return;

  const rows = Array.from(
    document.querySelectorAll<HTMLElement>("[data-hours-day]"),
  );
  if (rows.length === 0) return;

  const now = new Date();
  const today = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  const toMinutes = (value: string): number => {
    const [h, m] = value.split(":").map(Number);
    return (h ?? 0) * 60 + (m ?? 0);
  };

  const row = rows.find((r) => Number(r.dataset.hoursDay) === today);
  let open = false;
  if (row?.dataset.hoursOpen && row?.dataset.hoursClose) {
    const start = toMinutes(row.dataset.hoursOpen);
    const end = toMinutes(row.dataset.hoursClose);
    open = minutes >= start && minutes < end;
  }

  badge.textContent = open ? t("visit.openNow") : t("visit.closedNow");
  badge.className = `badge ${open ? "bg-success text-white" : "bg-danger text-white"}`;
  badge.hidden = false;
}

async function fetchSheet(
  sheetId: string,
  sheetTab: string,
  refreshMinutes: number,
) {
  const cacheKey = `${CACHE_PREFIX}:${sheetId}`;
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached) as { at: number; data: unknown };
      if (Date.now() - parsed.at < refreshMinutes * 60_000) {
        return parsed.data as ReturnType<typeof parsePriceSheet>;
      }
    }
  } catch {
    /* ignore cache errors */
  }

  try {
    const response = await fetch(getSheetCsvUrl(sheetId, sheetTab));
    if (!response.ok) return null;
    const data = parsePriceSheet(await response.text());
    try {
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({ at: Date.now(), data }),
      );
    } catch {
      /* ignore cache write errors */
    }
    return data;
  } catch {
    return null;
  }
}

async function refreshFromSheet(config: SiteConfig): Promise<void> {
  const { mode, sheetId, sheetTab, refreshMinutes } = config.prices;
  if (mode !== "runtime" || !sheetId) return;

  const sheet = await fetchSheet(sheetId, sheetTab, refreshMinutes);
  if (!sheet) return;

  for (const [id, row] of Object.entries(sheet)) {
    const selector = CSS.escape(id);
    const hosts = document.querySelectorAll<HTMLElement>(
      `[data-treatment][data-id="${selector}"]`,
    );

    hosts.forEach((host) => {
      if (typeof row.price === "number") {
        host.dataset.price = String(row.price);
        host
          .querySelectorAll<HTMLElement>("[data-price-display]")
          .forEach((node) => {
            node.textContent = formatPrice(row.price as number);
          });
      }

      if (typeof row.available === "boolean") {
        host.dataset.available = String(row.available);
        host.classList.toggle("opacity-60", !row.available);
        const unavailable =
          host.querySelector<HTMLElement>("[data-unavailable]");
        if (unavailable) unavailable.hidden = row.available;
      }
    });
  }
}

/** Keep the "Send on WhatsApp" booking link in sync with the form. */
function bindBookingForm(config: SiteConfig, t: (key: UiKey) => string): void {
  const form = document.querySelector<HTMLFormElement>("[data-booking-form]");
  const send = document.querySelector<HTMLAnchorElement>("[data-booking-send]");
  if (!form || !send) return;

  const update = () => {
    const topic = form.querySelector<HTMLInputElement>(
      'input[name="topic"]:checked',
    )?.value as BookingTopic | undefined;
    const treatment = form.querySelector<HTMLSelectElement>(
      "[data-booking-treatment]",
    )?.value;
    const date = form.querySelector<HTMLInputElement>(
      "[data-booking-date]",
    )?.value;
    const time = form.querySelector<HTMLInputElement>(
      "[data-booking-time]",
    )?.value;
    const name = form.querySelector<HTMLInputElement>(
      "[data-booking-name]",
    )?.value;
    const notes = form.querySelector<HTMLTextAreaElement>(
      "[data-booking-note]",
    )?.value;

    const message = buildBookingMessage(
      { topic, treatment, date, time, name, notes },
      t,
    );
    send.href = buildWhatsAppUrl(message, config.whatsappNumber);
  };

  form.addEventListener("input", update);
  form.addEventListener("change", update);
  update();
}

const config = readConfig();
if (config) {
  const t = (key: UiKey): string => config.i18n[key] ?? key;
  updateOpenNow(t);
  bindBookingForm(config, t);
  void refreshFromSheet(config);
}
