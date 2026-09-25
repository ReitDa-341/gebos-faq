# Gebos FAQ

Interne FAQ zur Zeiterfassung mit Gebos TimeManagement (Three for One Trading, Marke **341**).
Nur für Mitarbeiter — jede Seite und jedes Bild ist hinter einer Anmeldung.

**Stack:** Next.js 15 (App Router) auf Vercel · Supabase Auth (ein gemeinsamer Zugang).
Aufbau wie beim Dashboard Theke.

| Datei | Zweck |
|---|---|
| `public/faq.html` | Die FAQ selbst (fertige Seite) |
| `public/img/` | Alle Screenshots, Namen unkenntlich gemacht |
| `middleware.ts` | Lässt nur angemeldete Besucher durch |
| `app/login/page.tsx` | Anmeldeseite (Zugang + Passwort) |
| `app/logout/route.ts` | Abmelden |

Einrichtung: siehe `INBETRIEBNAHME.md`.
