import "server-only";

import {
  createHash,
  randomBytes,
  randomInt,
  scrypt,
  timingSafeEqual,
} from "node:crypto";
import { and, count, eq, gte, lt } from "drizzle-orm";
import { getDatabase } from "@/db";
import { recoveryAttempts } from "@/db/schema";

// No 0/O, 1/I/L: the code is read off a screen and typed on another device.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const CODE_LENGTH = 10;
const CODE_GROUP = 5;
const SALT_BYTES = 16;
const KEY_BYTES = 32;

const USERNAME_WINDOW_MS = 15 * 60 * 1000;
const USERNAME_MAX_FAILURES = 5;
const IP_WINDOW_MS = 60 * 60 * 1000;
const IP_MAX_FAILURES = 20;
const RETENTION_MS = 24 * 60 * 60 * 1000;

function deriveKey(code: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(code, salt, KEY_BYTES, (error, key) => (error ? reject(error) : resolve(key)));
  });
}

export function generateRecoveryCode(): string {
  let code = "";
  for (let index = 0; index < CODE_LENGTH; index++) {
    code += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)];
  }
  return code;
}

/** `XXXXX-XXXXX`, the way the code is shown to the visitor. */
export function formatRecoveryCode(code: string): string {
  return `${code.slice(0, CODE_GROUP)}-${code.slice(CODE_GROUP)}`;
}

/** Accepts the code with or without the dash, in any letter case. Null when it can't be a code. */
export function normalizeRecoveryCode(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const code = value.replace(/[\s-]/gu, "").toUpperCase();
  if (code.length !== CODE_LENGTH) return null;
  return [...code].every((character) => CODE_ALPHABET.includes(character)) ? code : null;
}

export async function hashRecoveryCode(code: string): Promise<string> {
  const salt = randomBytes(SALT_BYTES);
  const key = await deriveKey(code, salt);
  return `${salt.toString("hex")}:${key.toString("hex")}`;
}

export async function verifyRecoveryCode(code: string, stored: string): Promise<boolean> {
  const [saltHex, keyHex] = stored.split(":");
  if (!saltHex || !keyHex) return false;
  const expected = Buffer.from(keyHex, "hex");
  const actual = await deriveKey(code, Buffer.from(saltHex, "hex"));
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

/** The client address as the reverse proxy reports it, hashed so raw addresses are never stored. */
export function hashClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip") || "unknown";
  return createHash("sha256").update(ip).digest("hex");
}

async function countFailures(
  column: typeof recoveryAttempts.usernameKey | typeof recoveryAttempts.ipHash,
  value: string,
  windowMs: number,
): Promise<number> {
  const [row] = await getDatabase()
    .select({ total: count() })
    .from(recoveryAttempts)
    .where(and(eq(column, value), gte(recoveryAttempts.createdAt, new Date(Date.now() - windowMs))));
  return row.total;
}

export async function isRecoveryRateLimited(key: string, ipHash: string): Promise<boolean> {
  const [byUsername, byIp] = await Promise.all([
    countFailures(recoveryAttempts.usernameKey, key, USERNAME_WINDOW_MS),
    countFailures(recoveryAttempts.ipHash, ipHash, IP_WINDOW_MS),
  ]);
  return byUsername >= USERNAME_MAX_FAILURES || byIp >= IP_MAX_FAILURES;
}

export async function recordFailedRecovery(key: string, ipHash: string): Promise<void> {
  const db = getDatabase();
  await db.insert(recoveryAttempts).values({ usernameKey: key, ipHash });
  await db
    .delete(recoveryAttempts)
    .where(lt(recoveryAttempts.createdAt, new Date(Date.now() - RETENTION_MS)));
}
