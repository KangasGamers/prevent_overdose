import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ArrowRight } from "@/components/icons";
import { org, boardRoles } from "@/lib/site";
import { nationalStats, cdcAttribution } from "@/lib/stats";

const WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six"];
const openBoardSeats = boardRoles.filter((r) => !("name" in r)).length;

export const metadata: Metadata = {
  title: "About",
  description: org.mission,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About"
        lede={`A ${org.status} nonprofit in ${org.address.city}, Connecticut. EIN ${org.ein}.`}
      />

      <section className="border-b border-[var(--rule-strong)]">
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-x-20 gap-y-14 lg:grid-cols-[14rem_1fr]">
            <h2 className="display text-[clamp(1.8rem,3vw,2.4rem)]">Mission</h2>
            <p className="display text-[clamp(1.5rem,3.2vw,2.6rem)] leading-[1.1]">
              {org.mission}
            </p>
          </div>

          <div className="mt-20 grid gap-x-20 gap-y-14 border-t border-[var(--rule-strong)] pt-20 lg:grid-cols-[14rem_1fr]">
            <h2 className="display text-[clamp(1.8rem,3vw,2.4rem)]">Vision</h2>
            <p className="measure text-[1.125rem] leading-relaxed text-ink-soft">
              {org.vision}
            </p>
          </div>

          <div className="mt-20 grid gap-x-20 gap-y-14 border-t border-[var(--rule-strong)] pt-20 lg:grid-cols-[14rem_1fr]">
            <h2 className="display text-[clamp(1.8rem,3vw,2.4rem)]">
              What we believe
            </h2>
            <p className="measure text-[1.125rem] leading-relaxed text-ink-soft">
              {org.values}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--rule-strong)] bg-paper-deep">
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <h2 className="display text-[clamp(2rem,4.6vw,3.2rem)]">
            Why this matters
          </h2>
          <div className="mt-14 grid gap-px border border-[var(--rule-strong)] bg-[var(--rule-strong)] sm:grid-cols-2">
            {nationalStats.map((s) => (
              <div key={s.id} className="bg-paper-deep p-8 lg:p-10">
                <p className="tabular display text-[clamp(2.8rem,6vw,4.5rem)] text-red">
                  {s.display}
                </p>
                <p className="measure-tight mt-4 text-[1rem] leading-relaxed">
                  {s.label}
                </p>
                <p className="mt-5 text-[0.8125rem] text-slate">
                  <a
                    href={s.sourceHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-[var(--rule-strong)] transition-colors hover:text-red hover:decoration-red"
                  >
                    {s.source}, {s.year}
                  </a>
                </p>
              </div>
            ))}
          </div>
          <p className="measure mt-10 text-[1rem] leading-relaxed text-ink-soft">
            After decades of rising, overdose deaths are now falling &mdash; and
            the CDC names{" "}
            <a
              href={cdcAttribution.sourceHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-red/40 transition-colors hover:decoration-red"
            >
              &ldquo;{cdcAttribution.quote}&rdquo;
            </a>{" "}
            among the reasons why. Our work is a piece of that: free naloxone and
            the training to use it, in as many hands as we can reach.
          </p>
        </div>
      </section>

      <section className="bg-red text-paper on-red">
        <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-8 px-5 py-16 lg:px-8 lg:py-20">
          <h2 className="display max-w-[16ch] text-[clamp(1.8rem,4vw,3rem)]">
            {openBoardSeats === 0
              ? "Meet our board"
              : "We are recruiting a board"}
          </h2>
          <Link
            href="/board"
            className="group inline-flex items-center gap-2.5 bg-paper px-7 py-4.5 text-ink transition-colors duration-200 hover:bg-blush"
          >
            <span className="label">
              {openBoardSeats === 0
                ? "Meet the team"
                : `${WORDS[openBoardSeats] ?? openBoardSeats} open ${
                    openBoardSeats === 1 ? "seat" : "seats"
                  }`}
            </span>
            <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
