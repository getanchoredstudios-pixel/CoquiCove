/**
 * Booking + analytics plumbing.
 * Conversion-tracking ready: every CTA fires a `track()` call which pushes to
 * window.dataLayer (GTM / GA4) and any global analytics object if present.
 * Booking-engine ready: `submitInquiry` is the single integration point —
 * point it at Lodgify / Hostaway / Airbnb inquiry API / your CRM endpoint.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export const BOOKING_EVENT = "coqui:open-booking";

export function track(event: string, props: Record<string, unknown> = {}) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...props });
    window.gtag?.("event", event, props);
  } catch {
    /* analytics must never break the page */
  }
}

export function openBooking(source: string) {
  track("cta_click", { cta: "check_availability", source });
  window.dispatchEvent(new CustomEvent(BOOKING_EVENT, { detail: { source } }));
}

export type Inquiry = {
  name: string;
  email: string;
  phone: string;
  arrive: string;
  depart: string;
  guests: string;
  occasion: string;
  message: string;
  source: string;
};

/** Replace the body with a real POST to your booking engine / CRM. */
export async function submitInquiry(data: Inquiry): Promise<{ ok: boolean }> {
  track("generate_lead", {
    form: "availability_inquiry",
    source: data.source,
    guests: data.guests,
    occasion: data.occasion,
  });
  await new Promise((r) => setTimeout(r, 700));
  return { ok: true };
}

export const todayISO = () => new Date().toISOString().slice(0, 10);
