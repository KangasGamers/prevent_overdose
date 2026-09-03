/**
 * Spam trap. Hidden from people (off-screen, aria-hidden, not tabbable); bots
 * that fill every field trip it. The API drops any submission where `website`
 * is non-empty. Read it in a form's submit handler with
 * `new FormData(e.currentTarget).get("website")`.
 */
export function Honeypot() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
    >
      <label>
        Do not fill this in
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
