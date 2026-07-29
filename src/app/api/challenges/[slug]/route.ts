import { apiJson, handleApiError } from "@/lib/api";
import { getChallengeDetail } from "@/lib/challenges/service";
import { ensureVisitor } from "@/lib/visitor";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    const [{ slug }, visitor] = await Promise.all([
      context.params,
      ensureVisitor(),
    ]);
    return apiJson(await getChallengeDetail(visitor, slug));
  } catch (error) {
    return handleApiError(error);
  }
}
