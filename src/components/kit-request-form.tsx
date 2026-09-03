"use client";

import { useState } from "react";
import { ArrowRight, Check, Shield } from "./icons";
import { Honeypot } from "./honeypot";
import { submitForm } from "@/lib/submit-form";

type State = "idle" | "submitting" | "done" | "error";

const DELIVERY = [
  { id: "pickup", label: "Pick up in Avon" },
  { id: "mail", label: "Mail it to me" },
  { id: "training", label: "At a training" },
] as const;

/**
 * Mockup only — nothing is transmitted or stored. The fields are deliberately
 * minimal: the fewer things a frightened person has to type, the more likely
 * they finish. Name and phone are optional on purpose.
 */
export function KitRequestForm() {
  const [state, setState] = useState<State>("idle");
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [delivery, setDelivery] = useState<string>("pickup");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const website = String(new FormData(e.currentTarget).get("website") ?? "");
    const value = contact.trim();
    if (!value) {
      setState("error");
      setError("We need one way to reach you — an email or a phone number.");
      return;
    }
    setState("submitting");
    setError("");
    try {
      await submitForm("kit-request", {
        contact: value,
        delivery,
        website,
        ...(name.trim() ? { name: name.trim() } : {}),
      });
      setState("done");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="border border-[var(--rule-strong)] bg-paper-deep">
      <div className="border-b border-[var(--rule-strong)] bg-red px-7 py-6 text-paper on-red">
        <h2 className="display-tight text-[1.75rem]">Request a kit</h2>
        <p className="mt-2 text-[0.875rem] text-paper-on-red">
          Free. Usually ready within a week.
        </p>
      </div>

      {state === "done" ? (
        <div className="px-7 py-10">
          <Check className="h-9 w-9 text-red" />
          <h3 className="display-tight mt-5 text-[1.5rem]">Request received</h3>
          <p className="measure-tight mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
            We&rsquo;ll be in touch to arrange it. If it&rsquo;s urgent, call{" "}
            <a
              href="tel:+18607518658"
              className="tabular text-red underline decoration-red/40"
            >
              860-751-8658
            </a>
            .
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="relative px-7 py-8">
          <Honeypot />
          <fieldset className="border-0 p-0">
            <legend className="label text-slate">How should we get it to you?</legend>
            <div className="mt-4 flex flex-col gap-px bg-[var(--rule-strong)]">
              {DELIVERY.map((d) => (
                <label
                  key={d.id}
                  className={`
                    flex cursor-pointer items-center gap-3 bg-paper-deep px-4 py-3.5
                    text-[0.9375rem] transition-colors duration-200
                    has-[:checked]:bg-blush hover:bg-paper
                  `}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value={d.id}
                    checked={delivery === d.id}
                    onChange={() => setDelivery(d.id)}
                    className="h-4 w-4 accent-red"
                  />
                  {d.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-7">
            <label htmlFor="kit-contact" className="label text-slate">
              Email or phone
            </label>
            <input
              id="kit-contact"
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
                if (state === "error") {
                  setState("idle");
                  setError("");
                }
              }}
              disabled={state === "submitting"}
              aria-invalid={state === "error"}
              aria-describedby={state === "error" ? "kit-error" : "kit-hint"}
              placeholder="you@example.com"
              className={`
                mt-2 w-full border bg-paper px-4 py-3.5 text-[0.9375rem]
                placeholder:text-slate/70 transition-colors duration-200
                disabled:cursor-not-allowed disabled:opacity-60
                ${state === "error" ? "border-red" : "border-[var(--rule-strong)] focus:border-red"}
              `}
            />
            {state === "error" ? (
              <p id="kit-error" role="alert" className="mt-2 text-[0.875rem] text-red">
                {error}
              </p>
            ) : (
              <p id="kit-hint" className="mt-2 text-[0.8125rem] text-slate">
                That&rsquo;s the only thing we require.
              </p>
            )}
          </div>

          <div className="mt-6">
            <label htmlFor="kit-name" className="label text-slate">
              Name <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <input
              id="kit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={state === "submitting"}
              placeholder="Leave blank if you'd rather not"
              className="mt-2 w-full border border-[var(--rule-strong)] bg-paper px-4 py-3.5 text-[0.9375rem] placeholder:text-slate/70 transition-colors duration-200 focus:border-red disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={state === "submitting"}
            className="
              group mt-8 flex w-full items-center justify-center gap-2.5 border border-red
              bg-red px-6 py-4 text-paper transition-colors duration-200
              hover:bg-red-deep hover:border-red-deep disabled:cursor-wait disabled:opacity-70
            "
          >
            <span className="label">
              {state === "submitting" ? "Sending" : "Send request"}
            </span>
            <ArrowRight
              className={`h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                state === "submitting" ? "animate-pulse" : "group-hover:translate-x-1.5"
              }`}
            />
          </button>

          <p className="mt-5 flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-slate">
            <Shield className="mt-px h-4 w-4 shrink-0" />
            We don&rsquo;t ask for ID, insurance, or why you want it. We never
            sell or share what you give us.
          </p>
        </form>
      )}
    </div>
  );
}
