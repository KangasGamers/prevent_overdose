---
name: PreventOverdose
description: Committed brand red carried as full-height fields, League Spartan set very large in caps, hairline rules instead of cards.
colors:
  paper: "#f7f6f2"
  paper-deep: "#eeece4"
  paper-on-red: "#fbf0ef"
  paper-on-ink: "#c9c7c0"
  ink: "#222222"
  ink-soft: "#4a4a48"
  slate: "#575756"
  red: "#c4322b"
  red-deep: "#96231e"
  red-bright: "#de3b32"
  blush: "#eecece"
  blush-deep: "#e2b4b4"
  coral: "#fe6161"
  rule: "color-mix(in srgb, #222222 14%, transparent)"
  rule-strong: "color-mix(in srgb, #222222 28%, transparent)"
  rule-on-red: "color-mix(in srgb, #ffffff 26%, transparent)"
typography:
  display:
    fontFamily: "League Spartan, Arial Black, sans-serif"
    fontSize: "clamp(2.4rem, 6vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "League Spartan, Arial Black, sans-serif"
    fontSize: "clamp(2rem, 4.6vw, 3.4rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.04em"
  title:
    fontFamily: "League Spartan, Arial Black, sans-serif"
    fontSize: "clamp(1.6rem, 2.6vw, 2.1rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  body-small:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.14em"
  data:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.2
    fontFeature: "tnum 1, lnum 1"
rounded:
  none: "0px"
  chart-cap: "4px"
  pill: "999px"
spacing:
  field-x: "1.25rem"
  field-x-lg: "2rem"
  field-y: "5rem"
  field-y-lg: "7rem"
  block: "3.5rem"
  stack: "2rem"
  inline: "0.625rem"
  control-y: "1rem"
  control-x: "1.75rem"
components:
  button-primary:
    backgroundColor: "{colors.red}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.red-deep}"
    textColor: "{colors.paper}"
  button-inverse:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1.125rem 1.75rem"
  button-inverse-hover:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.ink}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1rem 1.5rem"
  button-outline-hover:
    backgroundColor: "{colors.red}"
    textColor: "{colors.paper}"
  input-text:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body-small}"
    rounded: "{rounded.none}"
    padding: "0.875rem 1rem"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    typography: "{typography.body-small}"
    padding: "0 1rem"
  nav-link-active:
    textColor: "{colors.red}"
  door-red:
    backgroundColor: "{colors.red}"
    textColor: "{colors.paper}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: "3.5rem 2rem"
  door-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  door-blush:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.ink}"
---

# Design System: PreventOverdose

## Overview

**Creative North Star: "The Public Notice"**

This is the visual language of something posted where people will actually see it — a civic bill, a field sign, a warning that must read from across a room and still be dignified up close. Brand red is not an accent here; it is the ground. Whole viewport-height fields fill with `#C4322B`, carry their own tiled wordmark texture, and hold display type at scale. Between the red fields, paper and a slightly deeper paper carry the reading. Nothing floats: there are no cards, no drop shadows, no rounded containers. Structure comes from hairline rules and from panels that butt directly against one another.

The density is editorial rather than app-like. Content lists are ruled indexes with a top border and a border under each row, not grids of boxes. Sections are separated by a single hairline the full width of the page. Where the incumbent Wix site used stock photography, this build uses no photography at all: the texture that fills empty space is the wordmark itself, rotated and tiled, blended into whatever ground it sits over. The one authored motion moment is the homepage fork rising into place; everything else is a state change under 700ms.

Legibility is the governing constraint, not a finishing pass. The palette was inherited from the incumbent brand and it is unforgiving: red at luminance 0.14 and blush at high lightness both fail in obvious ways, so the system encodes the exact tokens and prohibitions that keep AA intact. Hierarchy is built from hue, size, weight and position — never from transparency.

