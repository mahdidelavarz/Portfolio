import { apiJson, handleApiError } from "@/lib/api";
import { getLeaderboard } from "@/lib/challenges/service";
import { ensureVisitor } from "@/lib/visitor";

export async function GET() {
  try {
    const visitor = await ensureVisitor();
    return apiJson(await getLeaderboard(visitor.id));
  } catch (error) {
    return handleApiError(error);
  }
}
