import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client, using the service-role key. Never import this
 * into a Client Component — the key bypasses row-level security.
 *
 * Returns null when the env isn't configured, so callers can degrade to
 * "email only" rather than crash.
 */
let cached: SupabaseClient | null = null;

export function getDb(): SupabaseClient | null {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export type WorkshopCount = { registrations: number; people: number };

/** Live registration counts keyed by workshop slug. Empty object on any error. */
export async function getWorkshopCounts(): Promise<Record<string, WorkshopCount>> {
  const db = getDb();
  if (!db) return {};
  try {
    const { data, error } = await db
      .from("workshop_counts")
      .select("workshop_slug, registrations, people");
    if (error || !data) return {};
    const out: Record<string, WorkshopCount> = {};
    for (const row of data as {
      workshop_slug: string;
      registrations: number;
      people: number;
    }[]) {
      out[row.workshop_slug] = {
        registrations: Number(row.registrations) || 0,
        people: Number(row.people) || 0,
      };
    }
    return out;
  } catch {
    return {};
  }
}
