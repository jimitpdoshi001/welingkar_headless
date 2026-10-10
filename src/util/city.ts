/**
 * Normalise the legacy city spellings ("Bangalore" / "Banglore") to the
 * preferred "Bengaluru" in user-facing text. Case is preserved so
 * "bangalore" -> "bengaluru" and "Bangalore" -> "Bengaluru".
 *
 * This only touches display strings — never URLs, slugs or machine keys.
 */
export const CITY_PATTERN = /\bBang(?:a)?lore\b/gi;

export function fixCity<T extends string | null | undefined>(input: T): T {
  if (!input) return input;
  return input.replace(CITY_PATTERN, (m) => (/^[A-Z]/.test(m) ? "Bengaluru" : "bengaluru")) as T;
}
