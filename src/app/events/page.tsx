import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ArrowRight, Clock, Pin } from "@/components/icons";
import { events } from "@/lib/site";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <>
      <PageHeader
        title="Events & training"
        lede="Free Narcan training sessions and community events across the Farmington Valley. Everyone who attends a training leaves with a kit."
      />

      <section className="border-b border-[var(--rule-strong)]">
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <h2 className="display text-[clamp(1.8rem,3.4vw,2.6rem)]">Scheduled</h2>

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
                      href={`/events/${ev.slug}`}
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

      {/* Honest empty state rather than filler sessions. */}
      <section className="border-b border-[var(--rule-strong)] bg-paper-deep">
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <h2 className="display text-[clamp(1.8rem,3.4vw,2.6rem)]">
            Training sessions
          </h2>
          <div className="mt-12 border border-dashed border-slate/50 px-8 py-16 text-center">
            <p className="display-tight text-[clamp(1.4rem,2.6vw,1.9rem)] text-ink">
              No sessions on the calendar yet
            </p>
            <p className="measure mx-auto mt-5 text-[1rem] leading-relaxed text-ink-soft">
              The curriculum is in development. If you want a session at your
              school, workplace, or community group, tell us and we will build
              the first one around you.
            </p>
            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-2.5 border border-red bg-red px-7 py-4 text-paper transition-colors duration-200 hover:bg-red-deep hover:border-red-deep"
            >
              <span className="label">Request a training</span>
              <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
