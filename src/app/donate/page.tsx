import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { DonateWidget } from "@/components/donate-widget";
import { Phone, Pin, Check } from "@/components/icons";
import { org } from "@/lib/site";

export const metadata: Metadata = {
  title: "Donate",
  description: "Fund Narcan kits. Every dollar goes toward kits and the events that distribute them.",
};

export default function DonatePage() {
  return (
    <>
      <PageHeader
        title="Fund kits"
        lede="A two-dose Narcan kit costs roughly $45 wholesale. That is the entire unit of what we do — so that is how we ask."
      />

      <section className="border-b border-[var(--rule-strong)]">
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <DonateWidget />
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
