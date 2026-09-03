"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "./icons";
import { org } from "@/lib/site";

/**
 * Live giving tracker. Reads the campaign's real goal status from Givebutter
 * (no API key needed — the endpoint the widget script uses is CORS-open) and
 * renders progress in kits, not bare dollars. If the fetch fails the whole
 * section renders nothing rather than showing a fake or empty bar.
 */
const GOAL_STATUS_URL = `https://givebutter.com/elements/api/v2/${org.donateAccountId}/campaigns/preventoverdoses/goal-status`;
const DOLLARS_PER_KIT = 45;

type Status = { goal: number; raised: number; pct: number };

export function DonationTracker() {
  const [status, setStatus] = useState<Status | null>(null);
  const [filled, setFilled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch(GOAL_STATUS_URL, { cache: "no-store" });
        if (!res.ok) return;
        const json = await res.json();
        const goal = Number(json.goal) || 0;
        const raised = Number(json.raised) || 0;
        if (!alive || goal <= 0) return;
        setStatus({ goal, raised, pct: Math.max(0, Math.min(100, (raised / goal) * 100)) });
      } catch {
        /* stay hidden */
      }
    }
    load();
    const id = setInterval(load, 60_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // Run the fill animation the first time the bar scrolls into view.
  useEffect(() => {
    const el = barRef.current;
    if (!status || !el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFilled(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [status]);

  if (!status) return null;

  const kitsFunded = Math.floor(status.raised / DOLLARS_PER_KIT);
  const kitsGoal = Math.round(status.goal / DOLLARS_PER_KIT);
  // Keep a real-but-tiny amount from rendering as an invisible sliver.
  const shownPct = status.pct > 0 && status.pct < 2 ? 2 : status.pct;
  const raisedLabel = status.raised.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <section className="border-b border-[var(--rule-strong)] bg-paper-deep">
      <div className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div>
            <p className="tabular display text-[clamp(2.8rem,7vw,5rem)]">
              <span className="text-red">{kitsFunded.toLocaleString()}</span>
              <span className="text-ink"> / {kitsGoal.toLocaleString()}</span>
            </p>
            <p className="mt-3 text-[1rem] text-ink-soft">
              kits funded toward our first goal. We just started — every kit is
              one someone can carry.
            </p>
          </div>
          <Link
            href="/donate"
            className="group flex items-center gap-2.5 text-red"
          >
            <span className="label">Fund a kit</span>
            <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
          </Link>
        </div>

        <div
          ref={barRef}
          className="mt-8 h-4 w-full overflow-hidden rounded-full border border-[var(--rule-strong)] bg-blush-deep"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(status.pct)}
          aria-label={`${kitsFunded} of ${kitsGoal} kits funded`}
        >
          <div
            className="h-full rounded-full bg-red transition-[width] duration-[1400ms] ease-[var(--ease-out-expo)]"
            style={{ width: filled ? `${shownPct}%` : "0%" }}
          />
        </div>

        <div className="tabular mt-4 flex flex-wrap justify-between gap-x-8 gap-y-1 text-[0.8125rem] text-slate">
          <span>
            ${raisedLabel} raised toward a ${status.goal.toLocaleString()} goal
          </span>
          <span>Live from Givebutter</span>
        </div>
      </div>
    </section>
  );
}
