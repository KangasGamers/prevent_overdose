"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Shield } from "../icons";
import { Honeypot } from "../honeypot";
import { submitForm } from "@/lib/submit-form";
import { useTrainingProgress } from "@/lib/training-progress";

type State = "idle" | "submitting" | "done" | "error";

export function CertSubmitForm() {
  const { progress, ready, markSubmitted } = useTrainingProgress();
  const [state, setState] = useState<State>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  if (!ready) return <p className="text-[0.9375rem] text-slate">Loading…</p>;

  if (!progress.quiz.passed) {
    return (
      <div className="border border-[var(--rule-strong)] bg-paper-deep p-8 lg:p-10">
        <Shield className="h-8 w-8 text-slate" />
        <h2 className="display-tight mt-4 text-[1.6rem]">Pass the quiz first</h2>
        <p className="measure-tight mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
          The demonstration submission opens once you&rsquo;ve completed the
          modules and passed the quiz.
        </p>
        <Link
          href="/training/quiz"
          className="group mt-6 inline-flex items-center gap-2.5 border border-red bg-red px-6 py-3.5 text-paper transition-colors duration-200 hover:bg-red-deep hover:border-red-deep"
        >
          <span className="label">Go to the quiz</span>
          <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
        </Link>
      </div>
    );
  }

  if (state === "done" || progress.submitted) {
    return (
      <div className="border border-[var(--rule-strong)] bg-paper-deep p-8 lg:p-10">
        <Check className="h-9 w-9 text-red" />
        <h2 className="display-tight mt-4 text-[1.6rem]">Submitted for review</h2>
        <p className="measure-tight mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
          We watch every demonstration ourselves. If it shows the steps done
          safely, your certificate comes by email — usually within a week. If
          something needs another take, we&rsquo;ll tell you exactly what.
        </p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const website = String(new FormData(e.currentTarget).get("website") ?? "");
    if (!name.trim() || !email.trim() || !videoUrl.trim() || !confirmed) {
      setState("error");
      setError("Fill in every field and confirm the checkbox.");
      return;
    }
    if (!/^https?:\/\/.+/i.test(videoUrl.trim())) {
      setState("error");
      setError("The video link needs to be a full URL starting with https://");
      return;
    }
    setState("submitting");
    setError("");
    try {
      await submitForm("training-cert", {
        name: name.trim(),
        email: email.trim(),
        videoUrl: videoUrl.trim(),
        quizScore: `${Math.round(progress.quiz.bestScore * 100)}%`,
        website,
      });
      markSubmitted();
      setState("done");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const busy = state === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative border border-[var(--rule-strong)] bg-paper-deep p-6 lg:p-8"
    >
      <Honeypot />
      <p className="measure text-[0.9375rem] leading-relaxed text-ink-soft">
        Record a short video (2–4 minutes) of yourself talking through and
        performing the overdose response on a training aid or a willing partner:
        recognize, call, give naloxone, rescue breaths, stay. Upload it anywhere
        that produces a shareable link — an unlisted YouTube or Vimeo video, or
        Google Drive set to &ldquo;anyone with the link&rdquo; — and paste that
        link below.
      </p>

      <div className="mt-7">
        <label htmlFor="cert-name" className="label text-slate">
          Full name (as it should read on the certificate)
        </label>
        <input
          id="cert-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={busy}
          className="mt-2 w-full border border-[var(--rule-strong)] bg-paper px-4 py-3.5 text-[0.9375rem] transition-colors focus:border-red disabled:opacity-60"
        />
      </div>

      <div className="mt-6">
        <label htmlFor="cert-email" className="label text-slate">
          Email
        </label>
        <input
          id="cert-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={busy}
          placeholder="you@example.com"
          className="mt-2 w-full border border-[var(--rule-strong)] bg-paper px-4 py-3.5 text-[0.9375rem] placeholder:text-slate/70 transition-colors focus:border-red disabled:opacity-60"
        />
      </div>

      <div className="mt-6">
        <label htmlFor="cert-video" className="label text-slate">
          Link to your demonstration video
        </label>
        <input
          id="cert-video"
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          disabled={busy}
          placeholder="https://"
          className="mt-2 w-full border border-[var(--rule-strong)] bg-paper px-4 py-3.5 text-[0.9375rem] placeholder:text-slate/70 transition-colors focus:border-red disabled:opacity-60"
        />
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-[0.875rem] leading-relaxed text-ink-soft">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          disabled={busy}
          className="mt-1 h-4 w-4 shrink-0 accent-red"
        />
        <span>
          This video is of me, it shows all five steps, and the link will stay
          live until I hear back.
        </span>
      </label>

      {state === "error" && (
        <p role="alert" className="mt-5 text-[0.875rem] text-red">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="group mt-7 flex w-full items-center justify-center gap-2.5 border border-red bg-red px-6 py-4 text-paper transition-colors duration-200 hover:bg-red-deep hover:border-red-deep disabled:cursor-wait disabled:opacity-70"
      >
        <span className="label">{busy ? "Sending" : "Submit for review"}</span>
        <ArrowRight
          className={`h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] ${
            busy ? "animate-pulse" : "group-hover:translate-x-1.5"
          }`}
        />
      </button>
    </form>
  );
}
