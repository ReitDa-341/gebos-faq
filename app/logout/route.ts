import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

/** Abmelden: Sitzung beenden und zurueck zur Anmeldung. */
export async function GET(req: Request) {
  try {
    const supabase = await supabaseServer();
    await supabase.auth.signOut();
  } catch (err) {
    console.error("[logout]", err);
  }
  return NextResponse.redirect(new URL("/login", req.url), { status: 303 });
}
