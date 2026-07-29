import { NextResponse } from "next/server";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

export function apiJson<T>(data: T, status = 200): NextResponse<T> {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "private, no-store" },
  });
}

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof ApiError) {
    return apiJson(
      { error: { code: error.code, message: error.message } },
      error.status,
    );
  }

  const databaseError =
    error instanceof Error &&
    (error.message === "DATABASE_URL is not configured." ||
      "code" in error &&
        ["ECONNREFUSED", "CONNECT_TIMEOUT", "ENOTFOUND"].includes(
          String((error as Error & { code?: string }).code),
        ));
  if (databaseError) {
    return apiJson(
      {
        error: {
          code: "DATABASE_UNAVAILABLE",
          message: "ارتباط با پایگاه داده موقتاً برقرار نیست. لطفاً کمی بعد دوباره تلاش کنید.",
        },
      },
      503,
    );
  }

  console.error("Challenge API error", error instanceof Error ? error.message : error);
  return apiJson(
    {
      error: {
        code: "INTERNAL_ERROR",
        message: "در حال حاضر انجام این درخواست ممکن نیست. لطفاً دوباره تلاش کنید.",
      },
    },
    500,
  );
}

export function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  );
}