**Key Characteristics:**
- Committed red: full-height fields, not accents
- League Spartan set very large, uppercase, tight (-0.04em, line-height 0.86)
- Zero shadows; zero corner radius on every surface and control
- Hairline rules (`--rule`, `--rule-strong`, `--rule-on-red`) as the only divider
- A single continuous watermark plane per surface, blended into opaque grounds
- Ruled indexes instead of card grids
- Every numeral runs tabular lining figures

## Colors

An inherited two-pole palette: a warm off-white paper against a single saturated brand red, with blush as the only soft note and ink for everything that must simply be read.

### Primary
- **Brand Red** (`{colors.red}`): The surface color, not the accent. Full-bleed fields — the fork's lead door, the response-steps band, page headers, the closing call — plus icons, active nav, links on paper, and the primary button. It is allowed to occupy 40%+ of a page.
- **Deep Red** (`{colors.red-deep}`): Hover state for every red surface, the dimmed state of the red door, and the only red permitted for small text on blush.
- **Bright Red** (`{colors.red-bright}`): Reserved lift above brand red; used sparingly and never behind body copy.

### Secondary
- **Blush** (`{colors.blush}`): A fill. Backs the third door, marks a checked radio row, and lights the inverse button on hover. It is never a text color.
- **Blush Deep** (`{colors.blush-deep}`): The dimmed blush door, non-current chart bars, and the scrollbar thumb.
- **Coral** (`{colors.coral}`): Inherited brand tint, held in the token set for identity continuity; not load-bearing anywhere in the shipped pages.

### Neutral
- **Paper** (`{colors.paper}`): Page ground and the color of type on every red or ink field.
- **Paper Deep** (`{colors.paper-deep}`): The alternating band ground and every form's interior, so a section can change register without changing hue.
- **Paper on Red** (`{colors.paper-on-red}`): Secondary copy on red fields only. A warm tint at near-primary lightness, measured 4.9:1 on brand red.
- **Ink** (`{colors.ink}`): Body and heading color on paper; also a full-field ground for the mission statement and the emergency strip.
- **Ink Soft** (`{colors.ink-soft}`): Long-form body copy on paper, and inactive nav.
- **Slate** (`{colors.slate}`): Metadata, captions, placeholder text, and the dashed-outline "not yet reported" placeholders.
- **Rule / Rule Strong / Rule on Red** (`{colors.rule}` / `{colors.rule-strong}` / `{colors.rule-on-red}`): The entire divider vocabulary. `rule-strong` divides structure; `rule` divides within a component; `rule-on-red` is the inverted hairline for red fields.

### Named Rules

**The Fill-Only Blush Rule.** Blush is a fill and never a text color. It does not clear body-copy contrast on paper, and no size or weight rescues it. If blush needs to communicate, it does so as an area.

**The No-Dimming-On-Red Rule.** Brand red sits at relative luminance 0.14, so any text on it needs luminance ≥ 0.81 to clear 4.5:1 — which leaves no headroom at all. Tailwind v4 opacity modifiers compile to `oklab()` and composite darker than naive sRGB alpha: `text-paper/85` on red measures ~4.0:1 and **fails**. Secondary copy on red uses `{colors.paper-on-red}`, which reads warmer rather than fainter and measures 4.9:1. On a red field, hierarchy comes from hue, size and weight — never from dimming.

Ink fields have ample headroom (ink sits at luminance 0.016), so a fade would pass there. It is still not used: secondary copy on ink takes the named `{colors.paper-on-ink}` role at 9.4:1, so the dimming device exists nowhere in the codebase and cannot be copied onto a red field by someone following an existing pattern.

**The Red-Deep-On-Blush Rule.** Brand red on blush measures 3.74:1 and fails for the 11px label. Small type over blush uses `{colors.red-deep}` (5.6:1), which holds the brand and clears AA.

**The Committed Field Rule.** Red arrives as a whole field with its own watermark and its own inverted rule and focus colors, or it arrives as a small mark (icon, link, active underline, button). There is no middle register: no red-tinted panels, no red washes behind paper copy.

