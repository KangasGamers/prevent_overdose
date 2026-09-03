"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, NasalSpray, Users, Pin } from "./icons";
import { Watermark } from "./watermark";
import { org } from "@/lib/site";

/** What a gift actually pays for — concrete, not a pie chart. */
const FUNDS = [
  {
    Icon: NasalSpray,
    label: "Naloxone kits",
    detail: "Two-dose nasal kits at roughly $45 wholesale, handed out with no ID and no questions.",
  },
  {
    Icon: Users,
    label: "Training sessions",
    detail: "Free sessions for schools, workplaces, and community groups — every attendee leaves with a kit.",
  },
  {
    Icon: Pin,
    label: "Distribution events",
    detail: "Tables at events across the Farmington Valley where anyone can pick up a kit and learn to use it.",
  },
];

/** Tiers framed in kits, not bare dollars — the unit is the point. Selecting one
 *  pre-fills the amount in the embedded Givebutter form below. */
const TIERS: { amount: number; kits: number; note: string; featured?: boolean }[] = [
  { amount: 45, kits: 1, note: "One two-dose kit in someone's hands" },
  { amount: 135, kits: 3, note: "A household, a car, and a backpack", featured: true },
  { amount: 450, kits: 10, note: "A full distribution table for one event" },
];

/** Givebutter's official web-components bundle. It registers
 *  <givebutter-giving-form>, which mounts the campaign's donation iframe and
 *  runs a version-matched iframe-resizer so the frame is exactly content-tall —
 *  no fixed height, no trailing blank space. */
const GB_SRC = `https://widgets.givebutter.com/latest.umd.cjs?acct=${org.donateAccountId}&p=other`;

export function DonateWidget() {
  const [amount, setAmount] = useState<number | null>(null);
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.querySelector(`script[src="${GB_SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = GB_SRC;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  function choose(next: number) {
    setAmount(next);
    embedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const embedUrl = amount
    ? `${org.donateEmbedUrl}?amount=${amount}`
    : org.donateEmbedUrl;

  return (
    <>
      <ul className="grid gap-px border border-[var(--rule-strong)] bg-[var(--rule-strong)] lg:grid-cols-3">
        {TIERS.map((t) => {
          const selected = amount === t.amount;
          return (
            <li
              key={t.amount}
              className={t.featured ? "bg-red text-paper on-red" : "bg-paper"}
            >
              <div className="flex h-full flex-col p-8 lg:p-10">
                <p className="tabular display text-[clamp(2.6rem,5vw,3.8rem)]">
                  ${t.amount}
                </p>
                <p
                  className={`display-tight mt-4 text-[1.4rem] ${
                    t.featured ? "text-paper" : "text-red"
                  }`}
                >
                  {t.kits} {t.kits === 1 ? "kit" : "kits"}
                </p>
                <p
                  className={`mt-3 text-[0.9375rem] leading-relaxed ${
                    t.featured ? "text-paper-on-red" : "text-ink-soft"
                  }`}
                >
                  {t.note}
                </p>
                <button
                  type="button"
                  onClick={() => choose(t.amount)}
                  aria-pressed={selected}
                  className={`
                    group mt-8 flex w-full items-center justify-center gap-2.5 border
                    px-6 py-4 transition-colors duration-200
                    ${
                      t.featured
                        ? "border-paper bg-paper text-ink hover:bg-blush"
                        : selected
                          ? "border-red bg-red text-paper"
                          : "border-ink hover:border-red hover:bg-red hover:text-paper"
                    }
                  `}
                >
                  <span className="label">
                    {selected ? `$${t.amount} selected` : `Give $${t.amount}`}
                  </span>
                  <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div
        ref={embedRef}
        className="mt-14 grid scroll-mt-[calc(var(--header-h)+2rem)] border border-[var(--rule-strong)] lg:grid-cols-2"
      >
        {/* Left: the live Givebutter form. */}
        <div className="bg-paper-deep">
          <div className="border-b border-[var(--rule-strong)] px-6 py-5">
            <h2 className="display-tight text-[1.4rem]">
              {amount ? `Donate $${amount}` : "Donate any amount"}
            </h2>
          </div>
          <div className="min-h-[20rem] px-4 py-8">
            <givebutter-giving-form
              key={amount ?? "any"}
              account={org.donateAccountId}
              campaign="preventoverdoses"
              embed-url={embedUrl}
              max-width="100%"
            />
          </div>
        </div>

        {/* Right: where the money goes. */}
        <div className="relative isolate overflow-hidden border-t border-[var(--rule-strong)] bg-red p-8 text-paper on-red lg:border-l lg:border-t-0 lg:p-10">
          <Watermark rows={8} className="text-paper opacity-[0.08]" />
          <div className="relative">
            <h2 className="display text-[clamp(1.6rem,3vw,2.2rem)]">
              Where your gift goes
            </h2>
            <p className="measure-tight mt-4 text-[0.9375rem] leading-relaxed text-paper-on-red">
              We keep one unit in mind: a two-dose kit costs about $45. Your
              donation buys naloxone and the events that put it in hands — not
              overhead.
            </p>

            <dl className="mt-8 border-t border-[var(--rule-on-red)]">
              {FUNDS.map(({ Icon, label, detail }) => (
                <div
                  key={label}
                  className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-b border-[var(--rule-on-red)] py-5"
                >
                  <Icon className="h-6 w-6 text-paper" />
                  <dt className="display-tight text-[1.15rem]">{label}</dt>
                  <dd className="col-start-2 text-[0.875rem] leading-relaxed text-paper-on-red">
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-[0.8125rem] leading-relaxed text-paper-on-red">
              Every gift is tax deductible. We publish no impact numbers of our
              own until we have earned them.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
