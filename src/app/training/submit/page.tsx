import Link from "next/link";
import type { Metadata } from "next";
import { CertSubmitForm } from "@/components/training/cert-submit-form";

export const metadata: Metadata = {
  title: "Submit your demonstration",
  description: "Send your demonstration video for certification review.",
};

export default function TrainingSubmitPage() {
  return (
    <section>
      <div className="mx-auto max-w-[62rem] px-5 py-14 lg:px-8 lg:py-20">
        <Link
          href="/training/quiz"
          className="label text-red transition-colors hover:text-red-deep"
        >
          ← Quiz
        </Link>
        <h1 className="display mt-6 text-[clamp(2rem,5vw,3.4rem)]">
          Your demonstration
        </h1>
        <p className="measure mt-5 text-[1.0625rem] leading-relaxed text-ink-soft">
          The last step. Show us you can do it, not just recall it.
        </p>

        <div className="mt-12">
          <CertSubmitForm />
        </div>
      </div>
    </section>
  );
}
