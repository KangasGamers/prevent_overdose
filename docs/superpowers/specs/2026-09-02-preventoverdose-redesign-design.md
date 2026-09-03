# PreventOverdose — Rebuild Design Spec

**Date:** 2026-09-02
**Status:** Draft for review
**Replaces:** Wix site at https://www.preventoverdose.co

---

## 1. Context

PreventOverdose is a 501(c)(3) (EIN 39-2213650) in Avon, CT. Its stated mission is
"to save lives by providing free Narcan, empowering communities with harm reduction
education, and advocating for policies that support overdose prevention and addiction
treatment."

The current site is a Wix build: seven pages, no backend, no database, and no way for a
visitor to do anything except read and click a donate embed. This spec covers replacing
it with a Next.js application that has real server-side capability.

### Audit of the current site

Captured 2026-09-02 via Playwright at 1440×900, full-page, all seven routes.

**Pages:** `/`, `/about`, `/team-4`, `/support-us`, `/news`, `/events`, `/contact`,
plus four blog posts and legal pages.

**Extracted brand tokens** (from computed styles, ranked by frequency):

| Role | Value | Notes |
| --- | --- | --- |
| Paper | `#F7F6F2` | Dominant page background across every route |
| Ink | `#222222` | Body and heading text |
| Brand red | `#C4322B` | Hero bands, primary buttons, footer rule |
| Blush | `#EECECE` | Card fills, secondary button, team card base |
| Coral | `#FE6161` | Accent, donation tracker fill |
| Slate | `#575756` | Muted supporting text |

**Type:** League Spartan (display, set very large and all-caps — H1 at 141px on the
home hero), Poppins SemiBold (article titles, 18–26px), Avenir (incidental).

**Assets worth preserving:** the tiled "PREVENT OVERDOSE" watermark texture in the red
hero, and the mark itself (a stylized Narcan nasal applicator).

### Defects this rebuild must fix

1. **No Narcan request path.** Free Narcan distribution is the primary stated program,
   and there is no route, form, or CTA anywhere on the site to request a kit. Out of
   scope for this phase (see §8) but the schema must not preclude it.
2. **Reverse social proof on the homepage.** A "DONATION TRACKING" widget renders
   `$70` against `0% of $10,000` above the fold. The number is hardcoded.
3. **Team page is empty.** Five cards reading `COMING SOON` under Executive Director,
   Vice President, Secretary, Treasurer, and Outreach Chair.
4. **Unrelated stock photography.** The About page uses Wix template imagery — a
   pottery workshop, children dancing, women on a hammock. None of it depicts harm
   reduction, Narcan, or community health work.
5. **Wix demo content still live in the sitemap:** `/events-1/women-engineers-teach-javascript`,
   `/events-1/lecture-the-gender-pay-gap`, `/events-1/10k-against-breast-cancer`.
6. **Givebutter embed renders blank** on `/support-us`.
7. **No data.** A public-health organization presenting zero overdose statistics.
8. **Public engagement counters** on blog posts display "2 views", "3 views".
9. **Newsletter form marks phone as required**, on every page footer.

---

## 2. Goals and non-goals

### Goals

- Replace all seven pages with a Next.js application that is materially better designed.
- Ship three working backend subsystems: giving, volunteer intake, event/training registry.
- Give the homepage tracker real data instead of a hardcoded figure.
- Establish credibility with grant funders through a focused impact/data section.
- Preserve and sharpen the existing visual brand rather than discard it.

### Non-goals for this phase

- Narcan request and fulfillment workflow.
- A general-purpose CMS. News posts ship as MDX in-repo.
- Migrating the four existing blog posts' comment/like counts.
- Multi-tenant or multi-chapter support.

---

## 3. Decisions taken

| Decision | Choice | Rationale |
| --- | --- | --- |
| Framework | Next.js 15, App Router, TypeScript | Server actions and route handlers cover the backend needs without a separate API service |
| Styling | Tailwind CSS v4 | Token-driven; the brand palette becomes CSS custom properties |
| Database | PostgreSQL via Prisma | Typed schema, straightforward migrations |
| Payments | **Givebutter** (retained) | Already set up, nonprofit-native, handles receipts and tax acknowledgment |
| Donation data | Mirrored into Postgres | Enables a live tracker and an admin ledger without owning PCI scope |
| Admin auth | Auth.js, email magic links | No password storage; allowlist of admin emails |
| Transactional email | Resend | Volunteer acknowledgments, training confirmations |
| Content | MDX files in-repo | No CMS was in scope; versioned and free |
| Hosting | Vercel | Free tier sufficient at current traffic |

### The Givebutter reconciliation

Retaining Givebutter and wanting a live tracker are only compatible because Givebutter
exposes a REST API: base `https://api.givebutter.com/v1`, Bearer-token auth, with
`transactions`, `campaigns`, `contacts`, `payouts`, `plans`, and `webhooks` resources.

**Givebutter remains the system of record for money.** We never compute or assert
balances. We mirror its transactions into Postgres so that the homepage tracker and the
admin ledger can read locally, and we treat our copy as a cache that Givebutter can
always correct.

