import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { Eyebrow, Icon, Photo, Reveal, useParallax } from "@/lib/ui";
import { GALLERY, GALLERY_CATS, IMG, WHY, px } from "@/lib/site";
import { openBooking, track } from "@/lib/booking";

/* ------------------------------ Lightbox ----------------------------- */

function Lightbox({
  items,
  index,
  onClose,
  onNav,
}: {
  items: typeof GALLERY;
  index: number;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
  const touchX = useRef<number | null>(null);
  const item = items[index];

  const next = useCallback(() => onNav((index + 1) % items.length), [index, items.length, onNav]);
  const prev = useCallback(() => onNav((index - 1 + items.length) % items.length), [index, items.length, onNav]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [next, prev, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.caption} — image ${index + 1} of ${items.length}`}
      className="fixed inset-0 z-[130] flex flex-col bg-jungle-950/96 backdrop-blur-lg"
      style={{ animation: "fadeUpIn .3s ease-out both" }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <span className="text-xs uppercase tracking-[0.25em] text-gold-300/80">{item.cat}</span>
        <button
          onClick={onClose}
          aria-label="Close gallery"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-sand-100 transition hover:border-gold-300/70 hover:text-gold-300"
        >
          <Icon name="close" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-3 pb-4 sm:px-16">
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-jungle-900/60 text-sand-100 transition hover:border-gold-300/70 hover:text-gold-300 sm:left-4"
        >
          <Icon name="arrow" className="h-5 w-5 rotate-180" />
        </button>
        <img
          key={item.id}
          src={px(item.id, 1500, 1000)}
          alt={item.alt}
          className="max-h-[74vh] w-auto max-w-full rounded-2xl object-contain shadow-[0_40px_120px_-40px_rgba(0,0,0,1)]"
          style={{ animation: "fadeUpIn .5s cubic-bezier(.22,1,.36,1) both" }}
        />
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-jungle-900/60 text-sand-100 transition hover:border-gold-300/70 hover:text-gold-300 sm:right-4"
        >
          <Icon name="arrow" className="h-5 w-5" />
        </button>
      </div>

      <div className="px-5 pb-8 text-center sm:px-8">
        <p className="font-display text-lg text-sand-50">{item.caption}</p>
        <p className="mt-1 text-xs tracking-widest text-sand-300/50">
          {index + 1} / {items.length} · swipe or use arrow keys
        </p>
      </div>
    </div>
  );
}

/* ------------------------------ Gallery ------------------------------ */

export function GallerySection() {
  const [cat, setCat] = useState<(typeof GALLERY_CATS)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);

  const items = cat === "All" ? GALLERY : GALLERY.filter((g) => g.cat === cat);

  return (
    <section id="gallery" className="relative overflow-hidden bg-jungle-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>The property & the island</Eyebrow>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-6 text-balance font-display text-[clamp(2rem,5.2vw,3.4rem)] font-light leading-[1.06] text-sand-50">
                Look around before<span className="block italic gold-text">you arrive.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div role="tablist" aria-label="Filter gallery" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {GALLERY_CATS.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={cat === c}
                  onClick={() => {
                    setCat(c);
                    track("gallery_filter", { category: c });
                  }}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300",
                    cat === c
                      ? "border-gold-400/70 bg-gold-400/15 text-gold-200"
                      : "border-white/12 text-sand-200/70 hover:border-white/30 hover:text-sand-50",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <ul className="mt-12 grid auto-rows-[10.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((g, i) => (
            <Reveal
              as="li"
              key={`${g.id}-${cat}`}
              delay={(i % 8) * 60}
              className={cn("group relative", g.tall && "row-span-2")}
            >
              <button
                onClick={() => {
                  setOpen(i);
                  track("gallery_open", { image: g.caption });
                }}
                className="relative block h-full w-full overflow-hidden rounded-2xl border border-white/8 text-left"
                aria-label={`Open image: ${g.caption}`}
              >
                <Photo
                  id={g.id}
                  w={g.tall ? 700 : 700}
                  h={g.tall ? 950 : 520}
                  alt={g.alt}
                  sizes="(max-width: 640px) 48vw, (max-width: 1024px) 32vw, 24vw"
                  className="transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-jungle-950/85 via-jungle-950/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                <span className="absolute inset-x-4 bottom-4 translate-y-1.5 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="block text-[0.6rem] uppercase tracking-[0.22em] text-gold-300">{g.cat}</span>
                  <span className="mt-1 block text-sm leading-snug text-sand-50">{g.caption}</span>
                </span>
                <span className="glass-light absolute right-3 top-3 flex h-8 w-8 scale-90 items-center justify-center rounded-full border border-white/20 text-sand-50 opacity-0 transition-all duration-400 group-hover:scale-100 group-hover:opacity-100">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
                    <path d="M4 10V4h6M20 14v6h-6M20 10V4h-6M4 14v6h6" />
                  </svg>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      {open !== null && items[open] && (
        <Lightbox items={items} index={open} onClose={() => setOpen(null)} onNav={setOpen} />
      )}
    </section>
  );
}

/* -------------------------------- Why -------------------------------- */

export function WhySection() {
  const { ref, offset } = useParallax<HTMLDivElement>(0.08);

  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="relative overflow-hidden border-y border-white/8 bg-jungle-900 py-24 sm:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-jungle-500/15 blur-[130px] anim-aura" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>Why Coquí Cove</Eyebrow>
          </Reveal>
          <Reveal delay={90}>
            <h2 id="why-title" className="mt-6 text-balance font-display text-[clamp(2rem,5.2vw,3.5rem)] font-light leading-[1.05] text-sand-50">
              You didn't fly to an island<span className="block italic gold-text">to stay in a hallway.</span>
            </h2>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-sand-200/70">
              Hotels give you a room with a view of other rooms. Rentals give you someone else's furniture.
              Coquí Cove gives you a piece of Puerto Rico to yourself — with San Juan close enough that you
              never have to choose between nature and the city.
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-9">
            <div ref={ref} className="relative aspect-[5/3] overflow-hidden rounded-3xl border border-white/10">
              <div style={{ transform: `translate3d(0,${offset}px,0) scale(1.12)` }} className="absolute inset-0">
                <Photo id={IMG.hammockTerrace} w={900} h={600} alt="A hammock strung on a quiet tropical terrace" sizes="(max-width:1024px) 92vw, 40vw" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-jungle-950/70 to-transparent" />
            </div>
          </Reveal>
        </div>

        <ul className="space-y-3">
          {WHY.map((w, i) => (
            <Reveal as="li" key={w.k} delay={i * 90}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.025] p-6 transition-all duration-500 hover:border-gold-400/25 hover:bg-white/[0.05] sm:p-8">
                <span
                  aria-hidden
                  className="absolute -right-2 -top-4 font-display text-7xl text-white/[0.04] transition-all duration-500 group-hover:text-gold-400/10"
                >
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl font-light text-sand-50 sm:text-[1.7rem]">{w.k}</h3>
                <p className="mt-3 max-w-xl text-pretty leading-relaxed text-sand-200/70">{w.v}</p>
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold-400/70 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
              </div>
            </Reveal>
          ))}

          <Reveal as="li" delay={520}>
            <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-gold-400/20 bg-gold-400/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <p className="text-pretty text-[0.98rem] leading-relaxed text-sand-100">
                Dates fill fastest around holidays, long weekends and high season.
              </p>
              <button
                onClick={() => openBooking("why-section")}
                className="btn-sheen group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 px-6 py-3 text-sm font-semibold text-jungle-950 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Check Availability
                <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
