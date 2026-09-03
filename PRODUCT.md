# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 15 (App Router, TypeScript) with Tailwind CSS v4 — confirmed by the user in the
scoping round. Current deliverable is a **visual mockup only**: no database, no payment
integration, no auth. All dynamic values render from typed fixture data so the same
components later swap to real sources without redesign.

## Users

- **Someone who needs Narcan** — a person who uses drugs, or their family member, friend,
  or partner. Often arriving anxious, possibly on a phone, possibly in a hurry, and
  possibly not wanting to be identified. Their job: find out how to get naloxone and how
  to use it, quickly and without being judged.
- **A community member who wants to help** — a neighbor, student, teacher, or local
  business owner. Their job: find a concrete action (donate, volunteer, attend a training)
  that is proportionate to the time they have.
- **An institutional evaluator** — a grant officer, school administrator, hospital
  partner, or prospective board member. Their job: determine within about ninety seconds
  whether this organization is credible, legitimate, and worth funding or partnering with.

## Product Purpose

PreventOverdose is a 501(c)(3) nonprofit in Avon, Connecticut. Its stated mission,
verbatim from the current site: "to save lives by providing free Narcan, empowering
communities with harm reduction education, and advocating for policies that support
overdose prevention and addiction treatment."

Success is a visitor leaving with naloxone access, a training seat, a donation, or a
volunteer application — not merely having read the mission.

## Positioning

Local and specific. National harm-reduction organizations publish guidance; this
organization distributes physical kits and runs trainings in a named Connecticut town.
The credible claim is proximity and free access, never scale.

The organization is **early-stage**, and the design must not pretend otherwise. It has
four published articles, one unscheduled launch event, an unnamed board, and small
donation totals. Design that fakes maturity will be caught by exactly the institutional
evaluators it is trying to impress.

## Operating Context

- Visitors arrive from social posts and word of mouth; mobile share is likely dominant.
- The topic is stigmatized. Some visitors will not want to be seen browsing, will not
  create an account, and will not enter a phone number.
- Emotional register runs from grief to urgency to civic curiosity, sometimes in the same
  visit.
- Donations are processed by Givebutter, which stays the system of record for money.

## Capabilities and Constraints

**Confirmed real content** (carried from the live site, verbatim where quoted):

- Mission, vision, and values statements.
- Contact: leadership@preventoverdose.co · 860-751-8658 · Avon, CT 06001 (street address withheld by request).
- EIN 39-2213650, 501(c)(3).
- Four articles: "The Dangers of Fentanyl", "The Science Behind an Overdose", "Narcan
  Distribution as a Vital Strategy in Addressing Opioid Overdoses", "Understanding the
  Rising Trends of Opioid Overdose Deaths in America".
- One real event: Launch Party, Avon CT, date and time genuinely TBD.
- Five open board roles: Executive Director, Vice President, Secretary, Treasurer,
  Outreach Chair. Board recruitment asks for a CV plus a 300–500 word statement.

**Explicitly undecided / absent — must not be fabricated:**

- Board member names. All five roles currently read "COMING SOON".
- The organization's own program numbers: kits distributed, trainings held, reversals
  reported. No verified figure exists.
- Photography. The current site uses unrelated Wix stock imagery (a pottery workshop,
  children dancing) which cannot carry forward.
- Real donation totals. The live site's "$70 of $10,000" is a hardcoded placeholder.

**Out of scope this phase:** Narcan request/fulfillment workflow, CMS, payment
integration, authentication.

## Brand Commitments

Binding, extracted from the live site's computed styles and retained by user decision
("evolve the existing brand"):

- Palette: paper `#F7F6F2`, ink `#222222`, brand red `#C4322B`, blush `#EECECE`,
  coral `#FE6161`, slate `#575756`.
- Display typeface: League Spartan, set large and in caps.
- The tiled "PREVENT OVERDOSE" watermark texture in the red hero band.
- The wordmark and its stylized nasal-applicator mark.
- Tagline in use: "One dose can save a life."

## Evidence on Hand

**Real and citable — use these rather than invented figures:**

- U.S. overdose deaths fell to an estimated 69,973 in 2025 from 81,313 in 2024, a third
  consecutive annual decline (CDC/NCHS provisional).
- U.S. opioid-involved deaths fell from an estimated 55,296 in 2024 to 44,564 in 2025
  (CDC/NCHS).
- CDC attributes the decline in part to "widespread, data-driven distribution of
  naloxone."
- Connecticut recorded 990 confirmed overdose deaths in 2024, down from 1,338 in 2023
  (CT OCME / CT DPH).
- 78% of 2024 Connecticut drug intoxication deaths involved fentanyl.

**Absent:** any organization-specific impact number, board identity, or photography.
Anything of that kind appearing in the mockup must be visibly marked as placeholder.

## Product Principles

1. **The mission verb must be reachable.** Distributing Narcan is the primary program;
   getting Narcan must be a first-class path, not a paragraph. (Fulfillment is a later
   phase; the path and its promise are designed now.)
2. **Never fabricate credibility.** Real public-health data is available and stronger than
   invented organizational metrics. Placeholders are labeled, not disguised.
3. **Absence is designed, not hidden.** An unnamed board, an unscheduled event, and small
   totals are honest early-stage states that deserve real empty-state design rather than
   five cards reading "COMING SOON".
4. **Low-friction for the frightened.** No account, no required phone number, no barrier
   between a scared visitor and the information that keeps someone alive.
5. **Dignity over pity.** People who use drugs are the audience, not the illustration.
   Language and imagery treat them as people to be equipped, not cautionary tales.

## Accessibility & Inclusion

WCAG 2.2 AA is the target. Two known constraints from the extracted palette: blush
`#EECECE` fails contrast for body text on paper and is restricted to fills only; brand red
`#C4322B` on paper passes for large display text but must be verified for any small text.
Mobile-first, and readable one-handed under stress.
