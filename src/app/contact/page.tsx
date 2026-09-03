import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, Pin } from "@/components/icons";
import { org } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in touch"
        lede="Questions, partnerships, press, or a training request — this reaches a person, not a queue."
      />

      <section className="border-b border-[var(--rule-strong)]">
        <div className="mx-auto grid max-w-[90rem] gap-16 px-5 py-20 lg:grid-cols-[1fr_28rem] lg:gap-24 lg:px-8 lg:py-28">
          <div>
            <h2 className="display text-[clamp(1.8rem,3.4vw,2.6rem)]">
              Reach us directly
            </h2>
            <dl className="mt-12 border-t border-[var(--rule-strong)]">
              {[
                { Icon: Mail, term: "Email", val: org.email, href: `mailto:${org.email}` },
                { Icon: Phone, term: "Phone", val: org.phone, href: org.phoneHref },
                {
                  Icon: Pin,
                  term: "Address",
                  val: `${org.address.city}, ${org.address.state} ${org.address.zip}`,
                },
              ].map(({ Icon, term, val, href }) => (
                <div key={term} className="flex flex-wrap items-baseline gap-x-8 gap-y-2 border-b border-[var(--rule-strong)] py-7">
                  <dt className="flex w-[7rem] shrink-0 items-center gap-2.5 text-slate">
                    <Icon className="h-[1.15rem] w-[1.15rem] text-red" />
                    <span className="label">{term}</span>
                  </dt>
                  <dd className="display-tight text-[clamp(1.1rem,2vw,1.5rem)]">
                    {href ? (
                      <a href={href} className="underline decoration-[var(--rule-strong)] transition-colors hover:text-red hover:decoration-red">
                        {val}
                      </a>
                    ) : val}
                  </dd>
                </div>
              ))}
              <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2 border-b border-[var(--rule-strong)] py-7">
                <dt className="w-[7rem] shrink-0 label text-slate">EIN</dt>
                <dd className="tabular display-tight text-[1.3rem]">{org.ein}</dd>
              </div>
            </dl>
          </div>

          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
