import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { KitRequestForm } from "@/components/kit-request-form";
import { ArrowRight, Phone, Mail, Shield, Clock } from "@/components/icons";
import { org, responseSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get free Narcan",
  description:
    "Free nasal naloxone kits in Avon and the Farmington Valley. No cost, no ID, no questions.",
};

export default function GetNarcanPage() {
  return (
    <>
      <PageHeader
        title="Get free Narcan"
        lede="No cost. No ID. No questions. Narcan reverses an opioid overdose in two to three minutes, and it cannot harm someone who is not overdosing — which is why you should carry it before you think you need it."
      />

      {/* Emergency first. Anyone landing here mid-crisis needs this above all. */}
      <section className="border-b border-[var(--rule-strong)] bg-ink text-paper">
        <div className="mx-auto flex max-w-[90rem] flex-wrap items-center gap-x-10 gap-y-4 px-5 py-7 lg:px-8">
          <p className="display-tight text-[1.4rem]">
            If someone is not breathing, call 911 now
          </p>
          <p className="text-[0.9375rem] text-paper-on-ink">
            Connecticut&rsquo;s Good Samaritan law protects you from arrest for
            drug possession when you call for help at an overdose.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--rule-strong)]">
        <div className="mx-auto grid max-w-[90rem] gap-16 px-5 py-20 lg:grid-cols-[1fr_26rem] lg:gap-24 lg:px-8 lg:py-28">
          <div>
            <h2 className="display text-[clamp(2rem,4.6vw,3.2rem)]">
              Three ways to get one
            </h2>

            <ol className="mt-12 border-t border-[var(--rule-strong)]">
              {[
                {
                  title: "Request one here",
                  body: "Fill in the form and we will arrange a pickup or a mailed kit. We ask for as little as we can and we never share it.",
                },
                {
                  title: "Call us",
                  body: `Speak to a person at ${org.phone}. If you would rather not put anything in writing, this is the way.`,
                },
                {
                  title: "Come to a training",
                  body: "Every attendee leaves with a kit and knows how to use it. Sessions are free and open to anyone.",
                },
              ].map((m, i) => (
                <li
                  key={m.title}
                  className="grid gap-x-6 gap-y-2 border-b border-[var(--rule-strong)] py-8 sm:grid-cols-[3rem_1fr]"
                >
                  <span className="tabular text-[0.8125rem] font-semibold text-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="display-tight text-[1.5rem]">{m.title}</h3>
                    <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                      {m.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href={org.phoneHref}
                className="group inline-flex items-center gap-2.5 border border-ink px-6 py-4 transition-colors duration-200 hover:border-red hover:bg-red hover:text-paper"
              >
                <Phone className="h-[1.15rem] w-[1.15rem]" />
                <span className="tabular label">{org.phone}</span>
              </a>
              <a
                href={`mailto:${org.email}`}
                className="group inline-flex items-center gap-2.5 border border-ink px-6 py-4 transition-colors duration-200 hover:border-red hover:bg-red hover:text-paper"
              >
                <Mail className="h-[1.15rem] w-[1.15rem]" />
                <span className="label">Email us</span>
              </a>
            </div>
          </div>

          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <KitRequestForm />
          </div>
        </div>
      </section>

      {/* How to use it */}
      <section className="border-b border-[var(--rule-strong)] bg-paper-deep">
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <h2 className="display text-[clamp(2rem,4.6vw,3.2rem)]">
            How to use it
          </h2>
          <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-ink-soft">
            Five steps. There is no way to do harm by trying — naloxone has no
            effect on someone who has not taken opioids.
          </p>

          <ol className="mt-14 border-t border-[var(--rule-strong)]">
            {responseSteps.map((step, i) => (
              <li
                key={step.action}
                className="grid gap-x-8 gap-y-3 border-b border-[var(--rule-strong)] py-9 md:grid-cols-[4rem_14rem_1fr]"
              >
                <span className="tabular text-[0.8125rem] font-semibold text-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display-tight text-[clamp(1.4rem,2.4vw,1.9rem)]">
                  {step.action}
                </h3>
                <p className="measure text-[1rem] leading-relaxed text-ink-soft">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-wrap items-start gap-4 border-l-[3px] border-red pl-5">
            <Shield className="mt-0.5 h-[1.3rem] w-[1.3rem] shrink-0 text-red" />
            <p className="measure text-[0.9375rem] leading-relaxed text-ink-soft">
              Naloxone wears off before many opioids do. A person can start to
              overdose again after they wake up, which is why you stay and why
              you still call 911.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-red text-paper on-red">
        <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-8 px-5 py-16 lg:px-8 lg:py-20">
          <h2 className="display max-w-[16ch] text-[clamp(1.8rem,4vw,3rem)]">
            Bring a training to your school or workplace
          </h2>
          <Link
            href="/events"
            className="group inline-flex items-center gap-2.5 bg-paper px-7 py-4.5 text-ink transition-colors duration-200 hover:bg-blush"
          >
            <Clock className="h-[1.15rem] w-[1.15rem]" />
            <span className="label">See sessions</span>
            <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
