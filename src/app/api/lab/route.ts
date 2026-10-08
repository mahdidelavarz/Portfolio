import { apiJson, handleApiError } from "@/lib/api";
import { getLabResults } from "@/lib/lab/results";
import { ensureVisitor } from "@/lib/visitor";

export const runtime = "nodejs";

export async function GET() {
  try {
    const visitor = await ensureVisitor();
    return apiJson({
      username: visitor.displayName,
      results: await getLabResults(visitor.id),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