## Typography

**Display Font:** League Spartan (with Arial Black, sans-serif)
**Body Font:** Archivo (with system-ui, sans-serif)

**Character:** League Spartan is set the way a public sign is set — uppercase, very large, negative tracking, line-height below 1 so multi-line headlines lock into a solid block. Archivo underneath is neutral, slightly condensed, and stays out of the way. The pairing reads as authority without institutional coldness.

### Hierarchy
- **Display** (800, `clamp(2.4rem, 6vw, 5.5rem)`, line-height 0.86, -0.04em, uppercase, balanced wrap): Door labels, page-header H1, closing statements. The mission statement uses the same primitive at a reduced size with a 1.06 line-height because it is a paragraph, not a headline.
- **Headline** (800, `clamp(2rem, 4.6vw, 3.4rem)`): Every section H2.
- **Title** (700, `clamp(1.6rem, 2.6vw, 2.1rem)`, line-height 0.92, -0.03em, uppercase): Row headings in ruled indexes, card titles, form panel headings, wordmark, mobile nav items.
- **Body** (400, 1.0625rem, leading-relaxed): Ledes and primary prose. Small body (0.9375rem) carries door consequence lines, list descriptions, and form copy. 0.875rem and 0.8125rem carry captions, hints and metadata.
- **Label** (600, 0.6875rem, 0.14em tracking, uppercase): The action marker. Every call-to-action pairs a label with the drawn arrow; also legends and chart affordances.
- **Data** (600, 0.8125rem, tabular lining figures): Step numbers, chart values and years, phone numbers, reading times.

### Named Rules

**The Caps Display Rule.** Display and title type is always uppercase League Spartan with negative tracking. Sentence-case display type does not exist in this system.

**The Measure Rule.** Prose is capped: 68ch for running body, 52ch for short supporting copy beside a heading. Type never runs the full 90rem container.

**The Tabular Rule.** Any numeral a reader might compare — a count, a year, a percentage, a phone number — carries tabular lining figures, so columns of digits align and a hovered value does not shift its neighbours.

**The Label-Is-An-Action Rule.** The uppercase 11px label marks something you can do or a data affordance. It is not a kicker: it never sits above a heading to introduce it.

## Layout

A single 90rem container with 1.25rem gutters at mobile and 2rem from `lg`, centered. Full-bleed color fields extend edge to edge; only their inner container is constrained. Vertical rhythm is coarse and consistent: 5rem section padding at mobile, 7rem from `lg`, with 3.5rem between a section heading and its content and 2rem for stacked copy.

The homepage fork is the exception to the container: three panels fill `calc(100svh - var(--header-h))` in a row from `md`, distributed by flex weight (1.45 red / 1.0 paper / 0.85 blush at rest). Below `md` they stack and hierarchy is carried by explicit minimum heights (23rem / 15rem / 13.5rem) instead of width, because flex-grow does nothing in a column and the triage order must survive the breakpoint that carries most of the traffic.

Content collections are ruled indexes: a top border on the list, a bottom border on each row, and a CSS grid inside each row (`auto 16rem 1fr auto` at `md`) so icon, title, description and action align down the whole list. Where a grid of tiles is genuinely right, cells are separated by 1px gaps over a `rule-strong` background rather than by margins, so the seams read as rules. The sticky header is a fixed 4.25rem (`--header-h`) and full-bleed, with its nav and donate block flush to the right edge and separated by vertical hairlines.

## Elevation & Depth

**There are no shadows in this system.** Not on cards, not on the header, not on hover, not on the mobile drawer. Depth comes from three devices: opaque color grounds that change between adjacent sections (paper → paper-deep → ink → red), 1px hairline rules at every boundary, and the watermark texture sitting between a ground and its content. A hovered surface changes color; it does not lift.

The one z-axis in the build is inside the homepage fork: the watermark plane at `z-10` above the opaque door grounds, and the door copy at `z-20` above it.

### Named Rules

