import { createBrowserClient } from "@supabase/ssr";

import { SUPABASE_ANON, SUPABASE_URL, fehlendeKonfiguration } from "./config";

/**
 * Nur der Browser-Zugang. Diese Datei darf NICHTS importieren, was es
 * ausschliesslich auf dem Server gibt (etwa "next/headers") — sonst zieht
 * jede Client-Komponente, die hier etwas holt, den Servercode mit und der
 * Build bricht ab. Server- und Dienstzugang liegen in supabase-server.ts.
 */

export { SUPABASE_ANON, SUPABASE_URL };

/** Im Browser. Unterliegt RLS — sieht nur, was ein angemeldeter Zugang darf. */
export function supabaseBrowser() {
  const fehlt = fehlendeKonfiguration();
  if (fehlt.length) throw new Error("Konfiguration fehlt: " + fehlt.join(", "));
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON);
}
