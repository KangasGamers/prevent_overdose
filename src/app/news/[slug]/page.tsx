import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "@/components/icons";
import { articles } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  return { title: a?.title ?? "Article", description: a?.summary };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const others = articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="border-b border-[var(--rule-strong)]">
          <div className="mx-auto max-w-[52rem] px-5 py-20 lg:px-8 lg:py-28">
            <Link
              href="/news"
              className="label text-red transition-colors hover:text-red-deep"
            >
              ← All writing
            </Link>
            <h1 className="display mt-8 text-[clamp(2.2rem,5.5vw,4rem)]">
              {article.title}
            </h1>
            <p className="tabular mt-8 text-[0.875rem] text-slate">
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              · {article.readingTime}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-[52rem] px-5 py-16 lg:px-8 lg:py-20">
          <p className="text-[1.25rem] leading-relaxed text-ink">
            {article.summary}
          </p>

          <div className="mt-12 border border-dashed border-slate/50 px-6 py-8">
            <p className="label text-slate">Placeholder</p>
            <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
              The full body of this article lives on the current Wix site and
              has not been migrated yet. In the built site these become MDX
              files in the repository, so the typography above is the real
              article treatment — only the words below the lede are missing.
            </p>
          </div>
        </div>
      </article>

      <section className="border-t border-[var(--rule-strong)] bg-paper-deep">
        <div className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8 lg:py-20">
          <h2 className="display text-[clamp(1.6rem,3vw,2.2rem)]">Keep reading</h2>
          <ul className="mt-10 grid gap-px border border-[var(--rule-strong)] bg-[var(--rule-strong)] sm:grid-cols-2">
            {others.map((a) => (
              <li key={a.slug} className="bg-paper-deep">
                <Link
                  href={`/news/${a.slug}`}
                  className="group flex h-full flex-col p-8 transition-colors duration-200 hover:bg-paper"
                >
                  <h3 className="display-tight text-[1.4rem]">{a.title}</h3>
                  <span className="mt-auto flex items-center gap-2 pt-8 text-red">
                    <span className="label">Read</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
