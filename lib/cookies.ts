/**
 * Typen fuer die Cookie-Schnittstelle von "@supabase/ssr".
 *
 * Warum das hier ausgeschrieben steht: Supabase bietet zwei Varianten dieser
 * Schnittstelle an. Bei mehreren Moeglichkeiten leitet TypeScript die Typen der
 * Rueckruf-Parameter nicht mehr selbst her, deshalb muessen sie benannt werden.
 * Nur Typen, kein ausfuehrbarer Code — beim Bauen bleibt davon nichts uebrig.
 */

/** Ein Cookie, wie Supabase es zum Setzen uebergibt. */
export type CookieToSet = {
  name: string;
  value: string;
  options?: Record<string, unknown>;
};

/**
 * Schmale Sicht auf eine set-Methode eines Cookie-Speichers. Next.js beschreibt
 * diese Methode je nach Version und Speicher (Anfrage, Antwort, Server-Komponente)
 * unterschiedlich; die Optionen kommen unveraendert von Supabase und werden nur
 * weitergegeben. Beim Umwandeln immer .bind(speicher) verwenden, sonst verliert
 * die Methode ihre Bindung.
 */
export type CookieSetter = (
  name: string,
  value: string,
  options?: Record<string, unknown>,
) => void;
