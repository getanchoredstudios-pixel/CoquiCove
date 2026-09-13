import { useId, useState } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "@/lib/ui";
import { submitInquiry, todayISO, type Inquiry } from "@/lib/booking";

type Errors = Partial<Record<keyof Inquiry, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const field =
  "w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-[0.95rem] text-sand-50 placeholder:text-sand-200/40 transition-colors duration-200 focus:border-gold-400/70 focus:bg-white/[0.07] focus:outline-none";

export default function AvailabilityForm({
  source,
  compact = false,
  onDone,
}: {
  source: string;
  compact?: boolean;
  onDone?: () => void;
}) {
  const uid = useId();
  const [values, setValues] = useState<Inquiry>({
    name: "",
    email: "",
    phone: "",
    arrive: "",
    depart: "",
    guests: "2",
    occasion: "Romantic getaway",
    message: "",
    source,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = (k: keyof Inquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((err) => ({ ...err, [k]: undefined }));
  };

  function validate(v: Inquiry): Errors {
    const e: Errors = {};
    if (!v.name.trim()) e.name = "Please tell us your name.";
    if (!v.email.trim()) e.email = "We need an email to send availability.";
    else if (!EMAIL_RE.test(v.email.trim())) e.email = "That email doesn't look quite right.";
    if (!v.arrive) e.arrive = "Choose an arrival date.";
    if (!v.depart) e.depart = "Choose a departure date.";
    if (v.arrive && v.depart && v.depart <= v.arrive) e.depart = "Departure must be after arrival.";
    return e;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = document.getElementById(`${uid}-${Object.keys(errs)[0]}`);
      first?.focus();
      return;
    }
    setStatus("sending");
    await submitInquiry(values);
    setStatus("sent");
    onDone?.();
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-gold-400/30 bg-jungle-800/60 px-6 py-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-400/15 text-gold-300">
          <Icon name="check" className="h-7 w-7" />
        </span>
        <h3 className="font-display text-2xl text-sand-50">Your request is in.</h3>
        <p className="max-w-sm text-sm leading-relaxed text-sand-200/80">
          A real person — not an autoresponder — will get back to you with availability, current rates and
          everything included for your dates. Check your inbox shortly.
        </p>
        <p className="text-xs text-sand-300/60">
          ¿Prefieres español? Just reply in Spanish — we answer in both.
        </p>
      </div>
    );
  }

  const err = (k: keyof Inquiry) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} role="alert" className="mt-1.5 text-xs text-rose-300">
        {errors[k]}
      </p>
    ) : null;

  const border = (k: keyof Inquiry) => (errors[k] ? "border-rose-400/70" : "border-white/12");

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-4 text-left">
      <div className={cn("grid gap-4", compact ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
        <div>
          <label htmlFor={`${uid}-name`} className="mb-1.5 block text-xs font-medium tracking-wide text-sand-200/75">
            Name <span aria-hidden className="text-gold-400">*</span>
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={set("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
            className={cn(field, border("name"))}
            placeholder="Your name"
          />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className="mb-1.5 block text-xs font-medium tracking-wide text-sand-200/75">
            Email <span aria-hidden className="text-gold-400">*</span>
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={set("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${uid}-email-err` : undefined}
            className={cn(field, border("email"))}
            placeholder="you@email.com"
          />
          {err("email")}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-arrive`} className="mb-1.5 block text-xs font-medium tracking-wide text-sand-200/75">
            Arrival <span aria-hidden className="text-gold-400">*</span>
          </label>
          <input
            id={`${uid}-arrive`}
            name="arrive"
            type="date"
            required
            min={todayISO()}
            value={values.arrive}
            onChange={set("arrive")}
            aria-invalid={!!errors.arrive}
            aria-describedby={errors.arrive ? `${uid}-arrive-err` : undefined}
            className={cn(field, border("arrive"), "[color-scheme:dark]")}
          />
          {err("arrive")}
        </div>
        <div>
          <label htmlFor={`${uid}-depart`} className="mb-1.5 block text-xs font-medium tracking-wide text-sand-200/75">
            Departure <span aria-hidden className="text-gold-400">*</span>
          </label>
          <input
            id={`${uid}-depart`}
            name="depart"
            type="date"
            required
            min={values.arrive || todayISO()}
            value={values.depart}
            onChange={set("depart")}
            aria-invalid={!!errors.depart}
            aria-describedby={errors.depart ? `${uid}-depart-err` : undefined}
            className={cn(field, border("depart"), "[color-scheme:dark]")}
          />
          {err("depart")}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-guests`} className="mb-1.5 block text-xs font-medium tracking-wide text-sand-200/75">
            Guests
          </label>
          <select
            id={`${uid}-guests`}
            name="guests"
            value={values.guests}
            onChange={set("guests")}
            className={cn(field, "border-white/12 appearance-none")}
          >
            {["1", "2", "3", "4+"].map((g) => (
              <option key={g} value={g} className="bg-jungle-900">
                {g} {g === "1" ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-occasion`} className="mb-1.5 block text-xs font-medium tracking-wide text-sand-200/75">
            Occasion
          </label>
          <select
            id={`${uid}-occasion`}
            name="occasion"
            value={values.occasion}
            onChange={set("occasion")}
            className={cn(field, "border-white/12 appearance-none")}
          >
            {[
              "Romantic getaway",
              "Anniversary",
              "Honeymoon",
              "Birthday",
              "Weekend escape",
              "Local staycation",
              "Just because",
            ].map((o) => (
              <option key={o} value={o} className="bg-jungle-900">
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!compact && (
        <div>
          <label htmlFor={`${uid}-phone`} className="mb-1.5 block text-xs font-medium tracking-wide text-sand-200/75">
            Phone <span className="text-sand-300/50">(optional)</span>
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={set("phone")}
            className={cn(field, "border-white/12")}
            placeholder="+1 (787) 000-0000"
          />
        </div>
      )}

      <div>
        <label htmlFor={`${uid}-message`} className="mb-1.5 block text-xs font-medium tracking-wide text-sand-200/75">
          Anything we should know? <span className="text-sand-300/50">(optional)</span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={compact ? 2 : 3}
          value={values.message}
          onChange={set("message")}
          className={cn(field, "resize-none border-white/12")}
          placeholder="Flight times, celebrating something, questions about the property…"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-sheen group relative mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 px-8 py-4 text-sm font-semibold tracking-wide text-jungle-950 shadow-[0_14px_44px_-14px_rgba(201,162,74,0.9)] transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : "Check Availability"}
        <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <p className="text-center text-[0.7rem] leading-relaxed text-sand-300/55">
        No payment required to check dates. We reply personally — usually within 24 hours.
      </p>
    </form>
  );
}
