import { apiJson, handleApiError, readJsonBody, readJsonObject } from "@/lib/api";
import { claimUsername } from "@/lib/identity";
import { ensureVisitor } from "@/lib/visitor";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = readJsonObject(await readJsonBody(request));
    const visitor = await ensureVisitor();
    return apiJson(await claimUsername(visitor, body.username));
  } catch (error) {
    return handleApiError(error);
  }
}
