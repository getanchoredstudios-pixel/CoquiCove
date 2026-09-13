import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { CTA, Icon, Photo, Reveal, useScrollY, usePrefersReducedMotion } from "@/lib/ui";
import { IMG, NAV_LINKS, TRUST } from "@/lib/site";
import { openBooking, track } from "@/lib/booking";

/* ------------------------------- Logo ------------------------------- */

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#top"
      aria-label="Coquí Cove — home"
      className={cn("group flex items-center gap-3", className)}
      onClick={() => track("nav_click", { target: "logo" })}
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/40 bg-gradient-to-br from-jungle-600/70 to-jungle-900 transition-transform duration-500 group-hover:rotate-[8deg]">
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-gold-300" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 20c0-8 6-14 16-14 0 10-6 15-16 14Z" />
          <path d="m4 20 8-8" />
        </svg>
        <span className="absolute inset-0 rounded-full bg-gold-400/20 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.15rem] tracking-tight text-sand-50">Coquí Cove</span>
        <span className="mt-0.5 text-[0.55rem] uppercase tracking-[0.32em] text-gold-300/80">Trujillo Alto · PR</span>
      </span>
    </a>
  );
}

/* -------------------------------- Nav ------------------------------- */

export function Nav() {
  const y = useScrollY();
  const solid = y > 40;
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#experience"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-gold-400 focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-jungle-950"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
          solid
            ? "glass border-b border-white/8 py-2.5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]"
            : "border-b border-transparent py-5",
        )}
      >
        <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => track("nav_click", { target: l.label })}
                  className="group relative rounded-full px-4 py-2 text-[0.82rem] font-medium text-sand-100/80 transition-colors duration-300 hover:text-sand-50"
                >
                  {l.label}
                  <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-gold-400 to-transparent transition-transform duration-400 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <CTA
              href="#availability"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={(e) => {
                e.preventDefault();
                openBooking("navbar");
              }}
            >
              Check Availability
            </CTA>

            <button
              type="button"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              onClick={() => setMenu((m) => !m)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-sand-50 transition hover:border-gold-300/60 lg:hidden"
            >
              <span className="relative block h-3 w-4.5">
                <span
                  className={cn(
                    "absolute left-0 h-px w-4.5 bg-current transition-all duration-300",
                    menu ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 h-px w-4.5 bg-current transition-all duration-300",
                    menu && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px w-4.5 bg-current transition-all duration-300",
                    menu ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[95] lg:hidden",
          menu ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!menu}
      >
        <div
          className={cn(
            "absolute inset-0 bg-jungle-950/95 backdrop-blur-xl transition-opacity duration-500",
            menu ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMenu(false)}
        />
        <div className="relative flex h-full flex-col justify-center px-8">
          <ul className="space-y-1">
            {NAV_LINKS.map((l, i) => (
              <li
                key={l.href}
                style={{ transitionDelay: `${menu ? 120 + i * 70 : 0}ms` }}
                className={cn(
                  "transition-all duration-500",
                  menu ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
                )}
              >
                <a
                  href={l.href}
                  onClick={() => setMenu(false)}
                  className="block border-b border-white/8 py-4 font-display text-3xl text-sand-50 transition-colors hover:text-gold-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div
            style={{ transitionDelay: `${menu ? 480 : 0}ms` }}
            className={cn("mt-10 transition-all duration-500", menu ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0")}
          >
            <CTA
              href="#availability"
              size="lg"
              className="w-full"
              onClick={(e) => {
                e.preventDefault();
                setMenu(false);
                openBooking("mobile-menu");
              }}
            >
              Check Availability
            </CTA>
            <p className="mt-5 text-center text-xs tracking-widest text-sand-300/50 uppercase">
              Trujillo Alto · Puerto Rico
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------- Hero ------------------------------- */

const HERO_SLIDES = [
  { id: IMG.hero, alt: "Glamping retreat framed by tall palms in the tropics" },
  { id: IMG.mistyPalms, alt: "Mist drifting through a dense palm forest at dawn" },
  { id: IMG.deckSunset, alt: "A tropical wooden deck glowing at golden hour" },
];

export function Hero() {
  const [slide, setSlide] = useState(0);
  const y = useScrollY();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 7000);
    return () => window.clearInterval(t);
  }, [reduced]);

  const parallax = reduced ? 0 : Math.min(y, 900) * 0.25;

  return (
    <section id="top" className="relative isolate grain min-h-[100svh] overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0 -z-10" style={{ transform: `translate3d(0, ${parallax}px, 0)` }}>
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-[2200ms] ease-in-out",
              i === slide ? "opacity-100" : "opacity-0",
            )}
          >
            <Photo
              id={s.id}
              w={1600}
              h={1000}
              alt={i === 0 ? s.alt : ""}
              sizes="100vw"
              priority={i === 0}
              className={cn("scale-105", !reduced && i === slide && "anim-zoom")}
            />
          </div>
        ))}
      </div>

      {/* Layered gradients */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-jungle-950/85 via-jungle-950/45 to-jungle-950" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_20%_30%,rgba(4,20,15,0.35),rgba(4,20,15,0.85))]" />

      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="anim-aura absolute -left-24 top-1/4 h-[26rem] w-[26rem] rounded-full bg-lagoon-500/20 blur-[110px]" />
        <div className="anim-aura absolute -right-20 bottom-10 h-[22rem] w-[22rem] rounded-full bg-gold-500/15 blur-[120px] [animation-delay:-6s]" />
        <div className="anim-float absolute right-[18%] top-[22%] h-2 w-2 rounded-full bg-gold-300/70 blur-[1px]" />
        <div className="anim-float absolute left-[22%] bottom-[28%] h-1.5 w-1.5 rounded-full bg-lagoon-200/60 blur-[1px] [animation-delay:-4s]" />
        <div className="anim-float absolute left-[62%] top-[62%] h-1 w-1 rounded-full bg-sand-100/60 [animation-delay:-8s]" />
      </div>

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-28 pt-32 sm:px-8">
        <div className="max-w-3xl">
          <p className="hero-in glass-light inline-flex items-center gap-2.5 rounded-full border border-white/12 px-4 py-2 text-[0.68rem] uppercase tracking-[0.22em] text-sand-100/90 [animation-delay:180ms]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-300 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-400" />
            </span>
            Boutique glamping · Trujillo Alto, Puerto Rico
          </p>

          <h1 className="hero-in mt-7 font-display text-[clamp(2.9rem,9vw,6.5rem)] font-light leading-[0.94] tracking-[-0.03em] text-sand-50 [animation-delay:320ms]">
            Escape Into
            <span className="block gold-text italic">Puerto Rico.</span>
          </h1>

          <p className="hero-in mt-7 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-sand-100/85 sm:text-lg [animation-delay:480ms]">
            A private tropical retreat tucked into the green hills of Trujillo Alto — minutes from San Juan,
            worlds away from a hotel corridor. Wake inside the canopy, spend the day on the island, and fall
            asleep to the coquí.
          </p>

          <div className="hero-in mt-10 flex flex-col gap-3.5 sm:flex-row sm:items-center [animation-delay:640ms]">
            <CTA
              href="#availability"
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                openBooking("hero");
              }}
            >
              Check Availability
              <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </CTA>
            <CTA href="#experience" variant="outline" size="lg" onClick={() => track("cta_click", { cta: "explore", source: "hero" })}>
              Explore Coquí Cove
            </CTA>
          </div>

          <p className="hero-in mt-8 text-sm text-sand-200/60 [animation-delay:780ms]">
            Close enough to experience Puerto Rico. Secluded enough to disappear into it.
          </p>
        </div>
      </div>

      {/* Slide dots + scroll cue */}
      <div className="absolute inset-x-0 bottom-7 z-10 flex items-end justify-between px-5 sm:px-8">
        <div className="flex gap-2" role="tablist" aria-label="Hero imagery">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === slide}
              aria-label={`Show hero image ${i + 1}`}
              onClick={() => setSlide(i)}
              className={cn(
                "h-1 rounded-full transition-all duration-500",
                i === slide ? "w-9 bg-gold-400" : "w-4 bg-sand-100/30 hover:bg-sand-100/60",
              )}
            />
          ))}
        </div>
        <a
          href="#trust"
          aria-label="Scroll to discover more"
          className="group hidden flex-col items-center gap-2 text-sand-100/60 transition hover:text-gold-300 sm:flex"
        >
          <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
          <span className="relative flex h-9 w-5 justify-center rounded-full border border-current/40 pt-1.5">
            <span className="anim-dot h-1.5 w-1.5 rounded-full bg-current" />
          </span>
        </a>
        <div className="w-16 sm:hidden" />
      </div>
    </section>
  );
}

/* ---------------------------- Trust strip --------------------------- */

export function TrustStrip() {
  return (
    <section id="trust" aria-label="Why guests choose Coquí Cove" className="relative border-y border-white/8 bg-jungle-900">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <Reveal className="mb-10 text-center">
          <p className="eyebrow text-gold-300/90">A different kind of stay</p>
        </Reveal>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-5">
          {TRUST.map((t, i) => (
            <Reveal as="li" key={t.title} delay={i * 90} className="group text-center lg:text-left">
              <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/25 bg-gold-400/5 text-gold-300 transition-all duration-500 group-hover:border-gold-400/60 group-hover:bg-gold-400/12 lg:mx-0">
                <Icon name={t.icon} />
              </span>
              <h3 className="text-[1.02rem] leading-snug text-sand-50">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-sand-200/65">{t.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
