import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { px, pxSet } from "@/lib/site";

/* ------------------------------------------------------------------ */
/* Motion helpers                                                      */
/* ------------------------------------------------------------------ */

export function useInView<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12, ...opts },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts]);

  return { ref, inView };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale";
  as?: "div" | "li" | "section" | "article" | "span" | "figure";
};

export function Reveal({ children, className, delay = 0, variant = "up", as = "div" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className={cn(
        "reveal",
        variant === "left" && "reveal-left",
        variant === "right" && "reveal-right",
        variant === "scale" && "reveal-scale",
        inView && "is-visible",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Lightweight scroll position hook (rAF-throttled). */
export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setY(window.scrollY);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Subtle parallax offset for an element, in px. */
export function useParallax<T extends HTMLElement>(strength = 0.12) {
  const ref = useRef<T | null>(null);
  const [offset, setOffset] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      setOffset(progress * strength * 100);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength, reduced]);

  return { ref, offset };
}

/* ------------------------------------------------------------------ */
/* Image                                                               */
/* ------------------------------------------------------------------ */

type PhotoProps = {
  id: number;
  w: number;
  h: number;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function Photo({ id, w, h, alt, className, sizes = "100vw", priority }: PhotoProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={px(id, w, h)}
      srcSet={pxSet(id, w, h)}
      sizes={sizes}
      alt={alt}
      width={w}
      height={h}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      // @ts-expect-error fetchpriority is valid HTML
      fetchpriority={priority ? "high" : undefined}
      onLoad={() => setLoaded(true)}
      className={cn(
        "h-full w-full object-cover transition-[opacity,filter] duration-700",
        loaded ? "opacity-100 blur-0" : "opacity-0 blur-md",
        className,
      )}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

type BtnProps = React.ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 will-change-transform focus-visible:outline-2 focus-visible:outline-offset-4";

const sizes = {
  sm: "px-5 py-2.5 text-[0.8rem]",
  md: "px-7 py-3.5 text-sm",
  lg: "px-9 py-4 text-[0.95rem]",
};

export function CTA({ variant = "primary", size = "md", className, children, ...rest }: BtnProps) {
  const styles = {
    primary:
      "btn-sheen bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 text-jungle-950 shadow-[0_10px_40px_-12px_rgba(201,162,74,0.75)] hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-12px_rgba(201,162,74,0.9)]",
    outline:
      "border border-sand-100/35 text-sand-50 hover:border-gold-300/80 hover:bg-white/10 hover:-translate-y-0.5 backdrop-blur-sm",
    ghost: "text-sand-100/85 hover:text-gold-300",
  }[variant];

  return (
    <a className={cn(base, sizes[size], styles, className)} {...rest}>
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("eyebrow inline-flex items-center gap-3 text-gold-300", className)}>
      <span aria-hidden className="h-px w-8 bg-gradient-to-r from-transparent to-gold-400/80" />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const paths: Record<string, ReactNode> = {
  leaf: <path d="M4 20c0-8 6-14 16-14 0 10-6 15-16 14Zm0 0 8-8" />,
  pin: (
    <>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  wave: <path d="M2 8.5c2.5-2 4.5 2 7 0s4.5-2 7 0 4.5 2 6 .5M2 15c2.5-2 4.5 2 7 0s4.5-2 7 0 4.5 2 6 .5" />,
  heart: <path d="M12 20s-7-4.6-7-9.4A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.6C19 15.4 12 20 12 20Z" />,
  star: <path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-2.9L6.7 19.6l1.1-6L3.4 9.4l6-.8L12 3Z" />,
  key: (
    <>
      <circle cx="8" cy="12" r="4" />
      <path d="M12 12h9m-3 0v3.5m-2.5-3.5v2.5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </>
  ),
  bed: <path d="M3 18v-8h13a4 4 0 0 1 4 4v4M3 14h17M3 18v2m17-2v2M7 10V8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2" />,
  car: (
    <>
      <path d="M4 16v2m16-2v2M3 16v-3.2a2 2 0 0 1 .2-.9L5.5 7A2 2 0 0 1 7.3 6h9.4a2 2 0 0 1 1.8 1.1l2.3 4.8c.1.3.2.6.2.9V16Z" />
      <path d="M4 13h16" />
      <circle cx="7.5" cy="16" r="1.2" />
      <circle cx="16.5" cy="16" r="1.2" />
    </>
  ),
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  chev: <path d="m6 9 6 6 6-6" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  phone: <path d="M5 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L14 12l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 5.2 2 2 0 0 1 5 3Z" />,
  ig: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  check: <path d="m4 12.5 5 5L20 6.5" />,
  quote: <path d="M9 7c-3 1.2-4.5 3.6-4.5 7.2V19h6v-6H7c0-2 .7-3.3 2.6-4.1L9 7Zm10 0c-3 1.2-4.5 3.6-4.5 7.2V19h6v-6H17c0-2 .7-3.3 2.6-4.1L19 7Z" />,
  moon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15 9-2 4.5L8.5 15 10.5 10.5 15 9Z" />
    </>
  ),
};

export function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5", className)}
    >
      {paths[name] ?? paths.leaf}
    </svg>
  );
}
