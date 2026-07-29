import { ApiError, apiJson, handleApiError } from "@/lib/api";
import { submitChallengeAnswer } from "@/lib/challenges/service";
import { ensureVisitor } from "@/lib/visitor";

export async function POST(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      throw new ApiError(400, "INVALID_JSON", "بدنه درخواست JSON معتبر نیست.");
    }

    const [{ slug }, visitor] = await Promise.all([
      context.params,
      ensureVisitor(),
    ]);
    return apiJson(await submitChallengeAnswer(visitor, slug, body));
  } catch (error) {
    return handleApiError(error);
  }
}
