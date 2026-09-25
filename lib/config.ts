/**
 * Die Konfigurationswerte an einer Stelle, ohne jede Abhaengigkeit — damit
 * sowohl die Middleware (Edge) als auch Server und Browser sie pruefen koennen.
 *
 * Absichtlich KEIN Absturz beim Laden des Moduls: beim Bauen sind die Werte
 * nicht gesetzt, und ein Fehler hier wuerde den Build abbrechen statt die
 * Anwendung zur Laufzeit verstaendlich meckern zu lassen.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** Namen der fehlenden Pflichtwerte. Leere Liste heisst: alles vorhanden. */
export function fehlendeKonfiguration(): string[] {
  const fehlt: string[] = [];
  if (!SUPABASE_URL) fehlt.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!SUPABASE_ANON) fehlt.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  return fehlt;
}

/**
 * Namen der Umgebungsvariablen, die zur Laufzeit ankommen und nach
 * Konfiguration aussehen. NUR NAMEN, niemals Werte — die Seite ist oeffentlich
 * erreichbar. Dient der Fehlersuche: ein Tippfehler im Namen wird so sichtbar.
 */
function sichtbareNamen(): string[] {
  try {
    return Object.keys(process.env)
      .filter((n) => /SUPABASE|NEXT_PUBLIC/i.test(n))
      .sort();
  } catch {
    return [];
  }
}

/** Klartext fuer den Betreiber, wenn die Anwendung ohne Konfiguration laeuft. */
export function konfigurationsHinweis(fehlt: string[]): string {
  const da = sichtbareNamen();
  return [
    "Gebos FAQ ist noch nicht vollstaendig eingerichtet.",
    "",
    "Diese Umgebungsvariablen fehlen:",
    ...fehlt.map((n) => "  - " + n),
    "",
    "Angekommen sind diese Namen (nur Namen, keine Werte):",
    ...(da.length ? da.map((n) => "  - " + n) : ["  (keine)"]),
    "",
    "Einzutragen in Vercel unter Settings, Environment Variables.",
    "",
    "Danach neu veroeffentlichen und dabei den Build-Cache NICHT verwenden:",
    "Werte mit dem Vornamen NEXT_PUBLIC_ werden beim Bauen fest in den Code",
    "geschrieben, ein nachtraegliches Eintragen allein wirkt also nicht.",
  ].join("\n");
}
