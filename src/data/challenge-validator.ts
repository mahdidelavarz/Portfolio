export type ChallengeDifficulty = "beginner" | "intermediate" | "advanced";
export type ChallengeStatus = "draft" | "published";
export type ChallengeType = "output" | "debug" | "concept";

export interface ChallengeOption {
  id: string;
  label: string;
  content: string;
}

export interface Challenge {
  id: string;
  slug: string;
  title: string;
  description: string;
  technology: string;
  topic: string;
  difficulty: ChallengeDifficulty;
  type: ChallengeType;
  codeLanguage: string;
  code: string;
  options: ChallengeOption[];
  correctOptionId: string;
  shortAnswer: string;
  explanationSteps: string[];
  correctedCode: string | null;
  takeaway: string;
  estimatedMinutes?: number;
  publishedAt: string;
  status: ChallengeStatus;
  linkedinPostUrl: string | null;
}

export type PublicChallenge = Omit<
  Challenge,
  | "correctOptionId"
  | "shortAnswer"
  | "explanationSteps"
  | "correctedCode"
  | "takeaway"
>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(
  value: unknown,
  field: string,
  context: string,
): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${context}: ${field} must be a non-empty string.`);
  }
  return value;
}

function validateLinkedInUrl(value: unknown, context: string): string | null {
  if (value === null) return null;
  const urlValue = requiredString(value, "linkedinPostUrl", context);

  try {
    const url = new URL(urlValue);
    const isLinkedIn =
      url.hostname === "linkedin.com" || url.hostname.endsWith(".linkedin.com");
    if (url.protocol !== "https:" || !isLinkedIn) throw new Error();
    return url.toString();
  } catch {
    throw new Error(`${context}: linkedinPostUrl must be a secure LinkedIn URL.`);
  }
}

function validateOption(value: unknown, context: string): ChallengeOption {
  if (!isRecord(value)) throw new Error(`${context}: option must be an object.`);
  return {
    id: requiredString(value.id, "id", context),
    label: requiredString(value.label, "label", context),
    content: requiredString(value.content, "content", context),
  };
}

function validateChallenge(value: unknown, index: number): Challenge {
  const context = `Challenge at index ${index}`;
  if (!isRecord(value)) throw new Error(`${context} must be an object.`);

  const optionsValue = value.options;
  if (!Array.isArray(optionsValue) || optionsValue.length !== 4) {
    throw new Error(`${context}: options must contain exactly four items.`);
  }
  const options = optionsValue.map((option, optionIndex) =>
    validateOption(option, `${context}, option ${optionIndex}`),
  );
  const optionIds = new Set(options.map((option) => option.id));
  if (optionIds.size !== options.length) {
    throw new Error(`${context}: option ids must be unique.`);
  }

  const difficulty = requiredString(value.difficulty, "difficulty", context);
  if (!["beginner", "intermediate", "advanced"].includes(difficulty)) {
    throw new Error(`${context}: difficulty is invalid.`);
  }
  const type = requiredString(value.type, "type", context);
  if (!["output", "debug", "concept"].includes(type)) {
    throw new Error(`${context}: type is invalid.`);
  }
  const status = requiredString(value.status, "status", context);
  if (!["draft", "published"].includes(status)) {
    throw new Error(`${context}: status is invalid.`);
  }
  const publishedAt = requiredString(value.publishedAt, "publishedAt", context);
  if (Number.isNaN(Date.parse(publishedAt))) {
    throw new Error(`${context}: publishedAt must be an ISO date.`);
  }
  const explanationSteps = value.explanationSteps;
  if (
    !Array.isArray(explanationSteps) ||
    explanationSteps.length === 0 ||
    explanationSteps.some((step) => typeof step !== "string" || !step.trim())
  ) {
    throw new Error(`${context}: explanationSteps must contain text.`);
  }
  const correctOptionId = requiredString(
    value.correctOptionId,
    "correctOptionId",
    context,
  );
  if (!optionIds.has(correctOptionId)) {
    throw new Error(`${context}: correctOptionId does not match an option.`);
  }
  const estimatedMinutes = value.estimatedMinutes;
  if (
    estimatedMinutes !== undefined &&
    (typeof estimatedMinutes !== "number" ||
      !Number.isInteger(estimatedMinutes) ||
      estimatedMinutes < 1)
  ) {
    throw new Error(`${context}: estimatedMinutes must be a positive integer.`);
  }

  return {
    id: requiredString(value.id, "id", context),
    slug: requiredString(value.slug, "slug", context),
    title: requiredString(value.title, "title", context),
    description: requiredString(value.description, "description", context),
    technology: requiredString(value.technology, "technology", context),
    topic: requiredString(value.topic, "topic", context),
    difficulty: difficulty as ChallengeDifficulty,
    type: type as ChallengeType,
    codeLanguage: requiredString(value.codeLanguage, "codeLanguage", context),
    code: requiredString(value.code, "code", context),
    options,
    correctOptionId,
    shortAnswer: requiredString(value.shortAnswer, "shortAnswer", context),
    explanationSteps: explanationSteps as string[],
    correctedCode:
      value.correctedCode === null
        ? null
        : requiredString(value.correctedCode, "correctedCode", context),
    takeaway: requiredString(value.takeaway, "takeaway", context),
    estimatedMinutes: estimatedMinutes as number | undefined,
    publishedAt,
    status: status as ChallengeStatus,
    linkedinPostUrl: validateLinkedInUrl(value.linkedinPostUrl, context),
  };
}

export function validateChallenges(value: unknown): Challenge[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error("challenges.json must contain a non-empty array.");
  }
  const challenges = value.map(validateChallenge);
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const challenge of challenges) {
    if (ids.has(challenge.id)) throw new Error(`Duplicate id: ${challenge.id}`);
    if (slugs.has(challenge.slug)) {
      throw new Error(`Duplicate slug: ${challenge.slug}`);
    }
    ids.add(challenge.id);
    slugs.add(challenge.slug);
  }

  return challenges;
}
