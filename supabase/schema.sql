-- PreventOverdose — form + workshop persistence.
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- Safe to re-run: every statement is guarded.

-- ---------------------------------------------------------------------------
-- Every public form submission, one row each. `payload` is the validated form
-- data (minus the honeypot). Toggle `handled` / write `notes` right in the
-- Supabase Table Editor to track what you've dealt with.
-- ---------------------------------------------------------------------------
create table if not exists public.submissions (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  kind        text        not null,
  email       text,
  payload     jsonb       not null,
  handled     boolean     not null default false,
  handled_at  timestamptz,
  notes       text
);

create index if not exists submissions_created_at_idx on public.submissions (created_at desc);
create index if not exists submissions_kind_idx       on public.submissions (kind);
create index if not exists submissions_handled_idx    on public.submissions (handled);

-- ---------------------------------------------------------------------------
-- Workshop registrations. One row per person per session. The unique index
-- blocks the same email registering twice for the same workshop.
-- ---------------------------------------------------------------------------
create table if not exists public.workshop_registrations (
  id             bigint generated always as identity primary key,
  created_at     timestamptz not null default now(),
  workshop_slug  text        not null,
  name           text        not null,
  email          text        not null,
  attendees      integer     not null default 1,
  note           text,
  handled        boolean     not null default false,
  notes          text
);

create unique index if not exists workshop_registrations_unique
  on public.workshop_registrations (workshop_slug, lower(email));

create index if not exists workshop_registrations_slug_idx
  on public.workshop_registrations (workshop_slug);

-- ---------------------------------------------------------------------------
-- Access model: SERVER ONLY.
--
-- This site has no user accounts. Nobody signs in. Every read and write goes
-- through Next.js server code holding the Supabase *secret* key, which bypasses
-- RLS. Form submitters are anonymous — they POST a form and get an "ok", they
-- never read anything back. So there is no "your own rows" to scope to; the
-- correct posture is "nobody but the server gets in".
--
-- Two layers enforce that:
--   1. RLS enabled with ZERO policies  → denies the `anon` (publishable key)
--      and `authenticated` roles by default.
--   2. REVOKE of table/view grants     → defense in depth: even if a policy
--      were ever added by mistake, the public roles still have no privilege.
--
-- `service_role` keeps full access (granted by default, bypasses RLS).
--
-- If you later add a "look up my registration" feature, that needs Supabase
-- Auth (email OTP) first; then a policy like
--   using ( email = auth.jwt() ->> 'email' )
-- becomes meaningful. Not before.
-- ---------------------------------------------------------------------------
alter table public.submissions            enable row level security;
alter table public.workshop_registrations enable row level security;

revoke all on public.submissions            from anon, authenticated;
revoke all on public.workshop_registrations from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Live per-workshop registration count (sums attendees, not just rows).
-- `security_invoker` makes the view honour the caller's RLS on the underlying
-- table — so only the service role can read it, same as the table itself.
-- ---------------------------------------------------------------------------
create or replace view public.workshop_counts
  with (security_invoker = on) as
  select workshop_slug,
         count(*)               as registrations,
         coalesce(sum(attendees), 0)::bigint as people
  from public.workshop_registrations
  group by workshop_slug;

revoke all on public.workshop_counts from anon, authenticated;
