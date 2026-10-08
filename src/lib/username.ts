export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 20;

const ALLOWED_PATTERN =
  /^[A-Za-z0-9_ء-غف-يپچژکگی]+$/u;
const ARABIC_DIGIT_ZERO = 0x0660;
const PERSIAN_DIGIT_ZERO = 0x06f0;

const RESERVED = new Set([
  "admin",
  "administrator",
  "mahdi",
  "mahdidelavar",
  "mahdi_delavar",
  "moderator",
  "root",
  "support",
  "system",
  "anonymous",
  "null",
  "undefined",
  "ادمین",
  "مدیر",
  "مهدی",
  "مهدی_دلاور",
  "پشتیبانی",
  "ناشناس",
]);

export type UsernameResult =
  | { ok: true; username: string }
  | { ok: false; message: string };

/** Same letters whichever keyboard typed them: Arabic ye/kaf and non-ASCII digits are folded. */
function foldCharacters(value: string): string {
  return value
    .replace(/[يى]/gu, "ی")
    .replace(/ك/gu, "ک")
    .replace(/[٠-٩]/gu, (digit) => String(digit.charCodeAt(0) - ARABIC_DIGIT_ZERO))
    .replace(/[۰-۹]/gu, (digit) => String(digit.charCodeAt(0) - PERSIAN_DIGIT_ZERO));
}

/** The form a username is compared in. Two names with the same key are the same name. */
export function usernameKey(username: string): string {
  return foldCharacters(username.trim()).toLowerCase();
}

/** Validates a username on the client and the server with the same rules. */
export function normalizeUsername(value: unknown): UsernameResult {
  if (typeof value !== "string") {
    return { ok: false, message: "اسم باید متن ساده باشه." };
  }
  const username = foldCharacters(value.trim());
  const length = [...username].length;
  if (length < USERNAME_MIN_LENGTH || length > USERNAME_MAX_LENGTH) {
    return { ok: false, message: "اسم باید بین ۳ تا ۲۰ کاراکتر باشه." };
  }
  if (!ALLOWED_PATTERN.test(username)) {
    return {
      ok: false,
      message: "فقط حروف فارسی یا انگلیسی، عدد و _ مجازه (بدون فاصله).",
    };
  }
  if (RESERVED.has(username.toLowerCase())) {
    return { ok: false, message: "این اسم قابل انتخاب نیست. یه اسم دیگه امتحان کن." };
  }
  return { ok: true, username };
}
