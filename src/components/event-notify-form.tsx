"use client";

import { useState } from "react";
import { ArrowRight, Check } from "./icons";
import { Honeypot } from "./honeypot";
import { submitForm } from "@/lib/submit-form";

export function EventNotifyForm({ eventTitle }: { eventTitle: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const website = String(new FormData(e.currentTarget).get("website") ?? "");
    const v = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
      setState("error");
      setError(v ? "Check that address for a typo." : "Enter an email address.");
      return;
    }
    setState("submitting");
    setError("");
    try {
      await submitForm("event-notify", { email: v, event: eventTitle, website });
      setState("done");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="border border-[var(--rule-strong)] bg-paper-deep">
      <div className="border-b border-[var(--rule-strong)] bg-red px-7 py-6 text-paper on-red">
        <h2 className="display-tight text-[1.6rem]">Tell me when it&rsquo;s set</h2>
        <p className="mt-2 text-[0.875rem] text-paper-on-red">
          One email when this date is confirmed. Nothing else.
        </p>
      </div>

      {state === "done" ? (
        <div className="px-7 py-10">
          <Check className="h-9 w-9 text-red" />
          <h3 className="display-tight mt-5 text-[1.4rem]">You&rsquo;re on the list</h3>
          <p className="measure-tight mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
            We&rsquo;ll write as soon as {eventTitle} has a date.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="relative px-7 py-8">
          <Honeypot />
          <label htmlFor="notify-email" className="label text-slate">
            Email address
          </label>
          <input
            id="notify-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state === "error") { setState("idle"); setError(""); }
            }}
            disabled={state === "submitting"}
            aria-invalid={state === "error"}
            aria-describedby={state === "error" ? "notify-error" : undefined}
            placeholder="you@example.com"
            className={`mt-2 w-full border bg-paper px-4 py-3.5 text-[0.9375rem] placeholder:text-slate/70 transition-colors duration-200 disabled:opacity-60 ${
              state === "error" ? "border-red" : "border-[var(--rule-strong)] focus:border-red"
            }`}
          />
          {state === "error" && (
            <p id="notify-error" role="alert" className="mt-2 text-[0.875rem] text-red">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={state === "submitting"}
            className="group mt-6 flex w-full items-center justify-center gap-2.5 border border-red bg-red px-6 py-4 text-paper transition-colors duration-200 hover:bg-red-deep hover:border-red-deep disabled:cursor-wait disabled:opacity-70"
          >
            <span className="label">{state === "submitting" ? "Sending" : "Notify me"}</span>
            <ArrowRight className={`h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] ${state === "submitting" ? "animate-pulse" : "group-hover:translate-x-1.5"}`} />
          </button>
        </form>
      )}
    </div>
  );
}
