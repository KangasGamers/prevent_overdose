/**
 * Form email delivery. Two backends, picked by which env vars are set:
 *
 *  1. SMTP  — `SMTP_HOST` + `SMTP_USER` + `SMTP_PASS` (e.g. Google Workspace
 *     with an App Password). No DNS setup required.
 *  2. Resend — `RESEND_API_KEY`. Needs a verified sending domain.
 *
 * SMTP wins if both are configured. `FORMS_TO_EMAIL` (comma-separated for more
 * than one recipient) and `FORMS_FROM_EMAIL` are required either way.
 */
type Mail = {
  subject: string;
  text: string;
  replyTo?: string;
};

export type MailResult =
  | { ok: true }
  | { ok: false; reason: "unconfigured" | "send-failed" };

function recipients(): string[] {
  return (process.env.FORMS_TO_EMAIL ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function sendFormEmail(mail: Mail): Promise<MailResult> {
  const to = recipients();
  const from = process.env.FORMS_FROM_EMAIL;
  if (!from || to.length === 0) {
    console.error("Form email not configured: set FORMS_FROM_EMAIL and FORMS_TO_EMAIL.");
    return { ok: false, reason: "unconfigured" };
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const resendKey = process.env.RESEND_API_KEY;

  try {
    if (smtpHost && smtpUser && smtpPass) {
      const nodemailer = (await import("nodemailer")).default;
      const port = Number(process.env.SMTP_PORT ?? 465);
      const transport = nodemailer.createTransport({
        host: smtpHost,
        port,
        secure: port === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });
      await transport.sendMail({ from, to, replyTo: mail.replyTo, subject: mail.subject, text: mail.text });
      return { ok: true };
    }

    if (resendKey) {
      const { Resend } = await import("resend");
      const { error } = await new Resend(resendKey).emails.send({
        from,
        to,
        replyTo: mail.replyTo,
        subject: mail.subject,
        text: mail.text,
      });
      if (error) {
        console.error("Resend send failed:", error);
        return { ok: false, reason: "send-failed" };
      }
      return { ok: true };
    }

    console.error(
      "Form email not configured: set SMTP_HOST/SMTP_USER/SMTP_PASS or RESEND_API_KEY.",
    );
    return { ok: false, reason: "unconfigured" };
  } catch (err) {
    console.error("Form email send threw:", err);
    return { ok: false, reason: "send-failed" };
  }
}
