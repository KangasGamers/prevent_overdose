"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Close, Plus, User } from "./icons";
import { Watermark } from "./watermark";
import { boardRoles } from "@/lib/site";

/**
 * The five board seats as expanding panels — the homepage fork's interaction,
 * reused. Each seat carries a headshot placeholder (dashed: the person isn't
 * appointed yet), the role, and its remit. Hover or keyboard focus widens a
 * panel and recedes its neighbours.
 *
 * When a seat is filled, give its `boardRoles` entry a `name` and `photo` and
 * the placeholder swaps for the real image. The role's remit lives behind a
 * click ("More about") rather than sitting on the face of a filled panel —
 * give a seat a `bio` (and optionally a `bioPhoto`) to show a fuller writeup
 * there too.
 */
type Seat = {
  role: string;
  remit: string;
  name?: string;
  photo?: string;
  /** Vertical focal point for the headshot crop, e.g. "center" or "35%". Defaults to the top. */
  photoPosition?: string;
  /** Extra crop-in on the headshot. 1 = as-is, 1.25 = 25% zoomed in. */
  photoScale?: number;
  /** Longer personal writeup shown in the "More about" overlay. */
  bio?: string;
  /** Alternate photo for the overlay — a fuller portrait, not the square headshot crop. */
  bioPhoto?: string;
};

export function BoardSeats() {
  const [active, setActive] = useState<string | null>(null);
  const [reduced, setReduced] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  const weightFor = useCallback(
    (id: string) => {
      if (active === null) return 1;
      return active === id ? 2.4 : 0.7;
    },
    [active],
  );

  const openSeat = (boardRoles as readonly Seat[]).find((s) => s.role === openId);

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
              className="door-rise relative z-20 block w-full max-w-[12rem] overflow-hidden"
              style={{ animationDelay: reduced ? "0ms" : `${i * 90}ms` }}
            >
              {seat.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={seat.photo}
                  alt={seat.name ?? seat.role}
                  style={{
                    objectPosition: `50% ${seat.photoPosition ?? "0%"}`,
                    transform: seat.photoScale ? `scale(${seat.photoScale})` : undefined,
                  }}
                  className={`aspect-square w-full origin-top object-cover grayscale transition-[opacity,filter] duration-500 group-hover:grayscale-0 group-focus-visible:grayscale-0 ${
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

              {filled ? (
                <span className="mt-auto flex items-center gap-2 pt-4 text-red">
                  <span className="label">More about {seat.name?.split(" ")[0]}</span>
                  <Plus className="h-[1.05rem] w-[1.05rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-90" />
                </span>
              ) : (
                <>
                  <span
                    className={`
                      measure-tight text-[0.9375rem] leading-relaxed text-ink-soft
                      transition-opacity duration-500 ${dimmed ? "opacity-55" : "opacity-100"}
                    `}
                  >
                    {seat.remit}
                  </span>
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
                </>
              )}
            </span>
          </>
        );

        return filled ? (
          <button
            key={id}
            type="button"
            aria-label={`More about ${seat.name}, ${seat.role}`}
            onClick={() => setOpenId(id)}
            {...handlers}
            style={style}
            className={`${className} cursor-pointer text-left`}
          >
            {inner}
          </button>
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

      {openSeat && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`More about ${openSeat.name}`}
          className="fixed inset-0 z-50 flex items-stretch justify-center bg-ink/80 p-0 sm:items-center sm:p-6"
          onClick={() => setOpenId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative flex w-full max-w-[52rem] flex-col overflow-y-auto bg-paper
              sm:max-h-[85vh] sm:flex-row sm:overflow-hidden
              border-[var(--rule-strong)] sm:border
            "
          >
            <button
              type="button"
              onClick={() => setOpenId(null)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center border border-[var(--rule-strong)] bg-paper text-ink transition-colors hover:border-red hover:text-red"
            >
              <Close className="h-4 w-4" />
            </button>

            <div className="relative w-full shrink-0 sm:w-[40%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={openSeat.bioPhoto ?? openSeat.photo}
                alt={openSeat.name ?? openSeat.role}
                className="aspect-[4/5] w-full object-cover sm:aspect-auto sm:h-full"
              />
            </div>

            <div className="flex flex-1 flex-col gap-5 px-7 py-9 sm:overflow-y-auto sm:px-10 sm:py-12">
              <div>
                <span className="label text-slate">{openSeat.role}</span>
                <h2 className="display-tight mt-2 text-[clamp(1.6rem,3.4vw,2.3rem)]">
                  {openSeat.name}
                </h2>
              </div>

              <p className="measure text-[0.9375rem] leading-relaxed text-ink-soft">
                {openSeat.remit}
              </p>

              {openSeat.bio && (
                <p className="measure whitespace-pre-line text-[0.9375rem] leading-relaxed text-ink-soft">
                  {openSeat.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
