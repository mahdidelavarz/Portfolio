import { apiJson, handleApiError, readJsonBody, readJsonObject } from "@/lib/api";
import { recoverVisitor } from "@/lib/identity";
import { hashClientIp } from "@/lib/recovery";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = readJsonObject(await readJsonBody(request));
    return apiJson(
      await recoverVisitor(body.username, body.recoveryCode, hashClientIp(request)),
    );
  } catch (error) {
    return handleApiError(error);
  }
}
