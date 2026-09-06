# PreventOverdose — UI mockup

A visual redesign of [preventoverdose.co](https://www.preventoverdose.co), built as a
running Next.js application.

Every route renders. Donations run through the real Givebutter campaign, and the
forms email the organization (SMTP or Resend — see below). There is no database
and no admin console yet — submissions land in an inbox, not a queue.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the mail vars
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm start   # production build
```

Without the mail env vars the forms return a "couldn't send" error; everything
else works.

## What's real and what isn't

**Real** — carried from the live site or from published sources:

- Mission, vision, and values statements, verbatim.
- Contact details, address, EIN, 501(c)(3) status.
- The four article titles and the one real event (whose date is genuinely TBD).
- The five board roles, all seated: Executive Director, Vice President,
  Secretary, Director of Finance, Chief Technical Officer.
- **All statistics.** US and Connecticut overdose figures come from CDC/NCHS and the
  CT Office of the Chief Medical Examiner, and every one links to its source. No
  figure on this site is invented.

**Placeholder** — visibly marked as such wherever it appears:

- The organization's own impact numbers (kits distributed, trainings held). No
  verified figure exists, so the site says "Not yet reported" rather than showing a zero.
- Article bodies below the lede.
- Legal policy text.

The `/donate` page embeds the real Givebutter donation form inline via Givebutter's
official web-components bundle (`widgets.givebutter.com`), rendering
`<givebutter-giving-form>` for campaign `preventoverdoses` (the campaign behind the
`givebutter.com/preventoverdose` Giving Hub). The kit tiers pre-fill the amount.
Givebutter remains the processor and system of record for money; the account and
campaign IDs live in `src/lib/site.ts`.

## Structure

```
src/
├── app/            routes; one directory per page
├── components/     UI, forms, chart, icons, wordmark
├── lib/
│   ├── site.ts     organization facts and content
│   └── stats.ts    published statistics, each with its source
└── app/globals.css design tokens
```

## Design notes

The palette and League Spartan display face are carried from the existing brand,
extracted from the live site's computed styles. Two constraints worth knowing before
editing:

- **Blush `#EECECE` is a fill, never a text color.** It fails contrast for body copy.
- **Brand red `#C4322B` sits at luminance 0.14.** Text on it needs luminance ≥ 0.81 to
  clear WCAG AA, which leaves no room to create hierarchy by dimming. Secondary copy on
  red uses `--color-paper-on-red`, a warm tint at near-primary lightness. Don't
  reintroduce `text-paper/80`-style fades on red fields — they measure ~4.0:1 and fail.

Text contrast is verified at zero failures across all routes. The design decisions and
the backend plan are documented in `docs/superpowers/specs/` and `.impeccable/`.

## Training & certification (Phase 1)

`/training` is a self-serve Narcan course: sequential video modules (`/training/course`),
a quiz that unlocks only when every module is complete (`/training/quiz`), a
demonstration-video submission (`/training/submit`), and a printable certificate
template (`/training/certificate?name=…&issued=…&id=…`).

- **Not live yet.** `trainingLive` in `src/lib/training.ts` is `false`, so
  `/training` shows "modules coming soon" and the course/quiz/submit routes show
  a placeholder instead of the player. Flip it to `true` once every module has a
  real Mux playback ID.
- **Content is a draft.** Module titles/summaries and every quiz question in
  `src/lib/training.ts` are placeholders — rewrite them, and paste each module's
  Mux **playback ID** (public policy) into that file after uploading the videos.
- **No-skip enforcement** is client-side (`course-player.tsx`): forward seeks snap
  back, a module completes at 95% watched. Good-faith, not tamper-proof.
- **Progress is per-browser** (`localStorage`, `src/lib/training-progress.ts`) — no
  accounts this phase, so it's resettable.
- On a quiz pass the learner submits a video link; that emails the org (form kind
  `training-cert`). The org reviews and issues the certificate by hand via the
  `/training/certificate` URL. Phase 2 (accounts, DB, uploads, auto-issued
  verifiable certificates) is not built.

## Forms

`get-narcan`, `volunteer`, `contact`, the footer newsletter, event-notify,
`training-cert`, and the two workshop forms (`workshop-register`,
`workshop-host`) all POST to `src/app/api/submit/route.ts`, which validates
against the schemas in `src/lib/forms.ts` (shared shape, server is
authoritative), drops honeypot hits, and emails the submission to
`FORMS_TO_EMAIL` with the sender's address as reply-to.

`src/lib/mailer.ts` picks a backend from the env: **SMTP** (`SMTP_HOST` +
`SMTP_USER` + `SMTP_PASS` — e.g. a Google Workspace App Password, no DNS setup)
or **Resend** (`RESEND_API_KEY` — needs a verified domain). SMTP wins if both
are set. `FORMS_TO_EMAIL` and `FORMS_FROM_EMAIL` are required either way. See
`.env.example`; set the same vars in the host's environment.

## Workshops

`/workshops` lists in-person Narcan sessions from `workshops` in
`src/lib/site.ts` (edit that array to schedule real ones — `startsAt: null`
shows "Date to be announced"; `registerOpen: false` hides the register button).
Each session has an inline registration form; there's also a "host a workshop"
request form. No seat-count enforcement — the org confirms spots by email.
Community events (`events` in the same file) show as a secondary list and keep
their `/workshops/[slug]` detail pages. The old `/events` URLs 301 to
`/workshops`.

## Not built (deliberately out of scope)

Narcan request fulfillment, a submissions database and admin console, learner
accounts / server-side course progress / verifiable certificates, newsletter list
management, and a CMS. The architecture for those is specified in
`docs/superpowers/specs/2026-09-02-preventoverdose-redesign-design.md`.
