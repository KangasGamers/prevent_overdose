# PreventOverdose — UI mockup

A visual redesign of [preventoverdose.co](https://www.preventoverdose.co), built as a
running Next.js application.

**This is a mockup, not an MVP.** Every route renders, every form validates and shows
its full state machine, and nothing is transmitted or stored. Forms self-label as
mockups on success.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # production build
```

## What's real and what isn't

**Real** — carried from the live site or from published sources:

- Mission, vision, and values statements, verbatim.
- Contact details, address, EIN, 501(c)(3) status.
- The four article titles and the one real event (whose date is genuinely TBD).
- The five open board roles.
- **All statistics.** US and Connecticut overdose figures come from CDC/NCHS and the
  CT Office of the Chief Medical Examiner, and every one links to its source. No
  figure on this site is invented.

**Placeholder** — visibly marked as such wherever it appears:

- Board member names. The roles are real; the people are not yet appointed.
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

## Not built (deliberately out of scope)

Narcan request fulfillment, donations, volunteer/training persistence, CMS, and admin
auth. The architecture for those is specified in
`docs/superpowers/specs/2026-09-02-preventoverdose-redesign-design.md`.
