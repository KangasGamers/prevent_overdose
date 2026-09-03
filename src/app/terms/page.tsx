import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function Page() {
  return (
    <>
      <PageHeader title="Terms & Conditions" tone="ink" />
      <section>
        <div className="mx-auto max-w-[52rem] px-5 py-20 lg:px-8 lg:py-28">
          <div className="border border-dashed border-slate/50 px-6 py-10">
            <p className="label text-slate">Placeholder</p>
            <p className="measure mt-4 text-[1rem] leading-relaxed text-ink-soft">
              The current policy text lives on the existing site and has not been
              migrated. This page exists so the footer links resolve and the
              layout is real.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
