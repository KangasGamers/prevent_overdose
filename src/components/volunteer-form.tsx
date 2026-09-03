"use client";

import { useState } from "react";
import { ArrowRight, Check } from "./icons";
import { volunteerInterests } from "@/lib/site";

export function VolunteerForm() {
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  function toggle(v: string) {
    setPicked((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: { name?: string; email?: string } = {};
    if (!name.trim()) next.name = "We need something to call you.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      next.email = email.trim() ? "Check that address for a typo." : "An email address, so we can reply.";
    setErrors(next);
    if (Object.keys(next).length) { setState("error"); return; }
    setState("submitting");
    await new Promise((r) => setTimeout(r, 800));
    setState("done");
  }

  if (state === "done") {
    return (
      <div className="border border-[var(--rule-strong)] bg-paper-deep px-7 py-10">
        <Check className="h-9 w-9 text-red" />
        <h2 className="display-tight mt-5 text-[1.6rem]">Thank you</h2>
        <p className="measure-tight mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
          We read every application and reply to everyone. Expect to hear from us
          within a week.
        </p>
        <p className="mt-8 border border-dashed border-slate/50 px-4 py-3 text-[0.8125rem] text-slate">
          Mockup only — nothing was sent or stored.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-[var(--rule-strong)] bg-paper-deep">
      <div className="border-b border-[var(--rule-strong)] bg-red px-7 py-6 text-paper on-red">
        <h2 className="display-tight text-[1.75rem]">Volunteer</h2>
        <p className="mt-2 text-[0.875rem] text-paper-on-red">
          No experience needed. We train you.
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate className="px-7 py-8">
        <div>
          <label htmlFor="v-name" className="label text-slate">Name</label>
          <input
            id="v-name"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors((x) => ({ ...x, name: undefined })); }}
            disabled={state === "submitting"}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "v-name-err" : undefined}
            className={`mt-2 w-full border bg-paper px-4 py-3.5 text-[0.9375rem] transition-colors duration-200 disabled:opacity-60 ${errors.name ? "border-red" : "border-[var(--rule-strong)] focus:border-red"}`}
          />
          {errors.name && <p id="v-name-err" role="alert" className="mt-2 text-[0.875rem] text-red">{errors.name}</p>}
        </div>

        <div className="mt-6">
          <label htmlFor="v-email" className="label text-slate">Email</label>
          <input
            id="v-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((x) => ({ ...x, email: undefined })); }}
            disabled={state === "submitting"}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "v-email-err" : undefined}
            placeholder="you@example.com"
            className={`mt-2 w-full border bg-paper px-4 py-3.5 text-[0.9375rem] placeholder:text-slate/70 transition-colors duration-200 disabled:opacity-60 ${errors.email ? "border-red" : "border-[var(--rule-strong)] focus:border-red"}`}
          />
          {errors.email && <p id="v-email-err" role="alert" className="mt-2 text-[0.875rem] text-red">{errors.email}</p>}
        </div>

        <fieldset className="mt-7 border-0 p-0">
          <legend className="label text-slate">
            What interests you? <span className="normal-case tracking-normal">(optional)</span>
          </legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {volunteerInterests.map((v) => {
              const on = picked.includes(v);
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => toggle(v)}
                  aria-pressed={on}
                  className={`border px-3.5 py-2 text-[0.875rem] transition-colors duration-200 ${
                    on ? "border-red bg-red text-paper" : "border-[var(--rule-strong)] hover:border-red hover:text-red"
                  }`}
                >
                  {v}
                </button>
              );
            })}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={state === "submitting"}
          className="group mt-8 flex w-full items-center justify-center gap-2.5 border border-red bg-red px-6 py-4 text-paper transition-colors duration-200 hover:bg-red-deep hover:border-red-deep disabled:cursor-wait disabled:opacity-70"
        >
          <span className="label">{state === "submitting" ? "Sending" : "Apply"}</span>
          <ArrowRight className={`h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] ${state === "submitting" ? "animate-pulse" : "group-hover:translate-x-1.5"}`} />
        </button>
      </form>
    </div>
  );
}
