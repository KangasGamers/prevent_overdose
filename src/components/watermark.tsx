/**
 * The incumbent site's tiled wordmark texture, rebuilt as type rather than a
 * background image so it stays crisp at any scale and inherits currentColor.
 */
export function Watermark({
  rows = 9,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div className={`watermark ${className ?? ""}`} aria-hidden>
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="watermark-row"
            style={{ marginLeft: i % 2 === 0 ? "0" : "-6rem" }}
          >
            {Array.from({ length: 6 }).map((__, j) => (
              <span key={j}>Prevent Overdose</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
