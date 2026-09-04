"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight, User } from "./icons";
import { Watermark } from "./watermark";
import { boardRoles } from "@/lib/site";

/**
 * The five open board seats as expanding panels — the homepage fork's
 * interaction, reused. Each seat carries a headshot placeholder (dashed: the
 * person isn't appointed yet), the role, and its remit. Hover or keyboard focus
 * widens a panel and recedes its neighbours.
 *
 * When a seat is filled, give its `boardRoles` entry a `name` and `photo` and
 * the placeholder swaps for the real image.
 */
type Seat = { role: string; remit: string; name?: string; photo?: string };

export function BoardSeats() {
  const [active, setActive] = useState<string | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const weightFor = useCallback(
    (id: string) => {
      if (active === null) return 1;
      return active === id ? 2.4 : 0.7;
    },
    [active],
  );

  return (
    <div
      onMouseLeave={() => setActive(null)}
      className="
        relative isolate flex w-full flex-col border-y border-[var(--rule-strong)]
        md:h-[calc(100svh-var(--header-h))] md:min-h-[42rem] md:flex-row
      "
    >
      {(boardRoles as readonly Seat[]).map((seat, i) => {
        const id = seat.role;
        const dimmed = active !== null && active !== id;
        const filled = Boolean(seat.name);

        const handlers = {
          onMouseEnter: () => setActive(id),
          onFocus: () => setActive(id),
          onBlur: () => setActive(null),
        };
        const style = {
          flexGrow: weightFor(id),
          flexBasis: 0,
          transitionDuration: reduced ? "0ms" : "600ms",
        };
        const className = `
          group relative flex min-h-[24rem] min-w-0 flex-col gap-7 overflow-hidden px-6 pb-10 pt-10
          outline-offset-[-3px] transition-[flex-grow,background-color] ease-[var(--ease-out-expo)]
          md:min-h-0 md:px-8
          ${dimmed ? "bg-paper-deep" : "bg-paper"}
          ${i > 0 ? "border-t md:border-l md:border-t-0" : ""}
          border-[var(--rule-strong)]
        `;

        const inner = (
          <>
            <span
              className="door-rise relative z-20 block w-full max-w-[12rem]"
              style={{ animationDelay: reduced ? "0ms" : `${i * 90}ms` }}
            >
              {seat.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={seat.photo}
                  alt={seat.name ?? seat.role}
                  className={`aspect-square w-full object-cover object-top grayscale transition-opacity duration-500 ${
                    dimmed ? "opacity-80" : "opacity-100"
                  }`}
                />
              ) : (
                <span
                  className={`
                    flex aspect-square w-full flex-col items-center justify-center gap-2
                    border border-dashed border-slate/50 text-slate transition-opacity duration-500
                    ${dimmed ? "opacity-70" : "opacity-100"}
                  `}
                >
                  <User className="h-9 w-9" />
                  <span className="label text-[0.625rem]">Photo to come</span>
                </span>
              )}
            </span>

            <span className="relative z-20 flex flex-1 flex-col gap-4">
              <span
                aria-hidden
                className="block h-px w-full origin-left rule-draw bg-[var(--rule-strong)] transition-colors duration-300 group-hover:bg-red group-focus-visible:bg-red"
                style={{ animationDelay: reduced ? "0ms" : `${360 + i * 90}ms` }}
              />

              {seat.name && (
                <span className="label text-slate">{seat.name}</span>
              )}
              <span className="display-tight text-[clamp(1.5rem,2.4vw,2.15rem)]">
                {seat.role}
              </span>

              <span
                className={`
                  measure-tight text-[0.9375rem] leading-relaxed text-ink-soft
                  transition-opacity duration-500 ${dimmed ? "opacity-55" : "opacity-100"}
                `}
              >
                {seat.remit}
              </span>

              {filled ? (
                <span className="mt-auto pt-4">
                  <span className="label text-slate">Board member</span>
                </span>
              ) : (
                <span className="mt-auto flex items-center gap-2 pt-4 text-red">
                  <span className="label">Apply for this seat</span>
                  <ArrowRight
                    className="
                      h-[1.15rem] w-[1.15rem] transition-transform duration-500
                      ease-[var(--ease-out-expo)] group-hover:translate-x-1.5
                      group-focus-visible:translate-x-1.5
                    "
                  />
                </span>
              )}
            </span>
          </>
        );

        return filled ? (
          <div
            key={id}
            tabIndex={0}
            aria-label={`${seat.name}, ${seat.role}`}
            {...handlers}
            style={style}
            className={className}
          >
            {inner}
          </div>
        ) : (
          <a key={id} href="#apply" {...handlers} style={style} className={className}>
            {inner}
          </a>
        );
      })}

      {/* One shared watermark plane across all five panels. */}
      <Watermark
        rows={14}
        className="z-10 text-slate opacity-[0.07] mix-blend-multiply"
      />
    </div>
  );
}
