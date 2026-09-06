import { workshops } from "@/lib/site";
import { workshopIcs } from "@/lib/calendar";

export const runtime = "nodejs";

export function generateStaticParams() {
  return workshops.filter((w) => w.startsAtISO).map((w) => ({ slug: w.slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const workshop = workshops.find((w) => w.slug === slug);
  const ics = workshop ? workshopIcs(workshop) : null;
  if (!ics) return new Response("Not found", { status: 404 });

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}.ics"`,
    },
  });
}