**The Flat-Ground Rule.** Surfaces are opaque and coplanar. Separation is a color change or a hairline; never a shadow, never a blur, never a border-radius standing in for a shadow.

**The Single Plane Rule.** A surface gets one watermark plane, not one per panel. In the homepage fork, a single rotated plane is positioned over the three opaque door grounds and blended into them with `mix-blend-soft-light` at 55% opacity, so each ground tints the same texture differently. Per-panel planes each centered their own tiling and the pattern visibly restarted at every seam. The shared plane also holds still while the panels resize, which is where the differential motion between texture and panel comes from.

**The Font-Size Watermark Rule.** Watermark rows size via `font-size` (`clamp(2.25rem, 4.4vw, 4rem)`) with `line-height: 1.5` clearing the cap height — never via `transform: scale()`. Scaling a row past its own line box makes adjacent rows overlap and merge into nonsense letterforms.

**The Masked Texture Rule.** Every watermark carries a vertical linear-gradient mask (transparent → opaque 16%–58% → transparent 92%) so the texture is absent behind the copy at the foot of the field. Opacity is set by the consumer: ~0.075–0.08 over red, ~0.05–0.06 over ink, 0.55 with soft-light blending over the mixed fork.

## Shapes

Square. Every panel, button, input, drawer, field and container has a 0px radius, and the layout's only curves are the rounded stroke caps inside the icon set. Two documented exceptions exist and are deliberate: chart bars carry a 4px cap on their top corners so a bar reads as a drawn object rather than a clipped block, and the scrollbar thumb is a pill.

Borders are always 1px hairlines in a rule token, with two emphasis moves: a 3px left border in brand red marks a pull-quote or provenance note, and a 1px dashed slate border at 50% marks an honest empty state ("Not yet reported", "Mockup only"). Dashed means *nothing is here yet*; it is never decorative.

## Components

### Buttons
- **Shape:** Hard rectangles (0px radius), no shadow, label + arrow always.
- **Primary:** Brand red ground, paper text, uppercase 11px label, 1rem × 1.5rem padding, matching red border so it can sit against any ground.
- **Inverse (on red fields):** Paper ground, ink text, 1.125rem × 1.75rem padding; hover fills blush.
- **Outline:** 1px ink border on transparent; hover flips the whole control to red ground with paper text.
- **Ghost (inline link action):** Red label + arrow with no container.
- **Hover / Focus:** 200ms color transition; the arrow slides 6px right on 500ms `--ease-out-expo`. Focus is the global 2px red ring at 3px offset, inverted to paper inside `.on-red`.

### Cards / Containers
- **Corner Style:** Square (0px).
- **Background:** Paper-deep for form panels and tile cells; paper on hover.
- **Shadow Strategy:** None. See Elevation & Depth.
- **Border:** 1px `rule-strong` around the panel; tile grids use 1px gaps over a `rule-strong` ground instead of per-cell borders.
- **Internal Padding:** 2rem for tiles, 1.75rem for form panels.

### Inputs / Fields
- **Style:** Paper ground inside a paper-deep panel, 1px `rule-strong` border, square, 0.875rem × 1rem padding, 0.9375rem text, slate placeholder at 70%.
- **Focus:** Border shifts to brand red (200ms), plus the global red focus ring. No glow.
- **Error:** Border goes solid brand red, with a red 0.875rem message wired via `aria-describedby` and `role="alert"`; the hint text it replaces occupies the same slot.
- **Disabled:** 60% opacity, `cursor-not-allowed`.
- **Radio groups:** Full-row labels stacked with 1px gaps over `rule-strong`; the checked row fills blush (fill, not text), and the native control takes `accent-color: red`.

### Navigation
- Header is sticky, 4.25rem, paper, with a `rule-strong` bottom border. Nav items are 0.9375rem medium in ink-soft, going ink on hover and red when current, with a 2px red underline that scales in from the left over 300ms. The donate action is a red block flush to the right edge, separated by a vertical hairline, set in display-tight caps. Below `lg` the nav collapses to a drawn hamburger opening a full-height paper drawer of display-tight 1.6rem rows divided by `rule` hairlines, ending in a full-width red donate row; body scroll locks while open.

