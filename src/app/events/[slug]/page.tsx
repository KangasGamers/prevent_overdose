import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Clock, Pin } from "@/components/icons";
import { events } from "@/lib/site";
import { EventNotifyForm } from "@/components/event-notify-form";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = events.find((x) => x.slug === slug);
  return { title: e?.title ?? "Event", description: e?.description };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ev = events.find((e) => e.slug === slug);
  if (!ev) notFound();

  return (
    <section>
      <div className="mx-auto grid max-w-[90rem] gap-16 px-5 py-20 lg:grid-cols-[1fr_24rem] lg:gap-24 lg:px-8 lg:py-28">
        <div>
          <Link
            href="/events"
            className="label text-red transition-colors hover:text-red-deep"
          >
            ← All events
          </Link>
          <h1 className="display mt-8 text-[clamp(2.4rem,6vw,4.5rem)]">
            {ev.title}
          </h1>
          <p className="measure mt-8 text-[1.125rem] leading-relaxed text-ink-soft">
            {ev.description}
          </p>

          <dl className="mt-12 border-t border-[var(--rule-strong)]">
            <div className="flex items-baseline gap-6 border-b border-[var(--rule-strong)] py-6">
              <dt className="flex w-[9rem] shrink-0 items-center gap-2.5 text-slate">
                <Clock className="h-[1.15rem] w-[1.15rem] text-red" />
                <span className="label">When</span>
              </dt>
              <dd className="display-tight text-[1.35rem]">
                {ev.startsAt ?? "To be announced"}
              </dd>
            </div>
            <div className="flex items-baseline gap-6 border-b border-[var(--rule-strong)] py-6">
              <dt className="flex w-[9rem] shrink-0 items-center gap-2.5 text-slate">
                <Pin className="h-[1.15rem] w-[1.15rem] text-red" />
                <span className="label">Where</span>
              </dt>
              <dd className="display-tight text-[1.35rem]">{ev.locationAddr}</dd>
            </div>
          </dl>
        </div>

        <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <EventNotifyForm eventTitle={ev.title} />
        </div>
      </div>
    </section>
  );
}
