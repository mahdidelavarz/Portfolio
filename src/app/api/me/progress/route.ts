import { apiJson, handleApiError } from "@/lib/api";
import { getVisitorProgress } from "@/lib/challenges/service";
import { ensureVisitor } from "@/lib/visitor";

export const runtime = "nodejs";

export async function GET() {
  try {
    const visitor = await ensureVisitor();
    return apiJson(await getVisitorProgress(visitor));
  } catch (error) {
    return handleApiError(error);
  }
}
