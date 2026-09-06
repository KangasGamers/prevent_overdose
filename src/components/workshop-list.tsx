"use client";

import { useState } from "react";
import { ArrowRight, Clock, Pin } from "./icons";
import { WorkshopRegisterForm } from "./workshop-register-form";
import type { workshops as Workshops } from "@/lib/site";

type Workshop = (typeof Workshops)[number];

export function WorkshopList({ workshops }: { workshops: Workshop[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <ul className="mt-12 border-t border-[var(--rule-strong)]">
      {workshops.map((w) => {
        const open = openSlug === w.slug;
        return (
          <li key={w.slug} className="border-b border-[var(--rule-strong)]">
            <div className="grid gap-x-10 gap-y-6 py-10 md:grid-cols-[1fr_auto] md:py-12">
              <div>
                <span className="label text-red">{w.city}</span>
                <h3 className="display-tight mt-2 text-[clamp(1.8rem,3.2vw,2.6rem)]">
                  {w.title}
                </h3>
                <p className="measure mt-4 text-[1rem] leading-relaxed text-ink-soft">
                  {w.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-10 gap-y-3 text-[0.9375rem]">
                  <span className="flex items-center gap-2.5">
                    <Clock className="h-[1.15rem] w-[1.15rem] text-red" />
                    {w.startsAt ? (
                      <span className="tabular">{w.startsAt}</span>
                    ) : (
                      <span className="text-slate">Date to be announced</span>
                    )}
                  </span>
                  <span className="flex items-center gap-2.5">
                    <Pin className="h-[1.15rem] w-[1.15rem] text-red" />
                    <span>{w.locationName}</span>
                  </span>
                  {w.capacity != null && (
                    <span className="text-slate">{w.capacity} seats</span>
                  )}
                </div>
              </div>

              <div className="md:self-center">
                {w.registerOpen ? (
                  <button
                    type="button"
                    onClick={() => setOpenSlug(open ? null : w.slug)}
                    aria-expanded={open}
                    className="group inline-flex items-center gap-2.5 border border-red bg-red px-6 py-4 text-paper transition-colors duration-200 hover:border-red-deep hover:bg-red-deep"
                  >
                    <span className="label">{open ? "Close" : "Register"}</span>
                    <ArrowRight
                      className={`h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                        open ? "rotate-90" : "group-hover:translate-x-1.5"
                      }`}
                    />
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-2.5 border border-dashed border-slate/60 px-6 py-4 text-slate">
                    <span className="label">Registration opening soon</span>
                  </span>
                )}
              </div>
            </div>

            {open && w.registerOpen && (
              <div className="pb-10 md:max-w-[44rem]">
                <WorkshopRegisterForm workshop={w.title} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
