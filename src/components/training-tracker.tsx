"use client";

import { useEffect, useRef, useState } from "react";
import { course } from "@/lib/training";

/**
 * "How many people we've trained" — the count from `course.peopleTrained`,
 * counting up when it scrolls into view. At zero it says so honestly rather
 * than showing a lonely 0.
 */
export function TrainingTracker() {
  const target = course.peopleTrained;
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || target <= 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (reduced) {
          setShown(target);
          return;
        }
        const duration = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          // ease-out
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <section className="border-b border-[var(--rule-strong)] bg-paper-deep">
      <div
        ref={ref}
        className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8 lg:py-20"
      >
        {target > 0 ? (
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <p className="tabular display text-[clamp(3rem,9vw,6rem)] leading-none text-red">
              {shown.toLocaleString()}
            </p>
            <p className="measure text-[1.0625rem] leading-relaxed text-ink-soft">
              people trained to recognize and reverse an opioid overdose &mdash;
              in person and online. Every one of them can carry a kit and use it.
            </p>
          </div>
        ) : (
          <div className="max-w-[46rem]">
            <p className="label text-red">People trained</p>
            <p className="display mt-3 text-[clamp(1.6rem,3.6vw,2.4rem)] leading-[1.15]">
              Zero, so far &mdash; and we&rsquo;re not going to pretend otherwise.
            </p>
            <p className="measure mt-5 text-[1.0625rem] leading-relaxed text-ink-soft">
              Our first workshop is this fall. This counter starts the day we
              put a kit in the first trained hand, and it updates as it climbs.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