### Icons
- One authored family on a 24px grid: 1.6 stroke, round caps and joins, `currentColor`, no fill. Includes the organization's own object (the nasal spray device). Rendered at 1.15rem inline beside a label, 2rem as a section marker.

### The Doors (signature)
Three floor-to-ceiling panels — red, paper, blush — that are themselves the primary actions; there is no button inside them. Each carries a hairline that draws in from the left, a display label in caps, one line of consequence at 52ch, and a label+arrow affordance. No numerals: three parallel choices are not a sequence. Pointer or keyboard focus adds 0.75 flex weight to the hovered panel and removes 0.28 from its neighbours over 700ms `--ease-out-expo`; unfocused panels also drop to their dimmed ground (`red-deep` / `paper-deep` / `blush-deep`) and their consequence line to 60% opacity. Entry is staggered 110ms per panel via `door-rise` (28px lift, 6px blur, 900ms). Under `prefers-reduced-motion`, durations become 0ms and the same state changes still apply.

### The Watermark (signature)
The tiled wordmark rebuilt as live type rather than an image, so it stays crisp and inherits `currentColor`. A rotated plane (-8deg) of alternating-offset rows, centered and masked vertically, sitting inside any `relative isolate overflow-hidden` field. See the Single Plane, Font-Size Watermark and Masked Texture rules.

### The Trend Chart
Bars in blush-deep with the most recent year in brand red, direct-labeled with tabular values above each bar and the year below a hairline. Hover deepens the bar to red-deep and turns its value and year red. A `View as table` disclosure carries the same figures in text, so identity and value never depend on the mark alone. Sources are cited beneath every chart.

## Do's and Don'ts

### Do:
- **Do** use `{colors.paper-on-red}` (#FBF0EF) for secondary copy on any red field. It is the only sanctioned secondary text color there.
- **Do** build hierarchy on red from hue, size, weight and position.
- **Do** use blush as an area fill only — door ground, selected row, hover state.
- **Do** use `{colors.red-deep}` for small type over blush.
- **Do** give a surface one shared watermark plane blended over its opaque grounds with `mix-blend-soft-light`, so the tiling never restarts at a seam.
- **Do** size watermark rows with `font-size`, with `line-height: 1.5` clearing the cap height.
- **Do** divide with 1px hairlines from the rule tokens, and invert to `--rule-on-red` and a paper focus ring inside `.on-red`.
- **Do** set every comparable numeral in tabular lining figures.
- **Do** cap prose at 68ch, or 52ch for short supporting copy.
- **Do** mark honest empty states with a dashed 1px slate border rather than hiding them.
- **Do** pair every call to action with the drawn arrow that slides on hover and focus.

### Don't:
- **Don't** dim text on red with an opacity modifier. Tailwind v4 compiles these to `oklab()` and composites darker than sRGB alpha; `text-paper/85` on brand red measures ~4.0:1 and fails AA.
- **Don't** set body copy, labels, or any text in blush.
- **Don't** use brand red for small text on blush (3.74:1).
- **Don't** add a box-shadow anywhere. Depth is a color change or a hairline.
- **Don't** round a panel, button, input, or drawer. 0px is the radius.
- **Don't** scale a watermark row with `transform: scale()`; rows overlap into nonsense letterforms.
- **Don't** give each panel of a multi-panel field its own watermark plane.
- **Don't** put an uppercase label above a heading as a kicker or eyebrow. Labels mark actions and data.
- **Don't** convert a ruled index into a grid of shadowed, rounded cards.
- **Don't** introduce photography or stock imagery; the watermark is this system's texture.
- **Don't** carry the fork's three-panel composition onto other surfaces. Page openers use the red `PageHeader` field.
