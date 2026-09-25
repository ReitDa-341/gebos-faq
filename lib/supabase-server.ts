import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { SUPABASE_ANON, SUPABASE_URL, fehlendeKonfiguration } from "./config";
import type { CookieSetter, CookieToSet } from "./cookies";

/** In Route-Handlers, mit der Sitzung des Besuchers. */
export async function supabaseServer() {
  const fehlt = fehlendeKonfiguration();
  if (fehlt.length) throw new Error("Konfiguration fehlt: " + fehlt.join(", "));
  const store = await cookies();
  const setCookie = store.set.bind(store) as unknown as CookieSetter;

  return createServerClient(SUPABASE_URL, SUPABASE_ANON, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list: CookieToSet[]) => {
        try {
          for (const { name, value, options } of list) setCookie(name, value, options);
        } catch {
          // In Server-Komponenten ist Schreiben nicht erlaubt; die Middleware erneuert die Sitzung.
        }
      },
    },
  });
}
