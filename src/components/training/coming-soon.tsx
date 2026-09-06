import Link from "next/link";
import { ArrowRight } from "@/components/icons";

/**
 * Shown in place of the course player / quiz / submission form while
 * `trainingLive` is false — i.e. while the module videos are still in
 * production. Flip `trainingLive` in `src/lib/training.ts` to re-enable them.
 */
export function TrainingComingSoon() {
  return (
    <div className="border border-[var(--rule-strong)] bg-paper-deep px-7 py-12 lg:px-10 lg:py-16">
      <span className="label text-red">Coming soon</span>
      <h2 className="display-tight mt-3 text-[clamp(1.5rem,3.4vw,2.1rem)]">
        The modules are still being filmed
      </h2>
      <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
        We&rsquo;re producing the course videos now. The full flow — watch,
        quiz, submit a demonstration, get certified — opens once they&rsquo;re
        ready. In the meantime you can still get a free kit, or ask us to bring
        an in-person session to your school or workplace.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/get-narcan"
          className="group inline-flex items-center gap-2.5 border border-red bg-red px-7 py-4 text-paper transition-colors duration-200 hover:border-red-deep hover:bg-red-deep"
        >
          <span className="label">Get a free kit</span>
          <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
        </Link>
        <Link
          href="/workshops"
          className="inline-flex items-center gap-2.5 border border-ink px-7 py-4 transition-colors duration-200 hover:border-red hover:bg-red hover:text-paper"
        >
          <span className="label">In-person workshops</span>
        </Link>
      </div>
    </div>
  );
}
