import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import {
  SUPABASE_ANON, SUPABASE_URL, fehlendeKonfiguration, konfigurationsHinweis,
} from "./lib/config";
import type { CookieSetter, CookieToSet } from "./lib/cookies";

const NURTEXT = { "content-type": "text/plain; charset=utf-8" };

/**
 * Erneuert die Supabase-Sitzung bei jeder Anfrage und schuetzt die FAQ.
 * Geschuetzt ist alles: die FAQ-Seite, alle Bilder und das Abmelden.
 * Frei ist nur die Anmeldeseite.
 */
export async function middleware(req: NextRequest) {
  // Ohne Konfiguration kann nicht geprueft werden, wer angemeldet ist. Dann
  // wird NICHTS durchgelassen — aber mit einer Meldung, die sagt was fehlt.
  const fehlt = fehlendeKonfiguration();
  if (fehlt.length) {
    return new NextResponse(konfigurationsHinweis(fehlt), { status: 503, headers: NURTEXT });
  }

  try {
    return await pruefeSitzung(req);
  } catch (err) {
    // Der Grund gehoert ins Vercel-Protokoll, nicht auf den Bildschirm.
    console.error("[middleware]", err);
    return new NextResponse(
      "Die Anmeldung konnte gerade nicht geprueft werden. Bitte neu laden.\n" +
      "Haelt das an, steht der Grund im Vercel-Protokoll unter Logs.",
      { status: 503, headers: NURTEXT },
    );
  }
}

async function pruefeSitzung(req: NextRequest) {
  let res = NextResponse.next({ request: req });

  const supabase = createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (list: CookieToSet[]) => {
          for (const { name, value } of list) req.cookies.set(name, value);
          res = NextResponse.next({ request: req });
          // Erst nach dem Neuaufbau der Antwort binden — vorher zeigt es auf die alte.
          const setOnResponse = res.cookies.set.bind(res.cookies) as unknown as CookieSetter;
          for (const { name, value, options } of list) setOnResponse(name, value, options);
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();
  const path = req.nextUrl.pathname;

  if (!user && !path.startsWith("/login")) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    url.searchParams.set("weiter", path);
    return NextResponse.redirect(url);
  }
  if (user && path.startsWith("/login")) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: [
    // Alles ausser den Programmdateien von Next.js. Die FAQ-Bilder sind bewusst geschuetzt.
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
