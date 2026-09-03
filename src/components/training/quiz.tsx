"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Shield } from "../icons";
import { course, quiz } from "@/lib/training";
import { allModulesComplete, useTrainingProgress } from "@/lib/training-progress";

type Result = { score: number; correct: number; passed: boolean };

export function Quiz() {
  const { progress, ready, recordQuiz } = useTrainingProgress();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [showGaps, setShowGaps] = useState(false);

  if (!ready) {
    return <p className="text-[0.9375rem] text-slate">Loading…</p>;
  }

  if (!allModulesComplete(progress)) {
    return (
      <div className="border border-[var(--rule-strong)] bg-paper-deep p-8 lg:p-10">
        <Shield className="h-8 w-8 text-slate" />
        <h2 className="display-tight mt-4 text-[1.6rem]">The quiz is locked</h2>
        <p className="measure-tight mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
          Finish every module first. Each one unlocks the next, and the videos
          can&rsquo;t be skipped ahead.
        </p>
        <Link
          href="/training/course"
          className="group mt-6 inline-flex items-center gap-2.5 border border-red bg-red px-6 py-3.5 text-paper transition-colors duration-200 hover:bg-red-deep hover:border-red-deep"
        >
          <span className="label">Back to the modules</span>
          <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
        </Link>
      </div>
    );
  }

  const answered = Object.keys(answers).length;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (answered < quiz.length) return;
    const correct = quiz.filter((q) => answers[q.id] === q.answer).length;
    const score = correct / quiz.length;
    const passed = score >= course.passThreshold;
    recordQuiz(score, passed);
    setResult({ score, correct, passed });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function retry() {
    setAnswers({});
    setResult(null);
    setShowGaps(false);
  }

  if (result) {
    const pct = Math.round(result.score * 100);
    return (
      <div className="border border-[var(--rule-strong)] bg-paper-deep p-8 lg:p-10">
        {result.passed ? (
          <>
            <Check className="h-9 w-9 text-red" />
            <h2 className="display mt-5 text-[clamp(1.8rem,4vw,2.6rem)]">You passed</h2>
            <p className="tabular mt-3 text-[1.0625rem] text-ink-soft">
              {result.correct} of {quiz.length} correct · {pct}%
            </p>
            <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
              One step left: record a short video of yourself performing the
              overdose response and submit it. We review every submission and
              issue your certificate by email.
            </p>
            <Link
              href="/training/submit"
              className="group mt-7 inline-flex items-center gap-2.5 border border-red bg-red px-7 py-4 text-paper transition-colors duration-200 hover:bg-red-deep hover:border-red-deep"
            >
              <span className="label">Submit your demonstration</span>
              <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
            </Link>
          </>
        ) : (
          <>
            <h2 className="display mt-1 text-[clamp(1.8rem,4vw,2.6rem)]">Not quite</h2>
            <p className="tabular mt-3 text-[1.0625rem] text-ink-soft">
              {result.correct} of {quiz.length} correct · {pct}% · you need{" "}
              {Math.round(course.passThreshold * 100)}%
            </p>
            <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
              Review the modules and try again — there&rsquo;s no limit on
              attempts.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={retry}
                className="group inline-flex items-center gap-2.5 border border-red bg-red px-6 py-3.5 text-paper transition-colors duration-200 hover:bg-red-deep hover:border-red-deep"
              >
                <span className="label">Try again</span>
              </button>
              <Link
                href="/training/course"
                className="inline-flex items-center gap-2.5 border border-ink px-6 py-3.5 transition-colors duration-200 hover:border-red hover:bg-red hover:text-paper"
              >
                <span className="label">Rewatch the modules</span>
              </Link>
              <button
                type="button"
                onClick={() => setShowGaps((v) => !v)}
                className="text-[0.8125rem] text-slate underline decoration-[var(--rule-strong)] transition-colors hover:text-red"
              >
                {showGaps ? "Hide" : "Show"} which ones I missed
              </button>
            </div>
            {showGaps && (
              <ul className="mt-6 border-t border-[var(--rule-strong)]">
                {quiz.map((q, i) =>
                  answers[q.id] === q.answer ? null : (
                    <li
                      key={q.id}
                      className="border-b border-[var(--rule-strong)] py-3 text-[0.875rem] text-ink-soft"
                    >
                      <span className="tabular text-slate">{i + 1}.</span> {q.prompt}
                    </li>
                  ),
                )}
              </ul>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-px border border-[var(--rule-strong)] bg-[var(--rule-strong)]">
      {quiz.map((q, i) => (
        <fieldset key={q.id} className="border-0 bg-paper p-6 lg:p-8">
          <legend className="float-left">
            <span className="tabular text-[0.8125rem] font-semibold text-red">
              {String(i + 1).padStart(2, "0")}
            </span>
          </legend>
          <p className="display-tight ml-10 text-[1.15rem] leading-snug">{q.prompt}</p>
          <div className="ml-10 mt-4 flex flex-col gap-px bg-[var(--rule-strong)]">
            {q.choices.map((choice, ci) => {
              const checked = answers[q.id] === ci;
              return (
                <label
                  key={ci}
                  className={`
                    flex cursor-pointer items-start gap-3 bg-paper px-4 py-3 text-[0.9375rem]
                    transition-colors duration-200 hover:bg-paper-deep
                    ${checked ? "bg-blush hover:bg-blush" : ""}
                  `}
                >
                  <input
                    type="radio"
                    name={q.id}
                    checked={checked}
                    onChange={() => setAnswers((a) => ({ ...a, [q.id]: ci }))}
                    className="mt-1 h-4 w-4 shrink-0 accent-red"
                  />
                  <span>{choice}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="flex flex-wrap items-center gap-4 bg-paper p-6 lg:p-8">
        <button
          type="submit"
          disabled={answered < quiz.length}
          className="group inline-flex items-center gap-2.5 border border-red bg-red px-7 py-4 text-paper transition-colors duration-200 hover:bg-red-deep hover:border-red-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="label">Submit answers</span>
          <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
        </button>
        <p className="tabular text-[0.8125rem] text-slate">
          {answered} / {quiz.length} answered
        </p>
      </div>
    </form>
  );
}
