"use client";

import { useState } from "react";
import { ArrowRight, Check } from "./icons";
import { Honeypot } from "./honeypot";
import { submitForm } from "@/lib/submit-form";

const TOPICS = ["General", "Request a training", "Partnership", "Press"] as const;

export function ContactForm() {
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [errors, setErrors] = useState<{ email?: string; message?: string; form?: string }>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const website = String(new FormData(e.currentTarget).get("website") ?? "");
    const next: { email?: string; message?: string } = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      next.email = email.trim() ? "Check that address for a typo." : "An email address, so we can reply.";
    if (!message.trim()) next.message = "Tell us what you need.";
    setErrors(next);
    if (Object.keys(next).length) { setState("error"); return; }
    setState("submitting");
    try {
      await submitForm("contact", {
        email: email.trim(),
        topic,
        message: message.trim(),
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
        <h2 className="display-tight mt-5 text-[1.6rem]">Message sent</h2>
        <p className="measure-tight mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
          We usually reply within two business days.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-[var(--rule-strong)] bg-paper-deep">
      <div className="border-b border-[var(--rule-strong)] bg-red px-7 py-6 text-paper on-red">
        <h2 className="display-tight text-[1.75rem]">Send a message</h2>
      </div>
      <form onSubmit={onSubmit} noValidate className="relative px-7 py-8">
        <Honeypot />
        <div>
          <label htmlFor="c-topic" className="label text-slate">Topic</label>
          <select
            id="c-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-2 w-full border border-[var(--rule-strong)] bg-paper px-4 py-3.5 text-[0.9375rem] transition-colors duration-200 focus:border-red"
          >
            {TOPICS.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div className="mt-6">
          <label htmlFor="c-email" className="label text-slate">Email</label>
          <input
            id="c-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((x) => ({ ...x, email: undefined })); }}
            disabled={state === "submitting"}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "c-email-err" : undefined}
            placeholder="you@example.com"
            className={`mt-2 w-full border bg-paper px-4 py-3.5 text-[0.9375rem] placeholder:text-slate/70 transition-colors duration-200 disabled:opacity-60 ${errors.email ? "border-red" : "border-[var(--rule-strong)] focus:border-red"}`}
          />
          {errors.email && <p id="c-email-err" role="alert" className="mt-2 text-[0.875rem] text-red">{errors.email}</p>}
        </div>

        <div className="mt-6">
          <label htmlFor="c-msg" className="label text-slate">Message</label>
          <textarea
            id="c-msg"
            rows={5}
            value={message}
            onChange={(e) => { setMessage(e.target.value); setErrors((x) => ({ ...x, message: undefined })); }}
            disabled={state === "submitting"}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "c-msg-err" : undefined}
            className={`mt-2 w-full resize-y border bg-paper px-4 py-3.5 text-[0.9375rem] transition-colors duration-200 disabled:opacity-60 ${errors.message ? "border-red" : "border-[var(--rule-strong)] focus:border-red"}`}
          />
          {errors.message && <p id="c-msg-err" role="alert" className="mt-2 text-[0.875rem] text-red">{errors.message}</p>}
        </div>

        {errors.form && (
          <p role="alert" className="mt-6 text-[0.875rem] text-red">
            {errors.form}
          </p>
        )}

        <button
          type="submit"
          disabled={state === "submitting"}
          className="group mt-8 flex w-full items-center justify-center gap-2.5 border border-red bg-red px-6 py-4 text-paper transition-colors duration-200 hover:bg-red-deep hover:border-red-deep disabled:cursor-wait disabled:opacity-70"
        >
          <span className="label">{state === "submitting" ? "Sending" : "Send"}</span>
          <ArrowRight className={`h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] ${state === "submitting" ? "animate-pulse" : "group-hover:translate-x-1.5"}`} />
        </button>
      </form>
    </div>
  );
}
