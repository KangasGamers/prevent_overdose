/**
 * Every figure here is real, published, and attributed. The organization has no
 * verified impact numbers of its own yet, so none are invented — see `orgMetrics`.
 */

export type Stat = {
  id: string;
  value: number;
  display: string;
  label: string;
  source: string;
  sourceHref: string;
  year: string;
};

export const nationalStats: Stat[] = [
  {
    id: "us-deaths-2025",
    value: 69973,
    display: "69,973",
    label: "overdose deaths in the United States in 2025",
    source: "CDC / NCHS provisional",
    sourceHref: "https://www.cdc.gov/nchs/pressroom/releases/20260513.html",
    year: "2025",
  },
  {
    id: "us-opioid-2025",
    value: 44564,
    display: "44,564",
    label: "U.S. overdose deaths involving opioids in 2025",
    source: "CDC / NCHS provisional",
    sourceHref: "https://www.cdc.gov/nchs/pressroom/releases/20260513.html",
    year: "2025",
  },
];

/** The trend is the argument: deaths are falling, and naloxone is part of why. */
export const nationalTrend = [
  { year: "2022", deaths: 107941 },
  { year: "2023", deaths: 105007 },
  { year: "2024", deaths: 81313 },
  { year: "2025", deaths: 69973 },
];

export const connecticutTrend = [
  { year: "2023", deaths: 1338 },
  { year: "2024", deaths: 990 },
];

export const ctStats: Stat[] = [
  {
    id: "ct-deaths-2024",
    value: 990,
    display: "990",
    label: "confirmed overdose deaths in Connecticut in 2024",
    source: "CT Office of the Chief Medical Examiner",
    sourceHref:
      "https://portal.ct.gov/dph/health-education-management--surveillance/the-office-of-injury-prevention/opioid-and-drug-overdose-statistics",
    year: "2024",
  },
  {
    id: "ct-fentanyl-share",
    value: 78,
    display: "78%",
    label: "of Connecticut drug intoxication deaths involved fentanyl",
    source: "CT Office of the Chief Medical Examiner",
    sourceHref:
      "https://portal.ct.gov/dph/health-education-management--surveillance/the-office-of-injury-prevention/opioid-and-drug-overdose-statistics",
    year: "2024",
  },
];

export const cdcAttribution = {
  quote:
    "widespread, data-driven distribution of naloxone",
  context:
    "named by the CDC among the reasons overdose deaths have fallen for three consecutive years",
  source: "CDC / NCHS",
  sourceHref: "https://www.cdc.gov/nchs/pressroom/releases/20260513.html",
};

/**
 * The organization's own numbers. No verified figure exists for either of these.
 * They render with explicit placeholder treatment — never as fact.
 *
 * Board seat count is *not* here — it's derived live from `boardRoles` in
 * `src/lib/site.ts` wherever it's shown, so it can't drift out of sync again.
 */
export const orgMetrics = [
  { id: "kits", label: "Narcan kits distributed", note: "Awaiting first distribution event" },
  { id: "trainings", label: "Trainings delivered", note: "Curriculum in development" },
] as const;
