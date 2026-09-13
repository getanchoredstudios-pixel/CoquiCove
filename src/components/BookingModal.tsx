import { useCallback, useEffect, useRef, useState } from "react";
import { BOOKING_EVENT } from "@/lib/booking";
import { IMG } from "@/lib/site";
import { Icon, Photo } from "@/lib/ui";
import AvailabilityForm from "@/components/AvailabilityForm";

export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("unknown");
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ source?: string }>).detail;
      setSource(detail?.source ?? "unknown");
      lastFocused.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    window.addEventListener(BOOKING_EVENT, handler);
    return () => window.removeEventListener(BOOKING_EVENT, handler);
  }, []);

  useEffect(() => {
    if (!open) {
      lastFocused.current?.focus?.();
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("input")?.focus();
    }, 80);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto p-4 py-8 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      <button
        aria-label="Close availability request"
        onClick={close}
        className="fixed inset-0 cursor-default bg-jungle-950/85 backdrop-blur-md"
        style={{ animation: "fadeUpIn .3s ease-out both" }}
      />
      <div
        ref={panelRef}
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-jungle-900/95 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
        style={{ animation: "fadeUpIn .45s cubic-bezier(.22,1,.36,1) both" }}
      >
        <div className="grid md:grid-cols-[0.85fr_1fr]">
          <div className="relative hidden min-h-full md:block">
            <Photo
              id={IMG.hero}
              w={700}
              h={900}
              alt="Glamping retreat surrounded by tropical palms"
              sizes="40vw"
              className="absolute inset-0 anim-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-jungle-950 via-jungle-950/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <p className="eyebrow text-gold-300">Coquí Cove</p>
              <p className="mt-2 font-display text-xl leading-snug text-sand-50">
                Close enough to experience Puerto Rico. Secluded enough to disappear into it.
              </p>
            </div>
          </div>

          <div className="relative max-h-[86vh] overflow-y-auto p-6 sm:p-8">
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-sand-200/80 transition hover:border-gold-300/60 hover:text-gold-300"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>
            <h2 id="booking-title" className="font-display text-3xl text-sand-50">
              Check availability
            </h2>
            <p className="mt-2 mb-6 max-w-md text-sm leading-relaxed text-sand-200/75">
              Tell us your dates and we'll come back with availability, current rates and exactly what's included.
              Booking direct always gets you our best rate.
            </p>
            <AvailabilityForm source={source} />
          </div>
        </div>
      </div>
    </div>
  );
}
