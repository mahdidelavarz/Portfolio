import type { ConfigValue, LabConfig } from "./types.ts";

const FIRST_STRONG_ISOLATE = "⁨";
const POP_DIRECTIONAL_ISOLATE = "⁩";

export function formatNumber(value: number, fractionDigits = 0): string {
  return value.toLocaleString("fa-IR", {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  });
}

export function formatMs(value: number): string {
  const rounded = Math.round(value);
  const digits =
    value < 10 && rounded !== value
      ? formatNumber(value, 1)
      : formatNumber(rounded);
  return `${digits}ms`;
}

/** Wraps a value in Unicode isolates so it keeps its order inside RTL prose. */
export function isolate(text: string): string {
  return `${FIRST_STRONG_ISOLATE}${text}${POP_DIRECTIONAL_ISOLATE}`;
}

export function padTicketNumber(value: number): string {
  return String(value).padStart(2, "0");
}

export function readFlag(config: LabConfig, field: string): boolean {
  return config[field] === true;
}

export function readChoice(config: LabConfig, field: string): ConfigValue {
  return config[field] ?? null;
}
