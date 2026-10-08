import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const visitors = pgTable(
  "visitors",
  {
    id: uuid("id").primaryKey(),
    displayName: varchar("display_name", { length: 40 }),
    recoveryCodeHash: varchar("recovery_code_hash", { length: 200 }),
    nameClaimedAt: timestamp("name_claimed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("visitors_display_name_lower_unique").on(
      sql`lower(${table.displayName})`,
    ),
  ],
);

export const answers = pgTable(
  "answers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    visitorId: uuid("visitor_id")
      .notNull()
      .references(() => visitors.id, { onDelete: "cascade" }),
    questionId: varchar("question_id", { length: 128 }).notNull(),
    selectedOptionId: varchar("selected_option_id", { length: 16 }).notNull(),
    isCorrect: boolean("is_correct").notNull(),
    responseTimeMs: integer("response_time_ms"),
    source: varchar("source", { length: 32 }),
    answeredAt: timestamp("answered_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("answers_visitor_question_unique").on(
      table.visitorId,
      table.questionId,
    ),
    index("answers_visitor_idx").on(table.visitorId),
    index("answers_question_idx").on(table.questionId),
    index("answers_answered_at_idx").on(table.answeredAt),
    check(
      "answers_response_time_non_negative",
      sql`${table.responseTimeMs} is null or ${table.responseTimeMs} >= 0`,
    ),
  ],
);

export const labResults = pgTable(
  "lab_results",
  {
    visitorId: uuid("visitor_id")
      .notNull()
      .references(() => visitors.id, { onDelete: "cascade" }),
    levelId: varchar("level_id", { length: 64 }).notNull(),
    bestConfig: jsonb("best_config")
      .$type<Record<string, boolean | string | null>>()
      .notNull(),
    bestScore: integer("best_score").notNull(),
    passed: boolean("passed").notNull(),
    runs: integer("runs").default(1).notNull(),
    hintsUsed: integer("hints_used").default(0).notNull(),
    solutionViewed: boolean("solution_viewed").default(false).notNull(),
    firstPassedAt: timestamp("first_passed_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.visitorId, table.levelId] }),
    index("lab_results_first_passed_at_idx").on(table.firstPassedAt),
    check(
      "lab_results_best_score_range",
      sql`${table.bestScore} >= 0 and ${table.bestScore} <= 100`,
    ),
  ],
);

export const recoveryAttempts = pgTable(
  "recovery_attempts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    usernameKey: varchar("username_key", { length: 40 }).notNull(),
    ipHash: varchar("ip_hash", { length: 64 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("recovery_attempts_username_idx").on(
      table.usernameKey,
      table.createdAt,
    ),
    index("recovery_attempts_ip_idx").on(table.ipHash, table.createdAt),
  ],
);

export type Visitor = typeof visitors.$inferSelect;
export type Answer = typeof answers.$inferSelect;
export type LabResult = typeof labResults.$inferSelect;
