"use client";

import { useId, useState } from "react";

export type TrendPoint = { year: string; deaths: number };

/**
 * Single-series column chart. One series means no legend (the title names it)
 * and no categorical palette — red carries the data, gray stays recessive on the
 * baseline. Values are direct-labeled and the y-axis is dropped entirely: with
 * four columns, the axis would be redundant furniture.
 */
export function TrendChart({
  data,
  title,
  caption,
  source,
  sourceHref,
  peakLabel,
}: {
  data: TrendPoint[];
  title: string;
  caption: string;
  source: string;
  sourceHref: string;
  peakLabel?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const tableId = useId();
  const max = Math.max(...data.map((d) => d.deaths));
  const first = data[0].deaths;
  const last = data[data.length - 1].deaths;
  // The label already says "fewer"; a negative sign here would double the negative.
  const pctChange = Math.abs(Math.round(((last - first) / first) * 100));

  return (
    <figure className="m-0">
      <figcaption className="mb-1">
        <h3 className="display-tight text-[clamp(1.35rem,2.2vw,1.75rem)]">
          {title}
        </h3>
        <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
          {caption}
        </p>
      </figcaption>

      <div
        className="mt-8 flex h-[15rem] items-end justify-start gap-[2px] sm:h-[17rem]"
        role="img"
        aria-describedby={tableId}
      >
        {data.map((d, i) => {
          const h = (d.deaths / max) * 100;
          const isHover = hover === i;
          const isLast = i === data.length - 1;
          return (
            <div
              key={d.year}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="group relative flex h-full max-w-[8.5rem] flex-1 cursor-default flex-col justify-end"
            >
              {/* value, direct-labeled */}
              <span
                className={`
                  tabular mb-2 block text-center text-[0.8125rem] font-semibold
                  transition-colors duration-200
                  ${isHover || isLast ? "text-red" : "text-ink-soft"}
                `}
              >
                {d.deaths.toLocaleString()}
              </span>

              <div
                style={{ height: `${h}%` }}
                className={`
                  w-full rounded-t-[4px] transition-colors duration-200
                  ${isLast ? "bg-red" : "bg-blush-deep"}
                  ${isHover ? "!bg-red-deep" : ""}
                `}
              />

              <span
                className={`
                  tabular mt-3 block border-t pt-2.5 text-center text-[0.8125rem]
                  transition-colors duration-200
                  ${isHover ? "border-red text-red" : "border-[var(--rule-strong)] text-slate"}
                `}
              >
                {d.year}
              </span>
            </div>
          );
        })}
      </div>

      {peakLabel && (
        <p className="tabular mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.9375rem]">
          <span className="display-tight text-[1.9rem] text-red">
            {pctChange}%
          </span>
          <span className="text-ink-soft">{peakLabel}</span>
        </p>
      )}

      {/* Table view: identity and values never depend on the mark alone. */}
      <details className="mt-6 border-t border-[var(--rule)] pt-4">
        <summary className="label cursor-pointer text-slate transition-colors hover:text-red">
          View as table
        </summary>
        <table id={tableId} className="tabular mt-4 w-full text-[0.875rem]">
          <caption className="sr-only">{title}</caption>
          <thead>
            <tr className="border-b border-[var(--rule-strong)] text-left">
              <th scope="col" className="py-2 font-semibold">
                Year
              </th>
              <th scope="col" className="py-2 text-right font-semibold">
                Deaths
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.year} className="border-b border-[var(--rule)]">
                <th scope="row" className="py-2 font-normal">
                  {d.year}
                </th>
                <td className="py-2 text-right">{d.deaths.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>

      <p className="mt-4 text-[0.8125rem] text-slate">
        Source:{" "}
        <a
          href={sourceHref}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-[var(--rule-strong)] transition-colors hover:text-red hover:decoration-red"
        >
          {source}
        </a>
      </p>
    </figure>
  );
}
