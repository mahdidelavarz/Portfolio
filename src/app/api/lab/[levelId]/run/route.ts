import { apiJson, handleApiError, readJsonBody } from "@/lib/api";
import { recordLabRun } from "@/lib/lab/results";
import { ensureVisitor } from "@/lib/visitor";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  context: { params: Promise<{ levelId: string }> },
) {
  try {
    const body = await readJsonBody(request);
    const [{ levelId }, visitor] = await Promise.all([
      context.params,
      ensureVisitor(),
    ]);
    return apiJson({ result: await recordLabRun(visitor, levelId, body) });
  } catch (error) {
    return handleApiError(error);
  }
}
