import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDatabase } from "@/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await getDatabase().execute(sql`select 1`);
    return NextResponse.json(
      { status: "ok", database: "connected" },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error(
      "Health check failed",
      error instanceof Error ? error.message : "unknown error",
    );
    return NextResponse.json(
      { status: "error" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
