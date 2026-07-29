import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const visitors = pgTable("visitors", {
  id: uuid("id").primaryKey(),
  displayName: varchar("display_name", { length: 40 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

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

export type Visitor = typeof visitors.$inferSelect;
export type Answer = typeof answers.$inferSelect;
