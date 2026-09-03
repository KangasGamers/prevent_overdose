import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { BoardSeats } from "@/components/board-seats";
import { ArrowRight, Mail } from "@/components/icons";
import { boardApplication, org } from "@/lib/site";

export const metadata: Metadata = {
  title: "Board of Directors",
  description:
    "Five board seats are open at PreventOverdose. Here is what each one is responsible for.",
};

export default function BoardPage() {
  return (
    <>
      <PageHeader
        title="Five open seats"
        lede="We are a new organization and our board is not yet formed. Rather than show you five empty photographs, here is exactly what each seat is responsible for — and how to take one."
      />

      <BoardSeats />

      <section
        id="apply"
        className="scroll-mt-[calc(var(--header-h)+1rem)] border-b border-[var(--rule-strong)] bg-paper-deep"
      >
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
            <div>
              <h2 className="display text-[clamp(2rem,4.6vw,3.2rem)]">
                How to apply
              </h2>
              <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-ink-soft">
                Send two things to the address below. We read everything and we
                reply to everyone, including the people we don&rsquo;t take.
              </p>
              <a
                href={`mailto:${boardApplication.email}?subject=Board application`}
                className="group mt-10 inline-flex items-center gap-2.5 border border-red bg-red px-7 py-4.5 text-paper transition-colors duration-200 hover:bg-red-deep hover:border-red-deep"
              >
                <Mail className="h-[1.15rem] w-[1.15rem]" />
                <span className="label">{org.email}</span>
                <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
              </a>
            </div>

            <ol className="border-t border-[var(--rule-strong)]">
              {boardApplication.requirements.map((req, i) => (
                <li
                  key={req}
                  className="flex items-baseline gap-6 border-b border-[var(--rule-strong)] py-7"
                >
                  <span className="tabular text-[0.8125rem] font-semibold text-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display-tight text-[1.35rem]">{req}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
