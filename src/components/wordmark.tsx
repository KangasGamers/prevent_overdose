/* eslint-disable @next/next/no-img-element */

/**
 * The logo. Drop the artwork at `public/logo.png` and it renders here — used in
 * the header and footer. The file already carries the "PREVENT OVERDOSE"
 * lettering, so there is no separate text wordmark beside it.
 *
 * `MarkVector` below is the type-only fallback the site shipped with; it is not
 * currently rendered.
 */

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <img src="/logo.png" alt="" className="h-11 w-auto shrink-0" />
      <span className="display-tight mt-[3px] text-[1.4rem] leading-[0.8]">
        Prevent
        <br />
        Overdose
      </span>
    </span>
  );
}

export function MarkVector({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 118" fill="none" aria-hidden className={className}>
      {/* atomizer stem, rising from the crossbar */}
      <rect x="46" y="0" width="28" height="58" rx="14" fill="currentColor" />
      {/* legs */}
      <rect x="4" y="48" width="34" height="66" rx="8" fill="currentColor" />
      <rect x="82" y="48" width="34" height="66" rx="8" fill="currentColor" />
      {/* crossbar joining them into the H monogram */}
      <rect x="4" y="48" width="112" height="32" rx="8" fill="currentColor" />
      {/* keyhole slots in the legs, knocked out */}
      <rect x="15" y="86" width="13" height="24" rx="6.5" className="fill-paper" />
      <rect x="92" y="86" width="13" height="24" rx="6.5" className="fill-paper" />
    </svg>
  );
}
