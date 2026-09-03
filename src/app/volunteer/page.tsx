import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { VolunteerForm } from "@/components/volunteer-form";
import { Heart, Users, NasalSpray } from "@/components/icons";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Give time, fund kits, or host a training.",
};

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        title="Help"
        lede="We are small, new, and entirely powered by people who decided this mattered. There is more to do than there are hands to do it."
      />

      <section className="border-b border-[var(--rule-strong)]">
        <div className="mx-auto grid max-w-[90rem] gap-16 px-5 py-20 lg:grid-cols-[1fr_28rem] lg:gap-24 lg:px-8 lg:py-28">
          <div>
            <h2 className="display text-[clamp(2rem,4.6vw,3.2rem)]">
              Three ways in
            </h2>

            <ul className="mt-12 border-t border-[var(--rule-strong)]">
              {[
                {
                  Icon: Users,
                  title: "Give time",
                  body: "Staff a distribution table, help run a training, or take on the administrative work that keeps a nonprofit legal and funded.",
                },
                {
                  Icon: NasalSpray,
                  title: "Fund kits",
                  body: "A two-dose Narcan kit costs roughly $45 wholesale. Every dollar donated goes toward kits and the events that put them in hands.",
                },
                {
                  Icon: Heart,
                  title: "Host a training",
                  body: "If you can offer a room and an audience — a school, a workplace, a church, a club — we will bring the session and the kits.",
                },
              ].map(({ Icon, title, body }) => (
                <li
                  key={title}
                  className="grid gap-x-6 gap-y-3 border-b border-[var(--rule-strong)] py-9 sm:grid-cols-[3rem_1fr]"
                >
                  <Icon className="h-7 w-7 text-red" />
                  <div>
                    <h3 className="display-tight text-[1.5rem]">{title}</h3>
                    <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <VolunteerForm />
          </div>
        </div>
      </section>
    </>
  );
}
