import Link from "next/link";
import type { Metadata } from "next";
import { Quiz } from "@/components/training/quiz";
import { TrainingComingSoon } from "@/components/training/coming-soon";
import { trainingLive } from "@/lib/training";

export const metadata: Metadata = {
  title: "Quiz",
  description: "The Narcan certification quiz.",
};

export default function QuizPage() {
  return (
    <section>
      <div className="mx-auto max-w-[62rem] px-5 py-14 lg:px-8 lg:py-20">
        <Link
          href="/training/course"
          className="label text-red transition-colors hover:text-red-deep"
        >
          ← Modules
        </Link>
        <h1 className="display mt-6 text-[clamp(2rem,5vw,3.4rem)]">The quiz</h1>
        <p className="measure mt-5 text-[1.0625rem] leading-relaxed text-ink-soft">
          Answer every question. You can retake it as many times as you need.
        </p>

        <div className="mt-12">
          {trainingLive ? <Quiz /> : <TrainingComingSoon />}
        </div>
      </div>
    </section>
  );
}
