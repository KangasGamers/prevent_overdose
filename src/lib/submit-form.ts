import type { FormKind } from "./forms";

/**
 * POST a form to /api/submit. Resolves on success, throws an Error whose
 * message is safe to show the user on failure.
 */
export async function submitForm(
  kind: FormKind,
  data: Record<string, unknown>,
): Promise<void> {
  let res: Response;
  try {
    res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, data }),
    });
  } catch {
    throw new Error(
      "Couldn't reach the server. Check your connection and try again.",
    );
  }

  if (!res.ok) {
    let message = "Something went wrong. Please try again.";
    try {
      const json = await res.json();
      if (typeof json?.error === "string") message = json.error;
    } catch {
      /* keep default */
    }
    throw new Error(message);
  }
}
