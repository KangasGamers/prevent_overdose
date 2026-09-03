import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ArrowRight } from "@/components/icons";
import { articles } from "@/lib/site";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return (
    <>
      <PageHeader
        title="Writing"
        lede="What we are learning about the overdose crisis, the medication that reverses it, and the policy around both."
      />
      <section className="border-b border-[var(--rule-strong)]">
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <ul className="border-t border-[var(--rule-strong)]">
            {articles.map((a) => (
              <li key={a.slug} className="border-b border-[var(--rule-strong)]">
                <Link
                  href={`/news/${a.slug}`}
                  className="group grid gap-x-10 gap-y-4 py-10 md:grid-cols-[1fr_auto] md:py-12"
                >
                  <div>
                    <h2 className="display-tight text-[clamp(1.6rem,3vw,2.3rem)]">
                      {a.title}
                    </h2>
                    <p className="measure mt-4 text-[1rem] leading-relaxed text-ink-soft">
                      {a.summary}
                    </p>
                    <p className="tabular mt-5 text-[0.8125rem] text-slate">
                      {new Date(a.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      · {a.readingTime}
                    </p>
                  </div>
                  <ArrowRight className="hidden h-6 w-6 text-red transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5 md:block md:self-center" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