Two ingestion paths, deliberately redundant:

1. **Webhook** — Givebutter posts transaction events to `/api/webhooks/givebutter`. The
   handler verifies the signature, upserts on the Givebutter transaction id, and returns
   200 quickly.
2. **Reconciliation poll** — a cron route runs hourly, fetches transactions since the
   last successful sync watermark, and upserts the same way.

Upserting on Givebutter's own transaction id makes both paths idempotent, so a webhook
and a poll delivering the same transaction converge rather than double-count. The poll
exists because a missed webhook during a fundraising push would otherwise silently
understate the tracker until someone noticed.

---

## 4. Architecture

```
prevent_overdose/
├── src/
│   ├── app/
│   │   ├── (marketing)/          # public routes, shared shell
│   │   │   ├── page.tsx                    # home
│   │   │   ├── about/  team/  news/  news/[slug]/
│   │   │   ├── contact/
│   │   │   ├── support-us/                 # giving
│   │   │   ├── volunteer/                  # intake form
│   │   │   └── events/  events/[slug]/     # registry + registration
│   │   ├── admin/                # authenticated console
│   │   │   ├── page.tsx                    # dashboard
│   │   │   ├── donations/  volunteers/
│   │   │   ├── events/  subscribers/
│   │   ├── api/
│   │   │   ├── webhooks/givebutter/route.ts
│   │   │   └── cron/sync-givebutter/route.ts
│   │   └── actions/              # server actions per subsystem
│   ├── components/
│   │   ├── ui/                   # primitives: Button, Field, Card, Badge
│   │   ├── marketing/            # Hero, ImpactBand, TrackerCard, PostCard
│   │   └── charts/               # impact data visualization
│   ├── lib/
│   │   ├── db.ts  givebutter.ts  email.ts  auth.ts  validation.ts
│   ├── content/
│   │   ├── posts/*.mdx
│   │   └── team.ts  stats.ts
│   └── styles/tokens.css
├── prisma/schema.prisma
└── docs/superpowers/specs/
```

Each subsystem owns its server actions, its Prisma models, and its admin route, and
shares only the UI primitives and `lib/`. A change to event capacity logic should not
require reading donation code.

---

## 5. Data model

```prisma
model Campaign {
  id             String   @id @default(cuid())
  slug           String   @unique
  name           String
  givebutterId   String?  @unique      // links to a Givebutter campaign
  goalCents      Int
  goalUnitLabel  String   @default("kits")  // tracker renders units, not raw dollars
  centsPerUnit   Int      @default(1500)    // $15 per Narcan kit
  startsAt       DateTime
  endsAt         DateTime?
  isActive       Boolean  @default(false)
  donations      Donation[]
}

model Donation {
  id              String   @id @default(cuid())
  givebutterTxnId String   @unique      // idempotency key for both ingest paths
  amountCents     Int
  netCents        Int?
  currency        String   @default("USD")
  donorName       String?
  donorEmail      String?
  isAnonymous     Boolean  @default(false)
  isRecurring     Boolean  @default(false)
  status          DonationStatus        // SUCCEEDED | REFUNDED | FAILED
  campaignId      String?
  campaign        Campaign? @relation(fields: [campaignId], references: [id])
  occurredAt      DateTime
  rawPayload      Json                  // keep the source record for reconciliation
  createdAt       DateTime @default(now())
  @@index([occurredAt])
  @@index([campaignId, status])
}

model SyncWatermark {
  id           String   @id @default(cuid())
  source       String   @unique         // "givebutter:transactions"
  lastSyncedAt DateTime
  lastStatus   String
  lastError    String?
}

model VolunteerApplication {
  id           String   @id @default(cuid())
  firstName    String
  lastName     String
  email        String
  phone        String?
  interests    String[]                 // outreach, events, training, admin
  availability String?
  message      String?
  status       ApplicationStatus @default(NEW)  // NEW|REVIEWING|ACCEPTED|DECLINED|ARCHIVED
  reviewedAt   DateTime?
  reviewNote   String?
  createdAt    DateTime @default(now())
  @@index([status, createdAt])
}

model Event {
  id            String   @id @default(cuid())
  slug          String   @unique
  kind          EventKind                        // TRAINING | COMMUNITY | FUNDRAISER
  title         String
  description   String
  startsAt      DateTime?                        // nullable: "date TBD" is a real state
  endsAt        DateTime?
  locationName  String
  locationAddr  String?
  isVirtual     Boolean  @default(false)
  capacity      Int?                             // null = unlimited
  isPublished   Boolean  @default(false)
  registrations Registration[]
  @@index([startsAt, isPublished])
  @@index([kind, isPublished])
}

model Registration {
  id          String   @id @default(cuid())
  eventId     String
  event       Event    @relation(fields: [eventId], references: [id], onDelete: Cascade)
  firstName   String
  lastName    String
  email       String
  phone       String?
  status      RegistrationStatus @default(CONFIRMED)  // CONFIRMED|WAITLISTED|CANCELLED|ATTENDED
  checkedInAt DateTime?
  createdAt   DateTime @default(now())
  @@unique([eventId, email])            // one registration per person per event
  @@index([eventId, status])
}

model NewsletterSubscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  firstName String?
  lastName  String?
  status    SubscriberStatus @default(SUBSCRIBED)
  createdAt DateTime @default(now())
}

model AdminUser {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
```

