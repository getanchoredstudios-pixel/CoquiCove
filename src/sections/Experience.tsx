import { cn } from "@/utils/cn";
import { Eyebrow, Icon, Photo, Reveal, useParallax } from "@/lib/ui";
import { FEATURES, MOMENTS, IMG } from "@/lib/site";

function Moment({ m, i }: { m: (typeof MOMENTS)[number]; i: number }) {
  const flip = i % 2 === 1;
  const { ref, offset } = useParallax<HTMLDivElement>(0.06);

  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14 lg:gap-20">
      <Reveal
        variant={flip ? "right" : "left"}
        className={cn("relative", flip && "md:order-2")}
      >
        <div ref={ref} className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] sm:aspect-[5/4] md:aspect-[4/5]">
          <div className="absolute inset-0 scale-110" style={{ transform: `translate3d(0,${offset}px,0) scale(1.12)` }}>
            <Photo
              id={m.image}
              w={900}
              h={1100}
              alt={m.alt}
              sizes="(max-width: 768px) 92vw, 45vw"
              className="transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-jungle-950/70 via-transparent to-transparent" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[1.75rem]" />
          <span className="glass-light absolute left-5 top-5 rounded-full border border-white/15 px-3.5 py-1.5 text-[0.65rem] tracking-[0.2em] text-sand-50">
            {m.time}
          </span>
        </div>
        <span
          aria-hidden
          className={cn(
            "anim-float absolute -z-10 h-40 w-40 rounded-full blur-[70px]",
            flip ? "-left-10 -bottom-10 bg-lagoon-500/25" : "-right-10 -top-10 bg-gold-500/20",
          )}
        />
      </Reveal>

      <Reveal variant={flip ? "left" : "right"} delay={120} className={cn(flip && "md:order-1")}>
        <span className="font-display text-5xl text-white/8 sm:text-6xl">0{i + 1}</span>
        <h3 className="mt-3 text-balance font-display text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.1] text-sand-50">
          {m.title}
        </h3>
        <p className="mt-5 max-w-lg text-pretty text-[1.02rem] leading-relaxed text-sand-200/75">{m.body}</p>
      </Reveal>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="relative overflow-hidden bg-jungle-950 py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.18]">
        <div className="anim-aura absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-jungle-500 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>The Coquí Cove Experience</Eyebrow>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-6 text-balance font-display text-[clamp(2.1rem,6vw,4rem)] font-light leading-[1.04] text-sand-50">
              One day here doesn't feel<span className="block italic gold-text">like a day anywhere else.</span>
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-sand-200/70">
              Coquí Cove isn't a room you sleep in between excursions. It's the part of the trip you'll actually
              describe when people ask how Puerto Rico was.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 space-y-24 sm:mt-28 sm:space-y-32">
          {MOMENTS.map((m, i) => (
            <Moment key={m.title} m={m} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="relative overflow-hidden border-y border-white/8 bg-jungle-900 py-24 sm:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-lagoon-500/10 blur-[130px] anim-aura" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>What's here</Eyebrow>
            </Reveal>
            <Reveal delay={90}>
              <h2 id="features-title" className="mt-6 text-balance font-display text-[clamp(2rem,5.2vw,3.4rem)] font-light leading-[1.06] text-sand-50">
                Nature on the outside.<br />
                <span className="italic text-sand-200/80">Comfort on the inside.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160} className="max-w-sm">
            <p className="text-sm leading-relaxed text-sand-200/65">
              Glamping means you get the island without giving anything up — a real bed, a private door, and a
              landscape that starts where your deck ends.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal
              as="li"
              key={f.title}
              delay={(i % 4) * 80}
              className={cn("group relative", f.span)}
            >
              <div
                className={cn(
                  "relative h-full overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/30 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]",
                  f.image && "min-h-[15rem] sm:min-h-[17rem]",
                )}
              >
                {f.image && (
                  <>
                    <div className="absolute inset-0 -z-10">
                      <Photo
                        id={f.image}
                        w={900}
                        h={600}
                        alt={f.alt}
                        sizes="(max-width: 640px) 92vw, 45vw"
                        className="opacity-45 transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-jungle-950 via-jungle-950/70 to-jungle-950/20" />
                  </>
                )}
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gold-300 transition-all duration-500 group-hover:border-gold-400/40 group-hover:text-gold-200">
                  <Icon name={f.icon} />
                </span>
                <h3 className={cn("mt-5 text-[1.05rem] leading-snug text-sand-50", f.image && "mt-auto pt-16")}>
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sand-200/65">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="mt-8 flex items-start gap-2.5 text-xs leading-relaxed text-sand-300/45">
            <Icon name="leaf" className="mt-px h-4 w-4 shrink-0 text-gold-400/60" />
            We only list what the property actually offers. Have a question about a specific amenity for your
            dates? Ask us directly — we'd rather tell you honestly than oversell it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function QuoteBreak() {
  const { ref, offset } = useParallax<HTMLDivElement>(0.18);
  return (
    <section aria-label="Coquí Cove in one line" className="relative isolate grain overflow-hidden">
      <div ref={ref} className="absolute inset-0 -z-10 scale-125" style={{ transform: `translate3d(0,${offset}px,0) scale(1.25)` }}>
        <Photo id={IMG.jungleLeaves} w={1600} h={900} alt="" sizes="100vw" className="opacity-60" />
      </div>
      <div className="absolute inset-0 -z-10 bg-jungle-950/80" />
      <div className="mx-auto max-w-4xl px-5 py-28 text-center sm:px-8 sm:py-36">
        <Reveal>
          <Icon name="quote" className="mx-auto h-8 w-8 text-gold-400/60" />
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-7 text-balance font-display text-[clamp(1.6rem,4.4vw,3rem)] font-light italic leading-[1.2] text-sand-50">
            “Close enough to experience Puerto Rico. Secluded enough to disappear into it.”
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-7 text-xs uppercase tracking-[0.3em] text-gold-300/80">The Coquí Cove promise</p>
        </Reveal>
      </div>
    </section>
  );
}
