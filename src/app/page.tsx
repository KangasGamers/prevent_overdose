import Link from "next/link";
import { Doors } from "@/components/doors";
import { DonationTracker } from "@/components/donation-tracker";
import { Watermark } from "@/components/watermark";
import { TrendChart } from "@/components/trend-chart";
import { ArrowRight, NasalSpray, Users, Shield, Clock, Pin } from "@/components/icons";
import { org, articles, events, responseSteps } from "@/lib/site";
import {
  nationalTrend,
  connecticutTrend,
  ctStats,
  cdcAttribution,
  orgMetrics,
} from "@/lib/stats";

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only">
        PreventOverdose — free Narcan and harm reduction training in Connecticut
      </h1>

      {/* The fork. Three audiences, three states, no single hero. */}
      <Doors />

      {/* Live giving progress, in kits. Real Givebutter data or nothing. */}
      <DonationTracker />

      {/* The mission, in its own field. */}
      <section className="relative isolate overflow-hidden border-y border-[var(--rule-strong)] bg-ink text-paper">
        <Watermark rows={7} className="text-paper opacity-[0.06]" />
        <div className="relative mx-auto max-w-[62rem] px-5 py-20 lg:px-8 lg:py-28">
          <p className="display text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.06]">
            {org.mission}
          </p>
          <p className="mt-8 text-[1.0625rem] text-paper-on-ink">{org.tagline}</p>
        </div>
      </section>

      {/* The argument: deaths are falling, and naloxone is named as part of why. */}
      <section className="border-b border-[var(--rule-strong)]">
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <div className="max-w-[46rem]">
            <h2 className="display text-[clamp(2rem,4.6vw,3.4rem)]">
              This is working
            </h2>
            <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-ink-soft">
              Overdose deaths in the United States have fallen for three
              consecutive years. Among the reasons the CDC names for that
              decline is{" "}
              <strong className="font-semibold text-ink">
                &ldquo;{cdcAttribution.quote}&rdquo;
              </strong>{" "}
              — putting the reversal medication into the hands of the people
              most likely to witness an overdose. That is the entire premise of
              this organization.
            </p>
          </div>

          <div className="mt-16 grid gap-14 border-t border-[var(--rule-strong)] pt-14 lg:grid-cols-2 lg:gap-20">
            <TrendChart
              data={nationalTrend}
              title="United States"
              caption="Total drug overdose deaths, 2022 through 2025. The 2025 figure is provisional."
              source="CDC / National Center for Health Statistics"
              sourceHref={cdcAttribution.sourceHref}
              peakLabel="fewer deaths in 2025 than in 2022"
            />
            <TrendChart
              data={connecticutTrend}
              title="Connecticut"
              caption="Confirmed overdose deaths statewide. Fentanyl was involved in 78% of 2024 drug intoxication deaths."
              source="CT Office of the Chief Medical Examiner"
              sourceHref={ctStats[0].sourceHref}
              peakLabel="fewer deaths in 2024 than in 2023"
            />
          </div>

          <p className="measure mt-14 border-l-[3px] border-red pl-5 text-[0.9375rem] leading-relaxed text-ink-soft">
            Every figure on this page is published by the CDC or the Connecticut
            Office of the Chief Medical Examiner and links to its source. We
            publish no impact numbers of our own until we have earned them.
          </p>
        </div>
      </section>

      {/* What the organization actually does. A ruled index, not a card grid. */}
      <section className="border-b border-[var(--rule-strong)] bg-paper-deep">
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <h2 className="display text-[clamp(2rem,4.6vw,3.4rem)]">
            What we do
          </h2>

          <ul className="mt-14 border-t border-[var(--rule-strong)]">
            {[
              {
                Icon: NasalSpray,
                title: "Free Narcan",
                body:
                  "Nasal naloxone kits at no cost, with no ID and no questions asked. Narcan reverses an opioid overdose in two to three minutes and cannot harm someone who is not overdosing.",
                href: "/get-narcan",
                cta: "Request a kit",
              },
              {
                Icon: Users,
                title: "Training",
                body:
                  "Free sessions for schools, workplaces, and community groups in the Farmington Valley. Recognize an overdose, give a dose, keep someone breathing until help arrives.",
                href: "/events",
                cta: "See upcoming sessions",
              },
              {
                Icon: Shield,
                title: "Advocacy",
                body:
                  "Supporting policy that expands naloxone access and treatment, and reducing the stigma that stops people from carrying it in the first place.",
                href: "/about",
                cta: "Read our position",
              },
            ].map(({ Icon, title, body, href, cta }) => (
              <li key={title} className="border-b border-[var(--rule-strong)]">
                <Link
                  href={href}
                  className="group grid items-start gap-x-8 gap-y-4 py-10 md:grid-cols-[auto_16rem_1fr_auto] md:py-12"
                >
                  <Icon className="h-8 w-8 shrink-0 text-red" />
                  <h3 className="display-tight text-[clamp(1.6rem,2.6vw,2.1rem)]">
                    {title}
                  </h3>
                  <p className="measure text-[1rem] leading-relaxed text-ink-soft">
                    {body}
                  </p>
                  <span className="flex items-center gap-2 text-red md:pt-2">
                    <span className="label">{cta}</span>
                    <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The five steps — the losing composition's content, in its proper place.
          Rendered as a full red field: it is the page's most consequential
          content and must not be the quietest band on it. */}
      <section className="relative isolate overflow-hidden border-b border-[var(--rule-strong)] bg-red text-paper on-red">
        <Watermark rows={9} className="text-paper opacity-[0.08]" />
        <div className="relative mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[22rem_1fr] lg:gap-20">
            <div>
              <h2 className="display text-[clamp(2rem,4.6vw,3.4rem)]">
                If it happens
              </h2>
              <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-paper-on-red">
                Five steps. Learn them before you need them.
              </p>
              <Link
                href="/get-narcan"
                className="group mt-8 inline-flex items-center gap-2.5 bg-paper px-6 py-4 text-ink transition-colors duration-200 hover:bg-blush"
              >
                <span className="label">Get a free kit</span>
                <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
              </Link>
            </div>

            <ol className="border-t border-[var(--rule-on-red)]">
              {responseSteps.map((step, i) => (
                <li
                  key={step.action}
                  className="grid gap-x-6 gap-y-2 border-b border-[var(--rule-on-red)] py-7 sm:grid-cols-[3rem_11rem_1fr]"
                >
                  <span className="tabular text-[0.8125rem] font-semibold text-paper">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-tight text-[1.3rem]">{step.action}</h3>
                  <p className="measure text-[0.9375rem] leading-relaxed text-paper-on-red">
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Where the org actually stands. Honest zeros, designed as such. */}
      <section className="border-b border-[var(--rule-strong)] bg-paper-deep">
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <div className="max-w-[46rem]">
            <h2 className="display text-[clamp(2rem,4.6vw,3.4rem)]">
              Where we stand
            </h2>
            <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-ink-soft">
              We launched recently and we are not going to pretend otherwise.
              This is the whole picture, updated as it changes.
            </p>
          </div>

          <dl className="mt-14 border-t border-[var(--rule-strong)]">
            {orgMetrics.map((m) => (
              <div
                key={m.id}
                className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-[var(--rule-strong)] py-7"
              >
                <dt className="display-tight text-[clamp(1.3rem,2.2vw,1.7rem)]">
                  {m.label}
                </dt>
                <dd className="flex items-baseline gap-5">
                  {"known" in m ? (
                    <span className="tabular display-tight text-[clamp(1.6rem,2.8vw,2.2rem)] text-red">
                      {m.known}
                    </span>
                  ) : (
                    <span
                      className="border border-dashed border-slate/50 px-3 py-1 text-[0.8125rem] text-slate"
                      title="No verified figure yet"
                    >
                      Not yet reported
                    </span>
                  )}
                  <span className="w-[13rem] text-right text-[0.875rem] text-slate">
                    {m.note}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/board"
            className="group mt-10 inline-flex items-center gap-2.5 text-red"
          >
            <span className="label">Five board seats are open</span>
            <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
          </Link>
        </div>
      </section>

      {/* Events — one real event with a genuinely undecided date. */}
      <section className="border-b border-[var(--rule-strong)]">
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display text-[clamp(2rem,4.6vw,3.4rem)]">
              Upcoming
            </h2>
            <Link href="/events" className="group flex items-center gap-2 text-red">
              <span className="label">All events</span>
              <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
            </Link>
          </div>

          <ul className="mt-12 border-t border-[var(--rule-strong)]">
            {events.map((ev) => (
              <li key={ev.slug} className="border-b border-[var(--rule-strong)]">
                <div className="grid gap-x-8 gap-y-5 py-10 md:grid-cols-[1fr_auto] md:py-12">
                  <div>
                    <h3 className="display-tight text-[clamp(1.8rem,3vw,2.5rem)]">
                      {ev.title}
                    </h3>
                    <p className="measure mt-4 text-[1rem] leading-relaxed text-ink-soft">
                      {ev.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-[0.9375rem]">
                      <span className="flex items-center gap-2.5">
                        <Clock className="h-[1.15rem] w-[1.15rem] text-red" />
                        {ev.startsAt ? (
                          <span className="tabular">{ev.startsAt}</span>
                        ) : (
                          <span className="text-slate">
                            Date to be announced
                          </span>
                        )}
                      </span>
                      <span className="flex items-center gap-2.5">
                        <Pin className="h-[1.15rem] w-[1.15rem] text-red" />
                        <span>{ev.locationName}</span>
                      </span>
                    </div>
                  </div>

                  <div className="md:self-center">
                    <Link
                      href={`/events/${ev.slug}`}
                      className="group inline-flex items-center gap-2.5 border border-ink px-6 py-4 transition-colors duration-200 hover:border-red hover:bg-red hover:text-paper"
                    >
                      <span className="label">Tell me when it&rsquo;s set</span>
                      <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Articles */}
      <section className="border-b border-[var(--rule-strong)] bg-paper-deep">
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display text-[clamp(2rem,4.6vw,3.4rem)]">Read</h2>
            <Link href="/news" className="group flex items-center gap-2 text-red">
              <span className="label">All writing</span>
              <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
            </Link>
          </div>

          <ul className="mt-12 grid gap-px border border-[var(--rule-strong)] bg-[var(--rule-strong)] sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((a) => (
              <li key={a.slug} className="bg-paper-deep">
                <Link
                  href={`/news/${a.slug}`}
                  className="group flex h-full flex-col p-8 transition-colors duration-200 hover:bg-paper"
                >
                  <h3 className="display-tight text-[clamp(1.35rem,2.2vw,1.65rem)]">
                    {a.title}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {a.summary}
                  </p>
                  <span className="tabular mt-auto pt-8 text-[0.8125rem] text-slate">
                    {a.readingTime}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Close */}
      <section className="relative isolate overflow-hidden bg-red text-paper on-red">
        <Watermark rows={9} className="text-paper opacity-[0.08]" />
        <div className="relative mx-auto max-w-[90rem] px-5 py-24 lg:px-8 lg:py-32">
          <h2 className="display max-w-[20ch] text-[clamp(2.4rem,6vw,4.8rem)]">
            Carry it before you need it
          </h2>
          <p className="measure mt-8 text-[1.0625rem] leading-relaxed text-paper-on-red">
            Most overdoses are witnessed by someone who could have helped. A kit
            in a glovebox, a backpack, or a desk drawer is the difference between
            witnessing one and reversing one.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/get-narcan"
              className="group inline-flex items-center gap-2.5 bg-paper px-7 py-4.5 text-ink transition-colors duration-200 hover:bg-blush"
            >
              <span className="label">Get a free kit</span>
              <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
            </Link>
            <Link
              href="/donate"
              className="group inline-flex items-center gap-2.5 border border-paper/45 px-7 py-4.5 transition-colors duration-200 hover:border-paper hover:bg-paper/10"
            >
              <span className="label">Fund kits</span>
              <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
