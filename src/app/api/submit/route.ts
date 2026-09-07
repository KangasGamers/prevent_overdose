import { NextResponse } from "next/server";
import { z } from "zod";
import { formSchemas, formSubjects, type FormKind } from "@/lib/forms";
import { sendFormEmail } from "@/lib/mailer";
import { getDb } from "@/lib/db";
import { workshops } from "@/lib/site";
import { workshopConfirmationEmail } from "@/lib/emails";

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

  // Honeypot: a bot filled the hidden field. Accept silently, store nothing.
  if (typeof data.website === "string" && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const db = getDb();
  const email =
    typeof data.email === "string"
      ? data.email
      : typeof data.contact === "string" && data.contact.includes("@")
        ? data.contact
        : undefined;

  // --- Workshop registration: dedupe up front ------------------------------
  // `data.workshop` is the slug. Resolve the record for the emails.
  let workshopTitle: string | undefined;
  const workshop =
    kind === "workshop-register"
      ? workshops.find((w) => w.slug === String(data.workshop ?? ""))
      : undefined;
  if (kind === "workshop-register") {
    const slug = String(data.workshop ?? "");
    workshopTitle = workshop?.title ?? slug;

    if (db) {
      const { error } = await db.from("workshop_registrations").insert({
        workshop_slug: slug,
        name: String(data.name ?? ""),
        email: String(data.email ?? ""),
        attendees: Number(data.attendees ?? 1) || 1,
        note: data.note ? String(data.note) : null,
      });
      if (error) {
        // 23505 = unique_violation → already registered for this workshop.
        if (error.code === "23505") {
          return NextResponse.json({ ok: true, duplicate: true });
        }
        console.error("workshop_registrations insert failed:", error);
      }
    }
  }

  // --- Persist the raw submission (best-effort) ---------------------------
  let stored = false;
  if (db) {
    const { error } = await db.from("submissions").insert({
      kind,
      email: email ?? null,
      payload: Object.fromEntries(
        Object.entries(data).filter(([k]) => k !== "website"),
      ),
    });
    if (error) console.error("submissions insert failed:", error);
    else stored = true;
  }

  // --- Notify by email (best-effort) ------------------------------------
  const label = workshopTitle
    ? `${formSubjects[kind]} — ${workshopTitle}`
    : formSubjects[kind];
  const subject = `[preventoverdose.co] ${label}`;
  const body = `${label}\n\n${fieldLines(data)}\n\n—\nSent from the preventoverdose.co ${kind} form.`;
  const mail = await sendFormEmail({ subject, text: body, replyTo: email });

  // --- Confirmation email to a workshop registrant (best-effort) --------
  if (kind === "workshop-register" && workshop && email) {
    const confirm = workshopConfirmationEmail({
      name: String(data.name ?? ""),
      workshop,
      attendees: Number(data.attendees ?? 1) || 1,
    });
    const sent = await sendFormEmail({
      to: email,
      subject: confirm.subject,
      text: confirm.text,
      html: confirm.html,
    });
    if (!sent.ok) console.error("Registrant confirmation email failed:", sent.reason);
  }

  if (!stored && !mail.ok) {
    return NextResponse.json(
      { error: "We couldn't record that right now. Please email us directly." },
      { status: mail.reason === "unconfigured" && !db ? 500 : 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
