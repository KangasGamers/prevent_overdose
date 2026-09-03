import { Watermark } from "./watermark";

/**
 * Shared page opener. The red field with its watermark is the incumbent site's
 * one genuinely good move; this keeps it and sets it properly.
 */
export function PageHeader({
  title,
  lede,
  tone = "red",
}: {
  title: string;
  lede?: string;
  tone?: "red" | "ink";
}) {
  const isRed = tone === "red";
  return (
    <section
      className={`
        relative isolate overflow-hidden border-b border-[var(--rule-strong)]
        ${isRed ? "bg-red text-paper on-red" : "bg-ink text-paper"}
      `}
    >
      <Watermark
        rows={9}
        className={isRed ? "text-paper opacity-[0.075]" : "text-paper opacity-[0.05]"}
      />
      <div className="relative mx-auto max-w-[90rem] px-5 py-20 lg:px-8 lg:py-28">
        <h1 className="display max-w-[18ch] text-[clamp(2.6rem,7vw,5.5rem)]">
          {title}
        </h1>
        {lede && (
          <p
            className={`measure mt-8 text-[1.0625rem] leading-relaxed ${
              isRed ? "text-paper-on-red" : "text-paper-on-ink"
            }`}
          >
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}
