"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "./icons";
import { Watermark } from "./watermark";

type Door = {
  id: string;
  href: string;
  label: string;
  consequence: string;
  tone: "red" | "paper" | "blush";
  /** Relative flex weight at rest. The red door leads. */
  rest: number;
};

const DOORS: Door[] = [
  {
    id: "narcan",
    href: "/get-narcan",
    label: "I need Narcan",
    consequence:
      "Free kits, no cost and no questions. Plus how to use one when it matters.",
    tone: "red",
    rest: 1.45,
  },
  {
    id: "help",
    href: "/volunteer",
    label: "I want to help",
    consequence:
      "Volunteer, fund kits, or bring a training to your school or workplace.",
    tone: "paper",
    rest: 1,
  },
  {
    id: "about",
    href: "/about",
    label: "Who we are",
    consequence:
      "A 501(c)(3) in Avon, Connecticut. Our mission, our filings, our open board seats.",
    tone: "blush",
    rest: 0.85,
  },
];

const TONE = {
  red: {
    panel: "bg-red text-paper on-red",
    rule: "bg-[var(--rule-on-red)]",
    consequence: "text-paper-on-red",
    arrow: "text-paper",
    // Watermark ink per field: the texture is continuous across all three
    // panels, but each ground needs its own opacity to stay behind the copy.
    mark: "text-paper opacity-[0.13]",
  },
  paper: {
    panel: "bg-paper text-ink",
    rule: "bg-[var(--rule-strong)]",
    consequence: "text-ink-soft",
    arrow: "text-red",
    mark: "text-ink opacity-[0.05]",
  },
  blush: {
    panel: "bg-blush text-ink",
    rule: "bg-[var(--rule-strong)]",
    consequence: "text-ink-soft",
    // Brand red on blush measures 3.74:1 — below AA for this 11px label.
    // red-deep holds the brand and clears it at 5.6:1.
    arrow: "text-red-deep",
    mark: "text-red opacity-[0.10]",
  },
} as const;

export function Doors() {
  const [active, setActive] = useState<string | null>(null);
  const [reduced, setReduced] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const weightFor = useCallback(
    (door: Door) => {
      if (active === null) return door.rest;
      return active === door.id ? door.rest + 0.75 : Math.max(door.rest - 0.28, 0.55);
    },
    [active],
  );

  return (
    <div
      ref={containerRef}
      onMouseLeave={() => setActive(null)}
      className="flex w-full flex-col md:h-[calc(100svh-var(--header-h))] md:min-h-[34rem] md:flex-row"
    >
      {DOORS.map((door, i) => {
        const tone = TONE[door.tone];
        const isActive = active === door.id;
        const dimmed = active !== null && !isActive;

        return (
          <Link
            key={door.id}
            href={door.href}
            onMouseEnter={() => setActive(door.id)}
            onFocus={() => setActive(door.id)}
            onBlur={() => setActive(null)}
            style={{
              flexGrow: weightFor(door),
              flexBasis: 0,
              transitionDuration: reduced ? "0ms" : "700ms",
              animationDelay: reduced ? "0ms" : `${i * 110}ms`,
            }}
            className={`
              group door-rise relative isolate flex min-h-[15rem] flex-col justify-end
              overflow-hidden px-6 pb-10 pt-14 outline-offset-[-3px]
              transition-[flex-grow] ease-[var(--ease-out-expo)]
              md:min-h-0 md:px-8 md:pb-14
              ${tone.panel}
              ${i > 0 ? "border-t md:border-l md:border-t-0" : ""}
              border-[var(--rule-strong)]
            `}
          >
            <Watermark
              rows={11}
              className={`
                ${tone.mark}
                transition-transform duration-[900ms] ease-[var(--ease-out-expo)]
                group-hover:scale-110
              `}
            />

            {/* The active field deepens rather than lifting: no shadow, no float. */}
            <span
              aria-hidden
              className={`
                pointer-events-none absolute inset-0 -z-10 bg-ink
                transition-opacity duration-500 ease-[var(--ease-out-expo)]
                ${dimmed ? "opacity-[0.07]" : "opacity-0"}
              `}
            />

            <span className="relative flex flex-col gap-5">
              <span
                aria-hidden
                className={`block h-px w-full origin-left rule-draw ${tone.rule}`}
                style={{ animationDelay: reduced ? "0ms" : `${400 + i * 110}ms` }}
              />

              <span className="display text-[clamp(2.4rem,5.6vw,4.5rem)]">
                {door.label}
              </span>

              <span
                className={`
                  measure-tight text-[0.9375rem] leading-relaxed transition-opacity
                  duration-500 ${tone.consequence}
                  ${dimmed ? "opacity-55" : "opacity-100"}
                `}
              >
                {door.consequence}
              </span>

              <span className={`flex items-center gap-2 pt-1 ${tone.arrow}`}>
                <span className="label">Enter</span>
                <ArrowRight
                  className={`
                    h-[1.15rem] w-[1.15rem] transition-transform duration-500
                    ease-[var(--ease-out-expo)] group-hover:translate-x-1.5
                    group-focus-visible:translate-x-1.5
                  `}
                />
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
