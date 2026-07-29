import "server-only";

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { getDatabase } from "@/db";
import { visitors, type Visitor } from "@/db/schema";

export const VISITOR_COOKIE_NAME = "challenge_visitor_id";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function setVisitorCookie(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  visitorId: string,
): void {
  cookieStore.set(VISITOR_COOKIE_NAME, visitorId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ONE_YEAR_SECONDS,
  });
}

export async function ensureVisitor(): Promise<Visitor> {
  const cookieStore = await cookies();
  const rawVisitorId = cookieStore.get(VISITOR_COOKIE_NAME)?.value;
  const validVisitorId =
    rawVisitorId && UUID_PATTERN.test(rawVisitorId) ? rawVisitorId : null;
  const db = getDatabase();

  if (validVisitorId) {
    const [existing] = await db
      .select()
      .from(visitors)
      .where(eq(visitors.id, validVisitorId))
      .limit(1);

    if (existing) {
      const now = new Date();
      await db
        .update(visitors)
        .set({ lastSeenAt: now })
        .where(eq(visitors.id, existing.id));
      return { ...existing, lastSeenAt: now };
    }
  }

  const visitorId = crypto.randomUUID();
  const [visitor] = await db
    .insert(visitors)
    .values({ id: visitorId })
    .returning();
  setVisitorCookie(cookieStore, visitorId);
  return visitor;
}

export function normalizeDisplayName(value: unknown): string {
  if (typeof value !== "string") {
    throw new Error("نام نمایشی باید متن ساده باشد.");
  }

  const normalized = value.trim().replace(/\s+/gu, " ");
  if (normalized.length < 2 || normalized.length > 40) {
    throw new Error("نام نمایشی باید بین ۲ تا ۴۰ کاراکتر باشد.");
  }
  if (/[<>\u0000-\u001f\u007f]/u.test(normalized)) {
    throw new Error("نام نمایشی شامل کاراکتر غیرمجاز است.");
  }
  return normalized;
}
