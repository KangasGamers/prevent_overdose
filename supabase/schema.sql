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
-- Row-level security: lock both tables to the service role only. The site
-- talks to Supabase with the service-role key from server code, which bypasses
-- RLS; enabling it with no policies means nothing else (anon key, browser) can
-- read or write.
-- ---------------------------------------------------------------------------
alter table public.submissions            enable row level security;
alter table public.workshop_registrations enable row level security;

-- ---------------------------------------------------------------------------
-- Live per-workshop registration count (sums attendees, not just rows).
-- ---------------------------------------------------------------------------
create or replace view public.workshop_counts as
  select workshop_slug,
         count(*)               as registrations,
         coalesce(sum(attendees), 0)::bigint as people
  from public.workshop_registrations
  group by workshop_slug;
