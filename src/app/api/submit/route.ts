import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { formSchemas, formSubjects, type FormKind } from "@/lib/forms";

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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FORMS_TO_EMAIL;
  const from = process.env.FORMS_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error(
      "Form email not configured: set RESEND_API_KEY, FORMS_TO_EMAIL, FORMS_FROM_EMAIL.",
    );
    return NextResponse.json(
      { error: "We couldn't send that right now. Please email us directly." },
      { status: 500 },
    );
  }

  const replyTo =
    typeof data.email === "string"
      ? data.email
      : typeof data.contact === "string" && data.contact.includes("@")
        ? data.contact
        : undefined;

  const subject = `[preventoverdose.co] ${formSubjects[kind]}`;
  const body = `${formSubjects[kind]}\n\n${fieldLines(data)}\n\n—\nSent from the preventoverdose.co ${kind} form.`;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to: to.split(",").map((s) => s.trim()),
      replyTo,
      subject,
      text: body,
    });
    if (error) {
      console.error("Resend send failed:", error);
      return NextResponse.json(
        { error: "We couldn't send that right now. Please email us directly." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Resend threw:", err);
    return NextResponse.json(
      { error: "We couldn't send that right now. Please email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
