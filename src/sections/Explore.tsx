import { cn } from "@/utils/cn";
import { Eyebrow, Icon, Photo, Reveal } from "@/lib/ui";
import { EXPLORE } from "@/lib/site";
import { openBooking } from "@/lib/booking";

export function ExploreSection() {
  return (
    <section id="explore" className="relative overflow-hidden bg-jungle-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">Experience Puerto Rico</Eyebrow>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-6 text-balance font-display text-[clamp(2.1rem,5.6vw,3.7rem)] font-light leading-[1.05] text-sand-50">
              A quiet base camp for<span className="block italic gold-text">a very loud island.</span>
            </h2>
          </Reveal>
          <Reveal delay={170}>
            <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-sand-200/70">
              Trujillo Alto sits where the San Juan metro softens into green hills. Forts, beaches, rainforest
              and the best food on the island are all within reach — and then you get to leave the crowds behind
              at the end of the day.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[13rem]">
          {EXPLORE.map((e, i) => (
            <Reveal as="li" key={e.title} delay={(i % 4) * 80} className={cn("group relative", e.span)}>
              <article className="relative h-full min-h-[13rem] overflow-hidden rounded-2xl border border-white/8">
                <Photo
                  id={e.image}
                  w={1000}
                  h={800}
                  alt={e.alt}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                  className="transition-transform duration-[1300ms] ease-out group-hover:scale-[1.09]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-jungle-950 via-jungle-950/45 to-transparent" />
                <span className="absolute inset-0 bg-jungle-950/0 transition-colors duration-500 group-hover:bg-jungle-950/10" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <h3 className="font-display text-xl text-sand-50 sm:text-2xl">{e.title}</h3>
                  <p className="mt-2 hidden max-w-sm overflow-hidden text-sm leading-relaxed text-sand-200/85 opacity-0 transition-all duration-500 group-hover:max-h-28 group-hover:opacity-100 md:block md:max-h-0">
                    {e.body}
                  </p>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-sand-200/75 md:hidden">{e.body}</p>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal as="li" delay={320} className="sm:col-span-2 md:col-span-2">
            <div className="flex h-full min-h-[13rem] flex-col justify-between rounded-2xl border border-gold-400/20 bg-gradient-to-br from-gold-400/[0.09] to-transparent p-6 sm:p-8">
              <div>
                <Icon name="compass" className="h-7 w-7 text-gold-300" />
                <h3 className="mt-4 font-display text-2xl text-sand-50">Island exploration, planned by locals</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-sand-200/75">
                  Tell us what you're into — food, water, history, hiking, or doing absolutely nothing — and we'll
                  send you the version of Puerto Rico that matches. No tourist-trap filler.
                </p>
              </div>
              <button
                onClick={() => openBooking("explore-section")}
                className="group mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-gold-300 transition-colors hover:text-gold-200"
              >
                Plan your stay
                <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------- Testimonials --------------------------- */

const PLACEHOLDERS = [
  { label: "Guest review", note: "Reserved for a verified guest story", cat: "Romantic getaway" },
  { label: "Guest review", note: "Reserved for a verified guest story", cat: "Anniversary stay" },
  { label: "Guest review", note: "Reserved for a verified guest story", cat: "Weekend escape" },
];

export function TestimonialsSection() {
  return (
    <section
      id="stories"
      aria-labelledby="stories-title"
      className="relative overflow-hidden border-y border-white/8 bg-jungle-900 py-24 sm:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-gold-500/8 blur-[120px] anim-aura" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">Guest stories</Eyebrow>
          </Reveal>
          <Reveal delay={90}>
            <h2 id="stories-title" className="mt-6 text-balance font-display text-[clamp(2rem,5vw,3.2rem)] font-light leading-[1.06] text-sand-50">
              We'd rather stay empty here<span className="block italic text-sand-200/80">than make something up.</span>
            </h2>
          </Reveal>
          <Reveal delay={170}>
            <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-sand-200/70">
              Coquí Cove is new, and these spaces are held for real, verified guest reviews — published word for
              word, with names and dates, as soon as they come in. Until then, we'll let the island and the
              photography speak.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {PLACEHOLDERS.map((p, i) => (
            <Reveal as="li" key={i} delay={i * 100}>
              <figure className="group relative flex h-full min-h-[15rem] flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-white/12 bg-white/[0.02] p-6 transition-colors duration-500 hover:border-gold-400/30">
                <Icon name="quote" className="h-7 w-7 text-white/12 transition-colors duration-500 group-hover:text-gold-400/30" />
                <div className="mt-6 space-y-2.5" aria-hidden>
                  <span className="block h-2.5 w-full rounded-full bg-white/[0.06]" />
                  <span className="block h-2.5 w-11/12 rounded-full bg-white/[0.05]" />
                  <span className="block h-2.5 w-8/12 rounded-full bg-white/[0.04]" />
                </div>
                <figcaption className="mt-7 border-t border-white/8 pt-4">
                  <span className="block text-[0.65rem] uppercase tracking-[0.22em] text-gold-300/70">{p.cat}</span>
                  <span className="mt-1.5 block text-xs text-sand-300/50">{p.note}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={340}>
          <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.025] px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="max-w-lg text-pretty text-[0.98rem] leading-relaxed text-sand-100">
              Be one of the first to stay — and the first story on this page.
            </p>
            <button
              onClick={() => openBooking("testimonials")}
              className="btn-sheen group inline-flex shrink-0 items-center gap-2 rounded-full border border-gold-400/50 px-6 py-3 text-sm font-medium text-gold-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400/10"
            >
              Book your escape
              <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
