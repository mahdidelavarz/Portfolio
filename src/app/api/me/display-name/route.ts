import { count, eq } from "drizzle-orm";
import { getDatabase } from "@/db";
import { answers, visitors } from "@/db/schema";
import { ApiError, apiJson, handleApiError } from "@/lib/api";
import { ensureVisitor, normalizeDisplayName } from "@/lib/visitor";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      throw new ApiError(400, "INVALID_JSON", "بدنه درخواست JSON معتبر نیست.");
    }
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      throw new ApiError(400, "INVALID_BODY", "اطلاعات نام نمایشی معتبر نیست.");
    }

    const visitor = await ensureVisitor();
    const [summary] = await getDatabase()
      .select({ totalAnswers: count() })
      .from(answers)
      .where(eq(answers.visitorId, visitor.id));
    if (summary.totalAnswers === 0) {
      throw new ApiError(
        403,
        "ANSWER_REQUIRED",
        "پس از پاسخ‌دادن به اولین سؤال می‌توانید نامتان را ثبت کنید.",
      );
    }

    let displayName: string;
    try {
      displayName = normalizeDisplayName(
        (body as Record<string, unknown>).displayName,
      );
    } catch (error) {
      throw new ApiError(
        400,
        "INVALID_DISPLAY_NAME",
        error instanceof Error ? error.message : "نام نمایشی معتبر نیست.",
      );
    }

    const [updated] = await getDatabase()
      .update(visitors)
      .set({ displayName })
      .where(eq(visitors.id, visitor.id))
      .returning({ displayName: visitors.displayName });
    return apiJson({ visitor: updated });
  } catch (error) {
    return handleApiError(error);
  }
}
