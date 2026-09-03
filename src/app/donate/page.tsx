import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Phone, Pin, Check } from "@/components/icons";
import { org } from "@/lib/site";

export const metadata: Metadata = {
  title: "Donate",
  description: "Fund Narcan kits. Every dollar goes toward kits and the events that distribute them.",
};

/** Tiers framed in kits, not bare dollars — the unit is the point. */
const TIERS = [
  { amount: 45, kits: 1, note: "One two-dose kit in someone's hands" },
  { amount: 135, kits: 3, note: "A household, a car, and a backpack", featured: true },
  { amount: 450, kits: 10, note: "A full distribution table for one event" },
];

export default function DonatePage() {
  return (
    <>
      <PageHeader
        title="Fund kits"
        lede="A two-dose Narcan kit costs roughly $45 wholesale. That is the entire unit of what we do — so that is how we ask."
      />

      <section className="border-b border-[var(--rule-strong)]">
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <ul className="grid gap-px border border-[var(--rule-strong)] bg-[var(--rule-strong)] lg:grid-cols-3">
            {TIERS.map((t) => (
              <li
                key={t.amount}
                className={t.featured ? "bg-red text-paper on-red" : "bg-paper"}
              >
                <div className="flex h-full flex-col p-8 lg:p-10">
                  <p className="tabular display text-[clamp(2.6rem,5vw,3.8rem)]">
                    ${t.amount}
                  </p>
                  <p
                    className={`display-tight mt-4 text-[1.4rem] ${
                      t.featured ? "text-paper" : "text-red"
                    }`}
                  >
                    {t.kits} {t.kits === 1 ? "kit" : "kits"}
                  </p>
                  <p
                    className={`mt-3 text-[0.9375rem] leading-relaxed ${
                      t.featured ? "text-paper-on-red" : "text-ink-soft"
                    }`}
                  >
                    {t.note}
                  </p>
                  <button
                    type="button"
                    className={`
                      mt-8 w-full border px-6 py-4 transition-colors duration-200
                      ${
                        t.featured
                          ? "border-paper bg-paper text-ink hover:bg-blush"
                          : "border-ink hover:border-red hover:bg-red hover:text-paper"
                      }
                    `}
                  >
                    <span className="label">Give ${t.amount}</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Givebutter stays the processor; this is where its embed mounts. */}
          <div className="mt-14 border border-dashed border-slate/50 px-8 py-14 text-center">
            <p className="label text-slate">Placeholder</p>
            <p className="display-tight mt-4 text-[clamp(1.3rem,2.4vw,1.7rem)]">
              Givebutter checkout mounts here
            </p>
            <p className="measure mx-auto mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
              Donations stay with Givebutter, which handles receipts and tax
              acknowledgment. In the built site its transactions sync into our
              own database so the totals on this site are live rather than
              hardcoded.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--rule-strong)] bg-paper-deep">
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <h2 className="display text-[clamp(1.8rem,3.4vw,2.6rem)]">
            Other ways to give
          </h2>
          <dl className="mt-12 grid gap-px border border-[var(--rule-strong)] bg-[var(--rule-strong)] sm:grid-cols-2">
            <div className="bg-paper-deep p-8 lg:p-10">
              <dt className="flex items-center gap-3">
                <Phone className="h-[1.3rem] w-[1.3rem] text-red" />
                <span className="display-tight text-[1.4rem]">By phone</span>
              </dt>
              <dd className="mt-4">
                <a
                  href={org.phoneHref}
                  className="tabular text-[1.1rem] underline decoration-[var(--rule-strong)] transition-colors hover:text-red hover:decoration-red"
                >
                  {org.phone}
                </a>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  Speak to someone directly. Every donation counts.
                </p>
              </dd>
            </div>
            <div className="bg-paper-deep p-8 lg:p-10">
              <dt className="flex items-center gap-3">
                <Pin className="h-[1.3rem] w-[1.3rem] text-red" />
                <span className="display-tight text-[1.4rem]">In person</span>
              </dt>
              <dd className="mt-4">
                <p className="text-[1.1rem]">
                  {org.address.city}, {org.address.state} {org.address.zip}
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  A drop-off location is being arranged.
                </p>
              </dd>
            </div>
          </dl>

          <p className="mt-10 flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink-soft">
            <Check className="mt-0.5 h-[1.15rem] w-[1.15rem] shrink-0 text-red" />
            <span>
              {org.name} is a registered {org.status} nonprofit, EIN{" "}
              <span className="tabular">{org.ein}</span>. Donations are tax
              deductible to the extent allowed by law.
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
