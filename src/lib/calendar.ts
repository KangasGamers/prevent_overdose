/**
 * Calendar links for a workshop that has a real start time. Returns null when
 * `startsAtISO` isn't set yet (date still TBA) so callers can skip rendering.
 */
type WorkshopLike = {
  slug: string;
  title: string;
  startsAtISO?: string;
  durationMinutes?: number;
  locationAddr: string;
  description: string;
};

const DEFAULT_DURATION_MIN = 90;

function toCalStamp(d: Date): string {
  // YYYYMMDDTHHMMSSZ
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function workshopCalendar(w: WorkshopLike): {
  start: Date;
  end: Date;
  google: string;
  icsPath: string;
} | null {
  if (!w.startsAtISO) return null;
  const start = new Date(w.startsAtISO);
  if (Number.isNaN(start.getTime())) return null;
  const end = new Date(
    start.getTime() + (w.durationMinutes ?? DEFAULT_DURATION_MIN) * 60_000,
  );

  const details = `${w.description}\n\nRegister: https://preventoverdose.co/workshops`;
  const google = `https://www.google.com/calendar/render?${new URLSearchParams({
    action: "TEMPLATE",
    text: `${w.title} — PreventOverdose`,
    dates: `${toCalStamp(start)}/${toCalStamp(end)}`,
    details,
    location: w.locationAddr,
  }).toString()}`;

  return { start, end, google, icsPath: `/api/ical/${w.slug}` };
}

/** RFC 5545 VEVENT for the .ics download route. */
export function workshopIcs(w: WorkshopLike): string | null {
  const cal = workshopCalendar(w);
  if (!cal) return null;
  const esc = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PreventOverdose//Workshops//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:workshop-${w.slug}@preventoverdose.co`,
    `DTSTAMP:${toCalStamp(new Date())}`,
    `DTSTART:${toCalStamp(cal.start)}`,
    `DTEND:${toCalStamp(cal.end)}`,
    `SUMMARY:${esc(`${w.title} — PreventOverdose`)}`,
    `DESCRIPTION:${esc(w.description)}`,
    `LOCATION:${esc(w.locationAddr)}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}
