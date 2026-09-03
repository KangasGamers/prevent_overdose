import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <>
      <PageHeader
        title="Not here"
        lede="That page doesn't exist. If you were looking for Narcan, the link below is the one you want."
      />
      <section>
        <div className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
          <Link
            href="/get-narcan"
            className="group inline-flex items-center gap-2.5 border border-red bg-red px-7 py-4.5 text-paper transition-colors duration-200 hover:bg-red-deep hover:border-red-deep"
          >
            <span className="label">Get a free kit</span>
            <ArrowRight className="h-[1.15rem] w-[1.15rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
