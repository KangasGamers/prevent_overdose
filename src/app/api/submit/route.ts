import { NextResponse } from "next/server";
import { z } from "zod";
import { formSchemas, formSubjects, type FormKind } from "@/lib/forms";
import { sendFormEmail } from "@/lib/mailer";

export const runtime = "nodejs";

const envelope = z.object({
  kind: z.enum(Object.keys(formSchemas) as [FormKind, ...FormKind[]]),
  data: z.unknown(),
});

function fieldLines(data: Record<string, unknown>): string {
  return Object.entries(data)
    .filter(([key]) => key !== "website")
    .map(([key, value]) => {
      const v = Array.isArray(value)
        ? value.join(", ")
        : value === undefined || value === "" || value === null
          ? "—"
          : String(value);
      return `${key}: ${v}`;
    })
    .join("\n");
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const outer = envelope.safeParse(json);
  if (!outer.success) {
    return NextResponse.json({ error: "Unknown form." }, { status: 400 });
  }

  const kind = outer.data.kind;
  const parsed = formSchemas[kind].safeParse(outer.data.data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Some fields need another look.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const data = parsed.data as Record<string, unknown>;

  // Honeypot: a bot filled the hidden field. Accept silently, send nothing.
  if (typeof data.website === "string" && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const replyTo =
    typeof data.email === "string"
      ? data.email
      : typeof data.contact === "string" && data.contact.includes("@")
        ? data.contact
        : undefined;

  const subject = `[preventoverdose.co] ${formSubjects[kind]}`;
  const body = `${formSubjects[kind]}\n\n${fieldLines(data)}\n\n—\nSent from the preventoverdose.co ${kind} form.`;

  const result = await sendFormEmail({ subject, text: body, replyTo });
  if (!result.ok) {
    return NextResponse.json(
      { error: "We couldn't send that right now. Please email us directly." },
      { status: result.reason === "unconfigured" ? 500 : 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
