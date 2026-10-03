import type { Simulator } from "../types.ts";
import { renderStormSimulator } from "./renderStorm.ts";
import { repeatedCalculationSimulator } from "./repeatedCalculation.ts";
import { waterfallSimulator } from "./waterfall.ts";

const simulators: Record<string, Simulator> = {
  [waterfallSimulator.key]: waterfallSimulator,
  [repeatedCalculationSimulator.key]: repeatedCalculationSimulator,
  [renderStormSimulator.key]: renderStormSimulator,
};

export function getSimulator(key: string): Simulator | null {
  return simulators[key] ?? null;
}
