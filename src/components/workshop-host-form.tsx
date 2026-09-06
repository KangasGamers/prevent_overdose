"use client";

import { useState } from "react";
import { ArrowRight, Check } from "./icons";
import { Honeypot } from "./honeypot";
import { submitForm } from "@/lib/submit-form";

/**
 * "Bring a workshop to us." Emails the org (form kind `workshop-host`) with
 * enough to scope a session — who's asking, where, and roughly how many people.
 */
export function WorkshopHostForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [location, setLocation] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; location?: string; form?: string }>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const website = String(new FormData(e.currentTarget).get("website") ?? "");
    const next: { name?: string; email?: string; location?: string } = {};
    if (!name.trim()) next.name = "We need something to call you.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      next.email = email.trim() ? "Check that address for a typo." : "An email, so we can reply.";
    if (!location.trim()) next.location = "Where would the session be?";
    setErrors(next);
    if (Object.keys(next).length) { setState("error"); return; }
    setState("submitting");
    try {
      await submitForm("workshop-host", {
        name: name.trim(),
        email: email.trim(),
        ...(organization.trim() ? { organization: organization.trim() } : {}),
        location: location.trim(),
        ...(groupSize.trim() ? { groupSize: groupSize.trim() } : {}),
        ...(note.trim() ? { note: note.trim() } : {}),
        website,
      });
      setState("done");
    } catch (err) {
      setState("error");
      setErrors({ form: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  if (state === "done") {
    return (
      <div className="border border-[var(--rule-strong)] bg-paper-deep px-7 py-10">
        <Check className="h-9 w-9 text-red" />
        <h3 className="display-tight mt-5 text-[1.6rem]">We&rsquo;ll be in touch</h3>
        <p className="measure-tight mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
          Someone from the team will email you within a week to find a date and
          work out the details. Every request gets a reply.
        </p>
      </div>
    );
  }

  const field =
    "mt-2 w-full border bg-paper px-4 py-3.5 text-[0.9375rem] placeholder:text-slate/70 transition-colors duration-200 disabled:opacity-60";

  return (
    <div className="border border-[var(--rule-strong)] bg-paper-deep">
      <div className="border-b border-[var(--rule-strong)] bg-red px-7 py-6 text-paper on-red">
        <h3 className="display-tight text-[1.75rem]">Host a workshop</h3>
        <p className="mt-2 text-[0.875rem] text-paper-on-red">
          Schools, workplaces, teams, faith and community groups. We bring the
          trainer and the kits — you bring the room and the people.
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate className="relative px-7 py-8">
        <Honeypot />

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="wh-name" className="label text-slate">Your name</label>
            <input
              id="wh-name"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((x) => ({ ...x, name: undefined })); }}
              disabled={state === "submitting"}
              aria-invalid={!!errors.name}
              className={`${field} ${errors.name ? "border-red" : "border-[var(--rule-strong)] focus:border-red"}`}
            />
            {errors.name && <p role="alert" className="mt-2 text-[0.875rem] text-red">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="wh-email" className="label text-slate">Email</label>
            <input
              id="wh-email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((x) => ({ ...x, email: undefined })); }}
              disabled={state === "submitting"}
              aria-invalid={!!errors.email}
              placeholder="you@example.com"
              className={`${field} ${errors.email ? "border-red" : "border-[var(--rule-strong)] focus:border-red"}`}
            />
            {errors.email && <p role="alert" className="mt-2 text-[0.875rem] text-red">{errors.email}</p>}
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="wh-org" className="label text-slate">
            Organization or group <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="wh-org"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            disabled={state === "submitting"}
            className={`${field} border-[var(--rule-strong)] focus:border-red`}
          />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_10rem]">
          <div>
            <label htmlFor="wh-loc" className="label text-slate">City / where it would be</label>
            <input
              id="wh-loc"
              value={location}
              onChange={(e) => { setLocation(e.target.value); setErrors((x) => ({ ...x, location: undefined })); }}
              disabled={state === "submitting"}
              aria-invalid={!!errors.location}
              placeholder="A high school in Tampa, our office in Hartford…"
              className={`${field} ${errors.location ? "border-red" : "border-[var(--rule-strong)] focus:border-red"}`}
            />
            {errors.location && <p role="alert" className="mt-2 text-[0.875rem] text-red">{errors.location}</p>}
          </div>
          <div>
            <label htmlFor="wh-size" className="label text-slate">
              Group size <span className="normal-case tracking-normal">(approx)</span>
            </label>
            <input
              id="wh-size"
              value={groupSize}
              onChange={(e) => setGroupSize(e.target.value)}
              disabled={state === "submitting"}
              placeholder="25"
              className={`${field} border-[var(--rule-strong)] focus:border-red`}
            />
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="wh-note" className="label text-slate">
            Anything else <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <textarea
            id="wh-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={state === "submitting"}
            rows={3}
            placeholder="Timing that works, who the group is, what prompted this…"
            className={`${field} resize-y border-[var(--rule-strong)] focus:border-red`}
          />
        </div>

        {errors.form && (
          <p role="alert" className="mt-6 text-[0.875rem] text-red">{errors.form}</p>
        )}

        <button
          type="submit"
          disabled={state === "submitting"}
          className="group mt-8 flex w-full items-center justify-center gap-2.5 border border-red bg-red px-6 py-4 text-paper transition-colors duration-200 hover:border-red-deep hover:bg-red-deep disabled:cursor-wait disabled:opacity-70"
        >
          <span className="label">{state === "submitting" ? "Sending" : "Request a session"}</span>
          <ArrowRight className={`h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] ${state === "submitting" ? "animate-pulse" : "group-hover:translate-x-1.5"}`} />
        </button>
      </form>
    </div>
  );
}
