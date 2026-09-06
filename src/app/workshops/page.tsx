import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ArrowRight, Clock, Pin } from "@/components/icons";
import { WorkshopList } from "@/components/workshop-list";
import { WorkshopHostForm } from "@/components/workshop-host-form";
import { workshops, events } from "@/lib/site";
import { getWorkshopCounts } from "@/lib/db";

export const metadata: Metadata = {
  title: "Workshops",
  description:
    "Register for a free in-person Narcan workshop, or ask us to bring one to your school, workplace, or community group. Everyone who attends leaves with a kit.",
};

// Registration counts change with each signup — keep the page fresh, cheaply.
export const revalidate = 30;

export default async function WorkshopsPage() {
  const counts = await getWorkshopCounts();
  return (
    <>
      <PageHeader
        title="Workshops"
        lede="Free, in-person Narcan training, run nationwide. Register for an upcoming session, or ask us to bring one to your group. Everyone who attends leaves with a two-dose kit."
      />

      <section className="border-b border-[var(--rule-strong)]">
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <h2 className="display text-[clamp(1.8rem,3.4vw,2.6rem)]">
            Upcoming workshops
          </h2>

          {workshops.length > 0 ? (
            <WorkshopList workshops={workshops} counts={counts} />
          ) : (
            <div className="mt-12 border border-dashed border-slate/50 px-8 py-16 text-center">
              <p className="display-tight text-[clamp(1.4rem,2.6vw,1.9rem)] text-ink">
                No sessions on the calendar yet
              </p>
              <p className="measure mx-auto mt-5 text-[1rem] leading-relaxed text-ink-soft">
                We&rsquo;re scheduling the first public workshops now. Ask us to
                bring one to your group and we&rsquo;ll build it around you.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="border-b border-[var(--rule-strong)] bg-paper-deep">
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-x-20 gap-y-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="display text-[clamp(2rem,4.6vw,3.2rem)]">
                Bring one to your group
              </h2>
              <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-ink-soft">
                We run the same training anywhere in the country &mdash;
                classrooms, break rooms, locker rooms, church basements. We&rsquo;re
                based in Connecticut and starting our public sessions in Tampa,
                but distance isn&rsquo;t the deciding factor; the group is. A
                session runs about 90 minutes, there&rsquo;s no cost, and every
                attendee goes home with naloxone and the knowledge to use it.
              </p>
              <ul className="mt-8 border-t border-[var(--rule-strong)] text-[0.9375rem]">
                {[
                  "You provide the room and gather the group",
                  "We bring a trainer, the curriculum, and the kits",
                  "Works for 8 people or 80",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-baseline gap-4 border-b border-[var(--rule-strong)] py-4"
                  >
                    <span className="text-red">&mdash;</span>
                    <span className="text-ink-soft">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pt-2">
              <WorkshopHostForm />
            </div>
          </div>
        </div>
      </section>

      {events.length > 0 && (
        <section className="border-b border-[var(--rule-strong)]">
          <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
            <h2 className="display text-[clamp(1.8rem,3.4vw,2.6rem)]">
              Community events
            </h2>
            <ul className="mt-12 border-t border-[var(--rule-strong)]">
              {events.map((ev) => (
                <li key={ev.slug} className="border-b border-[var(--rule-strong)]">
                  <div className="grid gap-x-10 gap-y-6 py-10 md:grid-cols-[1fr_auto] md:py-14">
                    <div>
                      <h3 className="display-tight text-[clamp(1.9rem,3.4vw,2.8rem)]">
                        {ev.title}
                      </h3>
                      <p className="measure mt-5 text-[1rem] leading-relaxed text-ink-soft">
                        {ev.description}
                      </p>
                      <div className="mt-7 flex flex-wrap gap-x-10 gap-y-3 text-[0.9375rem]">
                        <span className="flex items-center gap-2.5">
                          <Clock className="h-[1.15rem] w-[1.15rem] text-red" />
                          {ev.startsAt ? (
                            <span className="tabular">{ev.startsAt}</span>
                          ) : (
                            <span className="text-slate">Date to be announced</span>
                          )}
                        </span>
                        <span className="flex items-center gap-2.5">
                          <Pin className="h-[1.15rem] w-[1.15rem] text-red" />
                          {ev.locationAddr}
                        </span>
                      </div>
                    </div>
                    <div className="md:self-center">
                      <Link
                        href={`/workshops/${ev.slug}`}
                        className="group inline-flex items-center gap-2.5 border border-ink px-6 py-4 transition-colors duration-200 hover:border-red hover:bg-red hover:text-paper"
                      >
                        <span className="label">Notify me</span>
                        <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
