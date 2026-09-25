# Gebos FAQ — Inbetriebnahme

Drei Stationen, etwa 15 Minuten. Aufbau wie beim Dashboard Theke:
GitHub → Vercel, Anmeldung über Supabase mit einem gemeinsamen Zugang.
Reihenfolge einhalten: Vercel braucht die Supabase-Werte.

---

## 1 · Supabase — Zugang (5 Minuten)

Eigenes Projekt für die FAQ, getrennt vom Dashboard Theke. Sonst käme man mit
dem FAQ-Zugang auch auf die Theken-Tafel.

1. Neues Projekt anlegen, Name `gebos-faq`. Region **Frankfurt**.
2. **Authentication → Providers → Email**
   - „Confirm email" **aus**
   - „Enable signup" **aus** — sonst kann sich jeder selbst anmelden
3. **Authentication → Users → Add user**
   - E-Mail: z. B. `faq@341.gg`
   - Passwort: lang, aber tippbar — das bekommen alle Mitarbeiter
   - „Auto Confirm User" **an**
4. **Project Settings → API** → zwei Werte offen lassen, die brauchst du gleich:
   Project URL und `anon public`

Eine Datenbank-Tabelle braucht die FAQ nicht, der SQL Editor bleibt leer.

---

## 2 · GitHub — Code ablegen (2 Minuten)

Das Repository vorher auf github.com anlegen: `gebos-faq`, **privat** und
**leer**, ohne README — sonst kollidiert der erste Push.

```
cd C:\dev\gebos-faq
git init
git add .
git commit -m "Gebos FAQ"
git branch -M main
git remote add origin https://github.com/ReitDa-341/gebos-faq.git
git push -u origin main
```

---

## 3 · Vercel — veröffentlichen (5 Minuten)

1. **Add New → Project** → das Repository `gebos-faq` importieren.
   Next.js wird erkannt, keine Build-Einstellungen nötig.
2. **Environment Variables** → die zwei Zeilen aus `VERCEL-ENV.txt` eintragen.
3. **Deploy.**
4. Adresse notieren, z. B. `https://gebos-faq.vercel.app`

**Wenn der Build rot wird:** das Log kopieren und mir schicken.

---

## 4 · Probe

1. Vercel-Adresse öffnen → die Anmeldeseite erscheint.
2. Falsches Passwort → „Zugangsdaten stimmen nicht."
3. Richtiger Zugang → die FAQ erscheint mit allen Bildern.
4. Oben rechts **Abmelden** → zurück zur Anmeldung.
5. Bildadresse direkt in einem privaten Fenster öffnen (z. B. `/img/terminal-anonym.png`)
   → auch hier kommt zuerst die Anmeldung.

---

## Inhalte ändern

Die FAQ steht fertig in `public/faq.html`, die Bilder in `public/img/`.
Neue Fassung hineinkopieren, dann:

```
cd C:\dev\gebos-faq
git add .
git commit -m "FAQ aktualisiert"
git push
```

Vercel veröffentlicht danach automatisch neu.