**One `Event` model, not two.** Narcan trainings and community events (the existing
"Launch Party") differ only by `kind`. They share a title, a location, a date, a
capacity, and a registration flow, so modeling them separately would duplicate the
registration table and the admin roster for no gain. `/events` lists everything;
`/events?kind=training` and homepage modules filter. If the two lifecycles genuinely
diverge later, splitting a `kind` column into two tables is a cheap migration —
merging two tables that were never meant to be one is not.

`startsAt` is nullable on purpose: the live site's only real event reads "Date and time
is TBD", and that is a state the schema should represent honestly rather than force
into a fake timestamp. Unscheduled events sort last and render "Date to be announced".

**Capacity handling.** `Registration` creation runs inside a transaction that counts
existing `CONFIRMED` rows against `capacity` and assigns `WAITLISTED` when full. A null
`capacity` means unlimited and skips the check. The `@@unique([eventId, email])`
constraint is what actually prevents a double registration under concurrent submits —
the count check alone would race.

---

## 6. The tracker, specifically

The current widget's problem is not its styling. It is that `$70 / 0% of $10,000` is an
honest number presented in the format most damaging to it. The redesign changes the
unit and the fallback:

- Progress is expressed in **kits funded** (`centsPerUnit`, default $15), not dollars.
  "47 kits funded this month" is legible and dignified at a scale where "$705" is not.
- Below a configurable threshold, the bar is **not rendered at all**. Instead the card
  shows donor count and a recent-gift ticker — momentum framing rather than a visibly
  empty trough.
- Above the threshold, a filled bar renders against the monthly goal.
- If the Givebutter sync watermark is stale beyond a tolerance, the card renders its
  last known good figure with a subtle timestamp rather than a zero.

---

## 7. Error handling

| Failure | Behavior |
| --- | --- |
| Givebutter API unreachable during poll | Watermark records the error, previous data serves, admin dashboard shows a sync-health badge |
| Webhook signature invalid | 401, no write, logged |
| Duplicate transaction from both paths | Upsert on `givebutterTxnId` converges; no double count |
| Event at capacity on submit | Row created as `WAITLISTED`, confirmation email states waitlist position |
| Resend delivery failure | Application/registration still persists; email queued for retry; never block the write on the send |
| Form validation | Zod schemas shared between client and server action; server is authoritative |

The consistent rule: **a failure in a notification path must never lose the user's
submission.** Persist first, notify second.

---

## 8. Seams left for Narcan request

Explicitly not built in this phase. To keep it a clean addition later:

- Do not overload `VolunteerApplication` to carry kit requests. A request has different
  fields (shipping address, quantity, training status), a different lifecycle, and
  different privacy handling.
- When added, it becomes its own `NarcanRequest` model plus `/request-narcan` route and
  `/admin/requests` queue, following the same persist-then-notify shape as volunteer
  intake. No migration to existing tables is required.

---

## 9. Testing

- **Unit:** Zod schemas, tracker unit math and threshold logic, capacity/waitlist assignment, Givebutter payload normalization.
- **Integration:** webhook handler idempotency (same payload twice → one row), poll and
  webhook convergence, concurrent registration against the last open seat; unscheduled (`startsAt: null`) events render and sort correctly.
- **E2E (Playwright):** volunteer submit → admin sees queued application; event
  register → confirmation state, and register-at-capacity → waitlist state; homepage
  renders tracker under both above- and
  below-threshold conditions.
- **Accessibility:** axe pass on every public route; keyboard traversal of nav, forms,
  and admin tables; contrast verified against the brand palette (the blush `#EECECE`
  will not carry body text against paper and must be restricted to fills).

---

## 10. Build sequence

1. Scaffold, tokens, UI primitives, and the **UI mockup** for approval.
2. Marketing pages against static content.
3. Prisma schema and migrations.
4. Givebutter client, webhook, poll, tracker.
5. Volunteer intake and admin queue.
6. Event/training registry, registration, waitlist, admin roster.
7. Auth.js admin gate, dashboard.
8. Impact data section and charts.
9. Accessibility and performance pass.

---

## 11. Open questions

1. **Givebutter credentials** — an API key from Settings → Integrations, and the
   campaign id to link. Needed before the tracker can show real data; until then it runs
   against fixtures.
2. **Real statistics** — the impact section needs either CT DPH / CDC WONDER figures or
   the org's own program numbers. Placeholder data must be visibly labeled as such.
3. **Photography** — the Wix stock imagery cannot carry over. Options are licensed
   documentary photography, illustration, or a type- and data-led design that uses
   little photography at all.
4. **Board roster** — five roles currently read `COMING SOON`. If real names are not
   available, the page should be restructured around the open-roles call rather than
   displaying five empty cards.
