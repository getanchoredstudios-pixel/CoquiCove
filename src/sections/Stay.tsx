import { useState } from "react";
import { cn } from "@/utils/cn";
import { CTA, Eyebrow, Icon, Photo, Reveal, useParallax } from "@/lib/ui";
import { CONTACT, FAQS, IMG, NAV_LINKS } from "@/lib/site";
import { openBooking, track } from "@/lib/booking";
import AvailabilityForm from "@/components/AvailabilityForm";

/* -------------------------------- Stay -------------------------------- */

const INCLUDED = [
  "A private accommodation held just for your booking",
  "Comfort-focused bedding — glamping, not roughing it",
  "Your own outdoor space to sit, eat and slow down in",
  "On-site parking for your rental car",
  "A locally hosted arrival guide to the surrounding area",
  "Direct access to your host by message throughout your stay",
];

export function StaySection() {
  return (
    <section id="stay" className="relative overflow-hidden bg-jungle-950 py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-20 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-lagoon-500/10 blur-[140px] anim-aura" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">Plan your stay</Eyebrow>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-6 text-balance font-display text-[clamp(2.1rem,5.6vw,3.7rem)] font-light leading-[1.05] text-sand-50">
              Tell us your dates.<span className="block italic gold-text">We'll do the rest.</span>
            </h2>
          </Reveal>
          <Reveal delay={170}>
            <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-sand-200/70">
              Rates shift with the season, length of stay and what's happening on the island. Send your dates and
              we'll reply with real availability and current pricing — booking direct always gets you our best rate.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
          {/* Stay details */}
          <Reveal variant="left">
            <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-jungle-900/60">
              <div className="relative h-52 overflow-hidden sm:h-64">
                <Photo
                  id={IMG.tentBedLux}
                  w={1000}
                  h={620}
                  alt="An elegantly made bed inside a private canvas retreat"
                  sizes="(max-width: 1024px) 92vw, 45vw"
                  className="transition-transform duration-[1400ms] ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jungle-900 via-jungle-900/30 to-transparent" />
                <span className="glass-light absolute left-5 top-5 rounded-full border border-white/15 px-3.5 py-1.5 text-[0.62rem] uppercase tracking-[0.2em] text-sand-50">
                  The Retreat
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl text-sand-50">Stay details</h3>
                    <p className="mt-1.5 text-sm text-sand-200/60">Best suited to two guests · Trujillo Alto, PR</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-gold-300/80">Rates</span>
                    <span className="mt-1 block text-sm text-sand-100">Seasonal — sent on request</span>
                  </div>
                </div>

                <ul className="mt-7 space-y-3.5">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.93rem] leading-relaxed text-sand-200/80">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-400/12 text-gold-300">
                        <Icon name="check" className="h-3 w-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-7 rounded-xl border border-white/8 bg-white/[0.03] p-4 text-xs leading-relaxed text-sand-300/60">
                  Occupancy limits, minimum-night requirements, check-in windows and the full cancellation policy
                  are confirmed in writing with your quote — before any payment is requested.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <CTA
                    href="#availability"
                    size="md"
                    onClick={(e) => {
                      e.preventDefault();
                      openBooking("stay-card");
                    }}
                  >
                    Book Your Escape
                  </CTA>
                  <CTA href="#faq" variant="outline" size="md" onClick={() => track("cta_click", { cta: "faq", source: "stay" })}>
                    Stay Details
                  </CTA>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Inline availability form */}
          <Reveal variant="right" delay={120}>
            <div
              id="availability"
              className="relative h-full scroll-mt-28 overflow-hidden rounded-3xl border border-gold-400/20 bg-gradient-to-b from-jungle-800/80 to-jungle-900/90 p-6 sm:p-8"
            >
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gold-500/15 blur-[70px] anim-aura" />
              <div className="relative">
                <h3 className="font-display text-2xl text-sand-50">Check availability</h3>
                <p className="mt-2 mb-6 max-w-md text-sm leading-relaxed text-sand-200/70">
                  No payment, no commitment. Just tell us when you'd like to disappear for a few days.
                </p>
                <AvailabilityForm source="stay-section" compact />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- FAQ -------------------------------- */

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden border-y border-white/8 bg-jungle-900 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>Good to know</Eyebrow>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-6 text-balance font-display text-[clamp(2rem,5vw,3.2rem)] font-light leading-[1.06] text-sand-50">
              Questions, answered<span className="block italic text-sand-200/80">honestly.</span>
            </h2>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-sand-200/65">
              If something isn't confirmed here yet, it's because we'd rather tell you the real answer for your
              dates than promise something generic.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <button
              onClick={() => openBooking("faq")}
              className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-gold-300 transition-colors hover:text-gold-200"
            >
              Still have a question? Ask us
              <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>

        <ul className="divide-y divide-white/8 border-y border-white/8">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={f.q} delay={Math.min(i, 6) * 60}>
                <h3>
                  <button
                    onClick={() => {
                      setOpen(isOpen ? null : i);
                      if (!isOpen) track("faq_open", { question: f.q });
                    }}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "font-display text-[1.05rem] leading-snug transition-colors duration-300 sm:text-lg",
                        isOpen ? "text-gold-200" : "text-sand-50 group-hover:text-sand-100",
                      )}
                    >
                      {f.q}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-400",
                        isOpen
                          ? "rotate-180 border-gold-400/60 text-gold-300"
                          : "border-white/15 text-sand-200/70 group-hover:border-white/35",
                      )}
                    >
                      <Icon name="chev" className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div className="acc-panel" data-open={isOpen} id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`}>
                  <div>
                    <p className="max-w-2xl pb-6 pr-10 text-[0.95rem] leading-relaxed text-sand-200/72">{f.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------ Final CTA ----------------------------- */

export function FinalCta() {
  const { ref, offset } = useParallax<HTMLDivElement>(0.16);

  return (
    <section id="book" className="relative isolate grain overflow-hidden">
      <div ref={ref} className="absolute inset-0 -z-10 scale-125" style={{ transform: `translate3d(0,${offset}px,0) scale(1.25)` }}>
        <Photo id={IMG.bungalowNight} w={1600} h={1000} alt="" sizes="100vw" className="anim-zoom" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-jungle-950/90 via-jungle-950/75 to-jungle-950" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="anim-aura absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-gold-500/15 blur-[110px]" />
        <div className="anim-aura absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-lagoon-500/15 blur-[110px] [animation-delay:-7s]" />
      </div>

      <div className="mx-auto max-w-4xl px-5 py-28 text-center sm:px-8 sm:py-40">
        <Reveal>
          <Eyebrow className="justify-center">Coquí Cove · Trujillo Alto</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-7 text-balance font-display text-[clamp(2.3rem,7vw,4.8rem)] font-light leading-[1.02] text-sand-50">
            Your Puerto Rico escape<span className="block italic gold-text">is waiting.</span>
          </h2>
        </Reveal>
        <Reveal delay={190}>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-sand-100/80">
            Trade hotel hallways and crowded resorts for tropical mornings, quiet evenings, and a Puerto Rico
            experience that feels entirely your own.
          </p>
        </Reveal>
        <Reveal delay={280}>
          <div className="mt-11 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <CTA
              href="#availability"
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                openBooking("final-cta");
              }}
            >
              Check Availability
              <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </CTA>
            <CTA
              href="#stay"
              variant="outline"
              size="lg"
              onClick={() => track("cta_click", { cta: "plan_your_stay", source: "final" })}
            >
              Plan Your Stay
            </CTA>
          </div>
        </Reveal>
        <Reveal delay={360}>
          <p className="mt-8 text-xs uppercase tracking-[0.28em] text-sand-300/50">
            Experience Puerto Rico differently
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Footer ------------------------------ */

const IG_STRIP = [IMG.hero, IMG.deckSunset, IMG.palmLeaves, IMG.beachPR, IMG.osjStreet, IMG.hammockForest];

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-jungle-950 pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Instagram-style strip */}
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-gold-300/80">Follow along</p>
              <p className="mt-2 font-display text-xl text-sand-50">{CONTACT.instagram}</p>
            </div>
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("social_click", { network: "instagram" })}
              className="group inline-flex items-center gap-2 text-sm text-sand-200/70 transition-colors hover:text-gold-300"
            >
              <Icon name="ig" className="h-4 w-4" />
              <span className="hidden sm:inline">See more of the island</span>
              <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        <ul className="mt-6 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
          {IG_STRIP.map((id, i) => (
            <Reveal as="li" key={id} delay={i * 60}>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-xl border border-white/8"
                aria-label="Coquí Cove on Instagram"
              >
                <Photo id={id} w={420} h={420} alt="" sizes="(max-width: 640px) 30vw, 16vw" className="opacity-75 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" />
                <span className="absolute inset-0 flex items-center justify-center bg-jungle-950/50 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  <Icon name="ig" className="h-5 w-5 text-sand-50" />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        {/* Main footer */}
        <div className="mt-16 grid gap-12 border-t border-white/8 pt-14 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <p className="font-display text-2xl text-sand-50">Coquí Cove</p>
            <p className="mt-1 text-[0.6rem] uppercase tracking-[0.32em] text-gold-300/80">Boutique glamping · Puerto Rico</p>
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-sand-200/65">
              A private tropical retreat in the hills of Trujillo Alto — minutes from San Juan, immersed in the
              green, and built for people who want the island on their own terms.
            </p>
            <button
              onClick={() => openBooking("footer")}
              className="btn-sheen group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 px-6 py-3 text-sm font-semibold text-jungle-950 transition-transform duration-300 hover:-translate-y-0.5"
            >
              Check Availability
              <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-[0.65rem] uppercase tracking-[0.24em] text-sand-300/50">Explore</h2>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-sand-200/70 transition-colors hover:text-gold-300">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#gallery" className="text-sm text-sand-200/70 transition-colors hover:text-gold-300">
                  Gallery
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.65rem] uppercase tracking-[0.24em] text-sand-300/50">Policies</h2>
            <ul className="mt-5 space-y-3">
              {["Privacy Policy", "Terms of Service", "Cancellation Policy", "Accessibility"].map((p) => (
                <li key={p}>
                  <a href="#faq" className="text-sm text-sand-200/70 transition-colors hover:text-gold-300">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.65rem] uppercase tracking-[0.24em] text-sand-300/50">Contact</h2>
            <ul className="mt-5 space-y-3.5 text-sm text-sand-200/70">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="group inline-flex items-center gap-2.5 transition-colors hover:text-gold-300">
                  <Icon name="mail" className="h-4 w-4 text-gold-400/70" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`} className="group inline-flex items-center gap-2.5 transition-colors hover:text-gold-300">
                  <Icon name="phone" className="h-4 w-4 text-gold-400/70" />
                  {CONTACT.phone}
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400/70" />
                <span>
                  {CONTACT.location}
                  <span className="block text-xs text-sand-300/50">Exact address shared with confirmed guests</span>
                </span>
              </li>
              <li>
                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-gold-300"
                >
                  <Icon name="ig" className="h-4 w-4 text-gold-400/70" />
                  {CONTACT.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/8 py-8 text-xs text-sand-300/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Coquí Cove. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Glamping near San Juan · Romantic getaways in Puerto Rico · Trujillo Alto
          </p>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------- Mobile sticky CTA -------------------------- */

export function MobileBookingBar() {
  return (
    <div className="glass fixed inset-x-0 bottom-0 z-[90] border-t border-white/10 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.7rem] uppercase tracking-[0.18em] text-gold-300/80">Coquí Cove</p>
          <p className="truncate text-xs text-sand-200/70">Seasonal rates · sent on request</p>
        </div>
        <button
          onClick={() => openBooking("mobile-bar")}
          className="btn-sheen shrink-0 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 px-5 py-3 text-sm font-semibold text-jungle-950"
        >
          Check Availability
        </button>
      </div>
    </div>
  );
}
