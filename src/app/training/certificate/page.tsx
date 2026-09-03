import type { Metadata } from "next";
import { Watermark } from "@/components/watermark";
import { org } from "@/lib/site";
import { course } from "@/lib/training";

export const metadata: Metadata = {
  title: "Certificate",
  robots: { index: false, follow: false },
};

/**
 * Phase 1 certificate: a printable template. After reviewing a demonstration,
 * PreventOverdose opens this with the recipient's details in the URL —
 * /training/certificate?name=Jane%20Doe&issued=2026-09-15&id=PO-2026-0007 —
 * then prints to PDF (⌘P) and emails it. No verification database yet; the ID
 * is for the org's own records.
 */
export default async function CertificatePage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; issued?: string; id?: string }>;
}) {
  const { name, issued, id } = await searchParams;

  if (!name) {
    return (
      <section className="mx-auto max-w-[46rem] px-5 py-24 lg:px-8">
        <h1 className="display text-[clamp(1.8rem,4vw,2.6rem)]">Certificate template</h1>
        <p className="measure mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
          Add the recipient&rsquo;s details to the URL, then print to PDF:
        </p>
        <pre className="mt-5 overflow-x-auto border border-[var(--rule-strong)] bg-paper-deep p-4 text-[0.8125rem]">
          /training/certificate?name=Jane%20Doe&amp;issued=2026-09-15&amp;id=PO-2026-0007
        </pre>
      </section>
    );
  }

  const issuedText = issued
    ? new Date(`${issued}T00:00:00`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <section className="mx-auto max-w-[60rem] px-5 py-14 lg:px-8">
      <div className="relative isolate overflow-hidden border-[6px] border-red bg-paper p-10 text-center lg:p-16">
        <Watermark rows={9} className="text-red opacity-[0.06]" />
        <div className="relative">
          <p className="label text-red">{org.name}</p>
          <p className="mt-10 text-[0.8125rem] uppercase tracking-[0.2em] text-slate">
            Certificate of Completion
          </p>
          <h1 className="display mt-6 text-[clamp(2.4rem,6vw,4rem)]">{name}</h1>

          <p className="measure mx-auto mt-8 text-[1rem] leading-relaxed text-ink-soft">
            has completed the <strong className="text-ink">{course.title}</strong>{" "}
            course — recognizing an opioid overdose, calling for help,
            administering nasal naloxone, and providing rescue breathing — and
            has demonstrated the response on video to the satisfaction of{" "}
            {org.name}.
          </p>

          <div className="mx-auto mt-12 grid max-w-[34rem] grid-cols-2 gap-px border border-[var(--rule-strong)] bg-[var(--rule-strong)] text-left">
            <div className="bg-paper p-4">
              <p className="label text-slate">Issued</p>
              <p className="tabular mt-1 text-[0.9375rem]">{issuedText}</p>
            </div>
            <div className="bg-paper p-4">
              <p className="label text-slate">Certificate ID</p>
              <p className="tabular mt-1 text-[0.9375rem]">{id ?? "—"}</p>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-[20rem] border-t border-ink pt-3">
            <p className="text-[0.8125rem] text-slate">
              {org.name} · {org.status} · EIN {org.ein}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-[0.8125rem] text-slate">
        Print to PDF with ⌘P / Ctrl+P. The site header and footer are hidden when printing.
      </p>
    </section>
  );
}
