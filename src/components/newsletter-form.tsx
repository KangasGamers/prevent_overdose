"use client";

import { useState } from "react";
import { ArrowRight, Check } from "./icons";
import { Honeypot } from "./honeypot";
import { submitForm } from "@/lib/submit-form";

type State = "idle" | "submitting" | "done" | "error";

/**
 * Newsletter signup. Posts to /api/submit, which emails the org. Phone is
 * deliberately absent: the incumbent site required it on every page footer,
 * which is pure friction on a newsletter signup.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const website = String(new FormData(e.currentTarget).get("website") ?? "");
    const value = email.trim();

    if (!value) {
      setState("error");
      setMessage("Enter an email address so we know where to send it.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setState("error");
      setMessage("That address is missing something — check for a typo.");
      return;
    }

    setState("submitting");
    setMessage("");
    try {
      await submitForm("newsletter", { email: value, website });
      setState("done");
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "done") {
    return (
      <p
        className="mt-6 flex items-start gap-3 border-l-[3px] border-red bg-blush/50 px-4 py-4 text-[0.9375rem]"
        role="status"
      >
        <Check className="mt-0.5 h-[1.15rem] w-[1.15rem] shrink-0 text-red" />
        <span>
          You&rsquo;re on the list. We&rsquo;ll only write when there&rsquo;s a
          training date or a kit drop.
        </span>
      </p>
    );
  }

  const invalid = state === "error";

  return (
    <form onSubmit={onSubmit} noValidate className="relative mt-6">
      <Honeypot />
      <label htmlFor="newsletter-email" className="label text-slate">
        Email address
      </label>
      <div className="mt-2 flex">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") {
              setState("idle");
              setMessage("");
            }
          }}
          disabled={state === "submitting"}
          aria-invalid={invalid}
          aria-describedby={invalid ? "newsletter-error" : undefined}
          placeholder="you@example.com"
          className={`
            min-w-0 flex-1 border bg-transparent px-4 py-3.5 text-[0.9375rem]
            text-ink placeholder:text-slate/75
            transition-colors duration-200
            disabled:cursor-not-allowed disabled:opacity-60
            ${invalid ? "border-red" : "border-[var(--rule-strong)] focus:border-red"}
          `}
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className="
            flex shrink-0 items-center gap-2 border border-l-0 border-red bg-red px-5
            text-paper transition-colors duration-200
            hover:bg-red-deep hover:border-red-deep
            disabled:cursor-wait disabled:opacity-70
          "
        >
          <span className="label">
            {state === "submitting" ? "Sending" : "Join"}
          </span>
          <ArrowRight
            className={`h-4 w-4 ${state === "submitting" ? "animate-pulse" : ""}`}
          />
        </button>
      </div>

      {invalid && (
        <p
          id="newsletter-error"
          role="alert"
          className="mt-2.5 text-[0.875rem] text-red"
        >
          {message}
        </p>
      )}
    </form>
  );
}
