import { count, eq } from "drizzle-orm";
import { getDatabase } from "@/db";
import { answers } from "@/db/schema";
import { apiJson, handleApiError } from "@/lib/api";
import { ensureVisitor } from "@/lib/visitor";

export async function GET() {
  try {
    const visitor = await ensureVisitor();
    const [summary] = await getDatabase()
      .select({ totalAnswers: count() })
      .from(answers)
      .where(eq(answers.visitorId, visitor.id));

    return apiJson({
      visitor: {
        displayName: visitor.displayName,
        hasAnswered: summary.totalAnswers > 0,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
