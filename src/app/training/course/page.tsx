import Link from "next/link";
import type { Metadata } from "next";
import { CoursePlayer } from "@/components/training/course-player";

export const metadata: Metadata = {
  title: "Course modules",
  description: "The Narcan certification modules.",
};

export default function CoursePage() {
  return (
    <section>
      <div className="mx-auto max-w-[90rem] px-5 py-14 lg:px-8 lg:py-20">
        <Link
          href="/training"
          className="label text-red transition-colors hover:text-red-deep"
        >
          ← Course overview
        </Link>
        <h1 className="display mt-6 text-[clamp(2rem,5vw,3.4rem)]">
          The modules
        </h1>
        <p className="measure mt-5 text-[1.0625rem] leading-relaxed text-ink-soft">
          Watch each one to the end. Rewinding is fine; skipping ahead snaps you
          back. Your place is saved in this browser.
        </p>

        <div className="mt-12">
          <CoursePlayer />
        </div>
      </div>
    </section>
  );
}
