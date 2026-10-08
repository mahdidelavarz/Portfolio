import { apiJson, handleApiError } from "@/lib/api";
import { regenerateRecoveryCode } from "@/lib/identity";
import { ensureVisitor } from "@/lib/visitor";

export const runtime = "nodejs";

export async function POST() {
  try {
    const visitor = await ensureVisitor();
    return apiJson(await regenerateRecoveryCode(visitor));
  } catch (error) {
    return handleApiError(error);
  }
}
