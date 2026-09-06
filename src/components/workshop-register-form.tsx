"use client";

import { useState } from "react";
import { ArrowRight, Check } from "./icons";
import { Honeypot } from "./honeypot";
import { submitForm } from "@/lib/submit-form";

/**
 * Registration for one in-person workshop. Emails the org (form kind
 * `workshop-register`) with the workshop title and who's coming — no accounts,
 * no live seat count. The org confirms a spot and sends the address by reply.
 */
export function WorkshopRegisterForm({
  slug,
  title,
  onDone,
}: {
  slug: string;
  title: string;
  onDone?: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attendees, setAttendees] = useState("1");
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "done" | "duplicate" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; form?: string }>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const website = String(new FormData(e.currentTarget).get("website") ?? "");
    const next: { name?: string; email?: string } = {};
    if (!name.trim()) next.name = "We need a name for the list.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      next.email = email.trim() ? "Check that address for a typo." : "An email, so we can confirm your spot.";
    setErrors(next);
    if (Object.keys(next).length) { setState("error"); return; }
    setState("submitting");
    try {
      const { duplicate } = await submitForm("workshop-register", {
        workshop: slug,
        name: name.trim(),
        email: email.trim(),
        ...(attendees.trim() && attendees.trim() !== "1" ? { attendees: attendees.trim() } : {}),
        ...(note.trim() ? { note: note.trim() } : {}),
        website,
      });
      setState(duplicate ? "duplicate" : "done");
      onDone?.();
    } catch (err) {
      setState("error");
      setErrors({ form: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  if (state === "duplicate") {
    return (
      <div className="border border-[var(--rule-strong)] bg-paper px-6 py-8">
        <Check className="h-8 w-8 text-red" />
        <h4 className="display-tight mt-4 text-[1.3rem]">You&rsquo;re already on the list</h4>
        <p className="measure-tight mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
          That email is already registered for {title}. Check your inbox for our
          confirmation, or email us if you need to change anything.
        </p>
      </div>
    );
  }

  if (state === "done") {
    return (
      <div className="border border-[var(--rule-strong)] bg-paper px-6 py-8">
        <Check className="h-8 w-8 text-red" />
        <h4 className="display-tight mt-4 text-[1.3rem]">You&rsquo;re on the list</h4>
        <p className="measure-tight mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
          We&rsquo;ll email you to confirm your spot for {title} and send the
          exact address. If the session fills, we&rsquo;ll offer you the next one.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative border border-[var(--rule-strong)] bg-paper px-6 py-7">
      <Honeypot />
      <p className="label text-slate">Register — {title}</p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`wr-name-${slug}`} className="label text-slate">Name</label>
          <input
            id={`wr-name-${slug}`}
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors((x) => ({ ...x, name: undefined })); }}
            disabled={state === "submitting"}
            aria-invalid={!!errors.name}
            className={`mt-2 w-full border bg-paper px-4 py-3 text-[0.9375rem] transition-colors duration-200 disabled:opacity-60 ${errors.name ? "border-red" : "border-[var(--rule-strong)] focus:border-red"}`}
          />
          {errors.name && <p role="alert" className="mt-2 text-[0.875rem] text-red">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`wr-email-${slug}`} className="label text-slate">Email</label>
          <input
            id={`wr-email-${slug}`}
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((x) => ({ ...x, email: undefined })); }}
            disabled={state === "submitting"}
            aria-invalid={!!errors.email}
            placeholder="you@example.com"
            className={`mt-2 w-full border bg-paper px-4 py-3 text-[0.9375rem] placeholder:text-slate/70 transition-colors duration-200 disabled:opacity-60 ${errors.email ? "border-red" : "border-[var(--rule-strong)] focus:border-red"}`}
          />
          {errors.email && <p role="alert" className="mt-2 text-[0.875rem] text-red">{errors.email}</p>}
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-[8rem_1fr]">
        <div>
          <label htmlFor={`wr-count-${slug}`} className="label text-slate">
            People
          </label>
          <input
            id={`wr-count-${slug}`}
            inputMode="numeric"
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
            disabled={state === "submitting"}
            className="mt-2 w-full border border-[var(--rule-strong)] bg-paper px-4 py-3 text-[0.9375rem] transition-colors duration-200 focus:border-red disabled:opacity-60"
          />
        </div>
        <div>
          <label htmlFor={`wr-note-${slug}`} className="label text-slate">
            Anything we should know? <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id={`wr-note-${slug}`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={state === "submitting"}
            placeholder="Access needs, questions, a group name…"
            className="mt-2 w-full border border-[var(--rule-strong)] bg-paper px-4 py-3 text-[0.9375rem] placeholder:text-slate/70 transition-colors duration-200 focus:border-red disabled:opacity-60"
          />
        </div>
      </div>

      {errors.form && (
        <p role="alert" className="mt-5 text-[0.875rem] text-red">{errors.form}</p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="group mt-6 flex w-full items-center justify-center gap-2.5 border border-red bg-red px-6 py-3.5 text-paper transition-colors duration-200 hover:border-red-deep hover:bg-red-deep disabled:cursor-wait disabled:opacity-70"
      >
        <span className="label">{state === "submitting" ? "Sending" : "Register"}</span>
        <ArrowRight className={`h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] ${state === "submitting" ? "animate-pulse" : "group-hover:translate-x-1.5"}`} />
      </button>
    </form>
  );
}
