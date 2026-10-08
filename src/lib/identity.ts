import "server-only";

import { and, eq, isNull, sql } from "drizzle-orm";
import { getDatabase } from "@/db";
import { visitors, type Visitor } from "@/db/schema";
import { ApiError, isUniqueViolation } from "@/lib/api";
import {
  formatRecoveryCode,
  generateRecoveryCode,
  hashRecoveryCode,
  isRecoveryRateLimited,
  normalizeRecoveryCode,
  recordFailedRecovery,
  verifyRecoveryCode,
} from "@/lib/recovery";
import { normalizeUsername, usernameKey } from "@/lib/username";
import { bindVisitorCookie } from "@/lib/visitor";

const TAKEN_MESSAGE = "این اسم قبلاً گرفته شده. یه اسم دیگه امتحان کن.";
const INVALID_RECOVERY_MESSAGE = "اسم یا کد بازیابی درست نیست.";

/** Claims a username for this visitor and returns the recovery code, which is never readable again. */
export async function claimUsername(visitor: Visitor, rawUsername: unknown) {
  if (visitor.displayName) {
    throw new ApiError(409, "USERNAME_ALREADY_SET", "برای این مرورگر قبلاً اسم ثبت شده.");
  }
  const result = normalizeUsername(rawUsername);
  if (!result.ok) throw new ApiError(400, "INVALID_USERNAME", result.message);

  const code = generateRecoveryCode();
  const recoveryCodeHash = await hashRecoveryCode(code);
  let updated: { displayName: string | null }[];
  try {
    updated = await getDatabase()
      .update(visitors)
      .set({ displayName: result.username, recoveryCodeHash, nameClaimedAt: new Date() })
      .where(and(eq(visitors.id, visitor.id), isNull(visitors.displayName)))
      .returning({ displayName: visitors.displayName });
  } catch (error) {
    // The unique index on lower(display_name) is what decides a race between two claims.
    if (isUniqueViolation(error)) throw new ApiError(409, "USERNAME_TAKEN", TAKEN_MESSAGE);
    throw error;
  }
  if (!updated.length) {
    throw new ApiError(409, "USERNAME_ALREADY_SET", "برای این مرورگر قبلاً اسم ثبت شده.");
  }
  return { username: result.username, recoveryCode: formatRecoveryCode(code) };
}

/** Rebinds this browser's cookie to the visitor that owns the username, if the code matches. */
export async function recoverVisitor(rawUsername: unknown, rawCode: unknown, ipHash: string) {
  const key = typeof rawUsername === "string" ? usernameKey(rawUsername).slice(0, 40) : "";
  if (!key) throw new ApiError(400, "INVALID_RECOVERY", INVALID_RECOVERY_MESSAGE);
  if (await isRecoveryRateLimited(key, ipHash)) {
    throw new ApiError(
      429,
      "RECOVERY_RATE_LIMITED",
      "تعداد تلاش‌ها زیاد شد. چند دقیقه‌ی دیگه دوباره امتحان کن.",
    );
  }

  const code = normalizeRecoveryCode(rawCode);
  const [owner] = await getDatabase()
    .select()
    .from(visitors)
    .where(eq(sql`lower(${visitors.displayName})`, key))
    .limit(1);
  const matches =
    code !== null &&
    owner?.recoveryCodeHash != null &&
    (await verifyRecoveryCode(code, owner.recoveryCodeHash));
  if (!owner || !matches) {
    await recordFailedRecovery(key, ipHash);
    throw new ApiError(400, "INVALID_RECOVERY", INVALID_RECOVERY_MESSAGE);
  }

  await bindVisitorCookie(owner.id);
  return { username: owner.displayName as string };
}

export async function regenerateRecoveryCode(visitor: Visitor) {
  if (!visitor.displayName) {
    throw new ApiError(403, "USERNAME_REQUIRED", "اول باید یه اسم ثبت کنی.");
  }
  const code = generateRecoveryCode();
  await getDatabase()
    .update(visitors)
    .set({ recoveryCodeHash: await hashRecoveryCode(code) })
    .where(eq(visitors.id, visitor.id));
  return { recoveryCode: formatRecoveryCode(code) };
}
