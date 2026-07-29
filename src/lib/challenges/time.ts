export const LEADERBOARD_TIME_ZONE = "Asia/Tehran";

function zonedParts(date: Date): Record<string, number> {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: LEADERBOARD_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  return Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  );
}

function getOffsetMilliseconds(date: Date): number {
  const parts = zonedParts(date);
  const renderedAsUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );
  return renderedAsUtc - date.getTime();
}

function localMidnightToUtc(year: number, month: number): Date {
  const guess = new Date(Date.UTC(year, month - 1, 1));
  let result = new Date(guess.getTime() - getOffsetMilliseconds(guess));
  result = new Date(guess.getTime() - getOffsetMilliseconds(result));
  return result;
}

export function getCurrentMonthRange(now = new Date()): {
  start: Date;
  end: Date;
} {
  const { year, month } = zonedParts(now);
  const nextYear = month === 12 ? year + 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;

  return {
    start: localMidnightToUtc(year, month),
    end: localMidnightToUtc(nextYear, nextMonth),
  };
}
