"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase";

/**
 * Wohin nach dem Anmelden. Wird erst beim Absenden aus der Adresse gelesen.
 * Nur eigene Pfade sind erlaubt: "//fremde-seite.example" beginnt ebenfalls mit
 * einem Schraegstrich, ist aber eine protokollrelative Adresse und wuerde auf
 * eine fremde Seite fuehren; genauso Zeilenumbrueche. Beides wird abgewiesen.
 */
function zielNachAnmeldung(): string {
  try {
    const roh = new URLSearchParams(window.location.search).get("weiter");
    if (!roh) return "/";
    if (!roh.startsWith("/") || roh.startsWith("//") || roh.startsWith("/\\")) return "/";
    if (/[\r\n\t]/.test(roh)) return "/";
    return roh;
  } catch {
    return "/";
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(
        /invalid login credentials/i.test(error.message)
          ? "Zugangsdaten stimmen nicht."
          : error.message,
      );
      setBusy(false);
      return;
    }
    // Die FAQ ist eine eigene Seite ausserhalb von Next.js – daher ganz neu laden.
    window.location.assign(zielNachAnmeldung());
  }

  return (
    <div className="loginwrap">
      <form className="loginbox" onSubmit={submit}>
        <div className="brand">
          <span className="mark">341</span>
          <span className="sep">/</span>
          <span>Gebos FAQ</span>
        </div>
        <h1>Anmelden</h1>

        {error ? <p className="loginerr">{error}</p> : null}

        <div className="fld">
          <label htmlFor="email">Zugang</label>
          <input
            id="email" type="email" value={email} autoComplete="username" required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="fld">
          <label htmlFor="password">Passwort</label>
          <input
            id="password" type="password" value={password} autoComplete="current-password" required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn" type="submit" disabled={busy} style={{ width: "100%" }}>
          {busy ? "Einen Moment …" : "Anmelden"}
        </button>

        <p style={{ fontSize: 13, color: "var(--faint)", marginTop: 16, marginBottom: 0 }}>
          Gemeinsamer Zugang für alle Mitarbeiter.
        </p>
      </form>
    </div>
  );
}
