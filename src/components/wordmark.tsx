/**
 * The wordmark and its nasal-applicator mark, rebuilt as vector rather than the
 * incumbent site's raster logo. Two lines, stacked tight, as on the original.
 */

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 34"
      fill="none"
      aria-hidden
      className={className}
    >
      {/* body of the device */}
      <rect x="8" y="9" width="12" height="20" rx="1.4" fill="currentColor" />
      {/* plunger */}
      <rect x="11" y="1.5" width="6" height="6" rx="1" fill="currentColor" />
      {/* nozzle */}
      <path d="M12.4 7.5h3.2v2h-3.2z" fill="currentColor" />
      {/* label window, knocked out */}
      <rect
        x="10.4"
        y="13"
        width="7.2"
        height="8"
        rx="0.6"
        className="fill-paper"
      />
      <path
        d="M11.6 15.4h4.8M11.6 17.2h4.8M11.6 19h3"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <Mark className={`h-8 w-auto shrink-0 ${markClassName ?? ""}`} />
      <span className="display-tight text-[0.95rem] leading-[0.9]">
        Prevent
        <br />
        Overdose
      </span>
    </span>
  );
}
