import { org } from "@/lib/site";

type WorkshopLike = {
  title: string;
  city: string;
  startsAt: string | null;
  locationName: string;
  welcome: string;
};

const RED = "#c4322b";
const INK = "#222222";
const SOFT = "#4a4a48";
const RULE = "#dddad0";
const PAPER = "#f7f6f2";

/**
 * Confirmation email sent to someone who registers for a workshop. Returns the
 * subject plus text + HTML bodies for `sendFormEmail`.
 */
export function workshopConfirmationEmail(opts: {
  name: string;
  workshop: WorkshopLike;
  attendees: number;
}): { subject: string; text: string; html: string } {
  const { name, workshop, attendees } = opts;
  const firstName = name.trim().split(/\s+/)[0] || "there";
  const when = workshop.startsAt ?? "Date to be announced";
  const party =
    attendees > 1 ? `You registered ${attendees} people.` : "";

  const subject = `You're registered — ${workshop.title}`;

  const text = [
    `Hi ${firstName},`,
    "",
    `Thanks for signing up for ${workshop.title} in ${workshop.city}. We're looking forward to ${workshop.welcome}.`,
    party && `\n${party}`,
    "",
    `When:  ${when}`,
    `Where: ${workshop.locationName}`,
    "",
    "We'll email you again with the exact date, time, and address as they're confirmed. If your plans change, just reply to this message.",
    "",
    `If you'd like to help us put more Narcan and more training into more hands, you can donate here: ${org.donateUrl}`,
    "",
    "— The PreventOverdose team",
    "preventoverdose.co",
  ]
    .filter((l) => l !== undefined && l !== "")
    .join("\n");

  const html = `<!doctype html>
<html>
<body style="margin:0;padding:0;background:${PAPER};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border:1px solid ${RULE};">
        <tr><td style="background:${RED};padding:20px 28px;">
          <span style="font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:700;letter-spacing:.02em;color:#ffffff;">PreventOverdose</span>
        </td></tr>
        <tr><td style="padding:28px 28px 8px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:${INK};">
          <p style="margin:0 0 16px;">Hi ${escapeHtml(firstName)},</p>
          <p style="margin:0 0 16px;">Thanks for signing up for <strong>${escapeHtml(workshop.title)}</strong> in ${escapeHtml(workshop.city)}. We&rsquo;re looking forward to ${escapeHtml(workshop.welcome)}.</p>
          ${party ? `<p style="margin:0 0 16px;color:${SOFT};">${escapeHtml(party)}</p>` : ""}
        </td></tr>
        <tr><td style="padding:0 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${RULE};border-bottom:1px solid ${RULE};font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:${INK};">
            <tr><td style="padding:14px 0 6px;color:${SOFT};text-transform:uppercase;letter-spacing:.08em;font-size:11px;">When</td></tr>
            <tr><td style="padding:0 0 12px;">${escapeHtml(when)}</td></tr>
            <tr><td style="padding:6px 0 6px;color:${SOFT};text-transform:uppercase;letter-spacing:.08em;font-size:11px;border-top:1px solid ${RULE};">Where</td></tr>
            <tr><td style="padding:0 0 14px;">${escapeHtml(workshop.locationName)}</td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:20px 28px 8px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:${INK};">
          <p style="margin:0 0 20px;">We&rsquo;ll email you again with the exact date, time, and address as they&rsquo;re confirmed. If your plans change, just reply to this message.</p>
        </td></tr>
        <tr><td style="padding:0 28px 8px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:${RED};">
            <a href="${org.donateUrl}" style="display:inline-block;padding:13px 26px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#ffffff;text-decoration:none;">Donate&nbsp;&rarr;</a>
          </td></tr></table>
        </td></tr>
        <tr><td style="padding:14px 28px 28px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:${SOFT};">
          <p style="margin:0;">Every dollar puts more Narcan and more training into more hands.</p>
        </td></tr>
        <tr><td style="padding:18px 28px;border-top:1px solid ${RULE};font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:13px;color:${SOFT};">
          The PreventOverdose team<br>
          <a href="https://preventoverdose.co" style="color:${SOFT};">preventoverdose.co</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
