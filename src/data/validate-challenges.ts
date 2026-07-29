import rawChallenges from "./challenges.json" with { type: "json" };
import { validateChallenges } from "./challenge-validator.ts";

const challenges = validateChallenges(rawChallenges);
console.log(`Validated ${challenges.length} challenge(s).`);
