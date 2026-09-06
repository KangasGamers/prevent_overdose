import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ArrowRight, Users, Check, Shield, NasalSpray } from "@/components/icons";
import { course, modules, trainingLive } from "@/lib/training";

export const metadata: Metadata = {
  title: "Narcan Certification",
  description:
    "A free online course from PreventOverdose: watch the modules, pass the quiz, submit a demonstration video, and get certified to recognize and reverse an opioid overdose.",
};

const STEPS = [
  {
    Icon: Users,
    title: "Watch the modules",
    body: `${modules.length} short videos, in order. Each unlocks the next — and can't be skipped ahead.`,
  },
  {
    Icon: Check,
    title: "Pass the quiz",
    body: `Unlocks once every module is done. ${Math.round(
      course.passThreshold * 100,
    )}% to pass, unlimited attempts.`,
  },
  {
    Icon: NasalSpray,
    title: "Submit a demonstration",
    body: "Record yourself performing the five steps and send us the link. We watch every one.",
  },
  {
    Icon: Shield,
    title: "Get certified",
    body: "If your demonstration is safe and complete, your certificate arrives by email.",
  },
];

export default function TrainingPage() {
  return (
    <>
      <PageHeader
        title="Narcan Certification"
        lede={
          trainingLive
            ? course.tagline
            : "A free online course to recognize and reverse an opioid overdose. We're filming the modules now — here's what it covers."
        }
      />

      <section className="border-b border-[var(--rule-strong)]">
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display text-[clamp(2rem,4.6vw,3.2rem)]">How it works</h2>
            <p className="tabular text-[0.9375rem] text-slate">
              About {course.estMinutes} minutes · free
            </p>
          </div>

          <ol className="mt-14 border-t border-[var(--rule-strong)]">
            {STEPS.map(({ Icon, title, body }, i) => (
              <li
                key={title}
                className="grid gap-x-8 gap-y-3 border-b border-[var(--rule-strong)] py-9 md:grid-cols-[3rem_auto_1fr] md:py-11"
              >
                <span className="tabular text-[0.8125rem] font-semibold text-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon className="h-7 w-7 text-red" />
                <div>
                  <h3 className="display-tight text-[1.4rem]">{title}</h3>
                  <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            {trainingLive ? (
              <Link
                href="/training/course"
                className="group inline-flex items-center gap-2.5 border border-red bg-red px-7 py-4 text-paper transition-colors duration-200 hover:bg-red-deep hover:border-red-deep"
              >
                <span className="label">Start the course</span>
                <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2.5 border border-dashed border-slate/60 px-7 py-4 text-slate">
                <span className="label">Modules coming soon</span>
              </span>
            )}
            <Link
              href="/get-narcan"
              className="inline-flex items-center gap-2.5 border border-ink px-7 py-4 transition-colors duration-200 hover:border-red hover:bg-red hover:text-paper"
            >
              <span className="label">Get a free kit</span>
            </Link>
          </div>

          <p className="measure mt-10 border-l-[3px] border-red pl-5 text-[0.9375rem] leading-relaxed text-ink-soft">
            Prefer to learn in person? We bring the same training, and the kits,
            to schools, workplaces, and community groups across the Farmington
            Valley. <Link href="/contact" className="text-red underline decoration-red/40">Ask for a session.</Link>
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--rule-strong)] bg-paper-deep">
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <h2 className="display text-[clamp(2rem,4.6vw,3.2rem)]">What&rsquo;s covered</h2>
          <ol className="mt-14 border-t border-[var(--rule-strong)]">
            {modules.map((m, i) => (
              <li
                key={m.id}
                className="grid gap-x-8 gap-y-2 border-b border-[var(--rule-strong)] py-8 md:grid-cols-[3rem_16rem_1fr]"
              >
                <span className="tabular text-[0.8125rem] font-semibold text-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display-tight text-[1.15rem]">{m.title}</h3>
                <p className="measure text-[0.9375rem] leading-relaxed text-ink-soft">
                  {m.summary}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
