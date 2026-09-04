"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight } from "./icons";
import { Watermark } from "./watermark";

type Door = {
  id: string;
  href: string;
  label: string;
  consequence: string;
  tone: "red" | "paper" | "blush";
  /** Relative flex weight at rest on desktop. The red door leads. */
  rest: number;
  /** Stacked height on mobile, where flex-grow does nothing. The triage
   *  hierarchy has to survive the breakpoint that carries most of the traffic. */
  stacked: string;
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
    stacked: "min-h-[23rem]",
  },
  {
    id: "help",
    href: "/volunteer",
    label: "I want to help",
    consequence:
      "Volunteer, fund kits, or bring a training to your school or workplace.",
    tone: "paper",
    rest: 1,
    stacked: "min-h-[15rem]",
  },
  {
    id: "about",
    href: "/about",
    label: "Who we are",
    consequence:
      "A 501(c)(3) in Avon, Connecticut. Our mission, our filings, our board.",
    tone: "blush",
    rest: 0.85,
    stacked: "min-h-[13.5rem]",
  },
];

const TONE = {
  red: {
    base: "bg-red",
    dim: "bg-red-deep",
    text: "text-paper on-red",
    rule: "bg-[var(--rule-on-red)]",
    consequence: "text-paper-on-red",
    arrow: "text-paper",
  },
  paper: {
    base: "bg-paper",
    dim: "bg-paper-deep",
    text: "text-ink",
    rule: "bg-[var(--rule-strong)]",
    consequence: "text-ink-soft",
    arrow: "text-red",
  },
  blush: {
    base: "bg-blush",
    dim: "bg-blush-deep",
    text: "text-ink",
    rule: "bg-[var(--rule-strong)]",
    consequence: "text-ink-soft",
    // Brand red on blush measures 3.74:1 — below AA for this 11px label.
    // red-deep holds the brand and clears it at 5.6:1.
    arrow: "text-red-deep",
  },
} as const;

export function Doors() {
  const [active, setActive] = useState<string | null>(null);
  const [reduced, setReduced] = useState(false);

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
      return active === door.id
        ? door.rest + 0.75
        : Math.max(door.rest - 0.28, 0.55);
    },
    [active],
  );

  return (
    <div
      onMouseLeave={() => setActive(null)}
      className="
        relative isolate flex w-full flex-col
        md:h-[calc(100svh-var(--header-h))] md:min-h-[34rem] md:flex-row
      "
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
            }}
            className={`
              group relative flex flex-col justify-end overflow-hidden
              px-6 pb-10 pt-14 outline-offset-[-3px]
              transition-[flex-grow,background-color] ease-[var(--ease-out-expo)]
              ${door.stacked} md:!min-h-0 md:px-8 md:pb-14
              ${dimmed ? tone.dim : tone.base} ${tone.text}
              ${i > 0 ? "border-t md:border-l md:border-t-0" : ""}
              border-[var(--rule-strong)]
            `}
          >
            {/* z-20 keeps the copy above the shared watermark plane below. */}
            <span
              className="door-rise relative z-20 flex flex-col gap-5"
              style={{ animationDelay: reduced ? "0ms" : `${i * 110}ms` }}
            >
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
                  ${dimmed ? "opacity-60" : "opacity-100"}
                `}
              >
                {door.consequence}
              </span>

              <span className={`flex items-center gap-2 pt-1 ${tone.arrow}`}>
                <span className="label">Enter</span>
                <ArrowRight
                  className="
                    h-[1.15rem] w-[1.15rem] transition-transform duration-500
                    ease-[var(--ease-out-expo)] group-hover:translate-x-1.5
                    group-focus-visible:translate-x-1.5
                  "
                />
              </span>
            </span>
          </Link>
        );
      })}

      {/*
        ONE watermark plane for the whole fork rather than one per panel.
        Per-panel planes each centred their own tiling, so the pattern restarted
        at every seam. This sits above the opaque grounds and blends into them,
        so the texture is genuinely continuous and each ground tints it
        differently on its own. It holds still while the panels resize, which is
        the differential motion the direction asks for.
      */}
      <Watermark
        rows={12}
        className="z-10 text-paper opacity-[0.55] mix-blend-soft-light"
      />
    </div>
  );
}
