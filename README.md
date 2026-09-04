# PreventOverdose — UI mockup

A visual redesign of [preventoverdose.co](https://www.preventoverdose.co), built as a
running Next.js application.

Every route renders. Donations run through the real Givebutter campaign, and the
five forms email the organization through Resend. There is no database and no admin
console yet — submissions land in an inbox, not a queue.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the Resend values
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm start   # production build
```

Without the `RESEND_*` / `FORMS_*` env vars the forms return a "couldn't send"
error; everything else works.

## What's real and what isn't

**Real** — carried from the live site or from published sources:

- Mission, vision, and values statements, verbatim.
- Contact details, address, EIN, 501(c)(3) status.
- The four article titles and the one real event (whose date is genuinely TBD).
- The five board roles (Vice President and Director of Finance are seated; three
  seats remain open).
- **All statistics.** US and Connecticut overdose figures come from CDC/NCHS and the
  CT Office of the Chief Medical Examiner, and every one links to its source. No
  figure on this site is invented.

**Placeholder** — visibly marked as such wherever it appears:

- Board member names for the three open roles. Those seats render as headshot
  placeholders until someone is appointed.
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

`get-narcan`, `volunteer`, `contact`, the footer newsletter, and event-notify all
POST to `src/app/api/submit/route.ts`, which validates against the schemas in
`src/lib/forms.ts` (shared shape, server is authoritative), drops honeypot hits,
and emails the submission via Resend to `FORMS_TO_EMAIL` with the sender's address
as reply-to. Set `RESEND_API_KEY`, `FORMS_TO_EMAIL`, and `FORMS_FROM_EMAIL` (see
`.env.example`) locally and in the host's environment.

## Not built (deliberately out of scope)

Narcan request fulfillment, a submissions database and admin console, learner
accounts / server-side course progress / verifiable certificates, newsletter list
management, and a CMS. The architecture for those is specified in
`docs/superpowers/specs/2026-09-02-preventoverdose-redesign-design.md`.
