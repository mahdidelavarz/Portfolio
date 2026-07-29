import "server-only";

import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres, { type Sql } from "postgres";
import * as schema from "./schema";

type Database = PostgresJsDatabase<typeof schema>;
type DatabaseConnection = {
  client: Sql;
  db: Database;
};

const globalDatabase = globalThis as typeof globalThis & {
  challengeDatabase?: DatabaseConnection;
};

export function getDatabase(): Database {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!globalDatabase.challengeDatabase) {
    const client = postgres(databaseUrl, {
      max: process.env.NODE_ENV === "production" ? 3 : 1,
      prepare: false,
      connect_timeout: 10,
      idle_timeout: 20,
    });

    globalDatabase.challengeDatabase = {
      client,
      db: drizzle(client, { schema }),
    };
  }

  return globalDatabase.challengeDatabase.db;
}
