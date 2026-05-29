import { Context } from "hono";
import { ApiErrorResponse, ApiResponse } from "@/types/server/api.types";
import { HTTPException } from "hono/http-exception";

export const sendResponse = <T>(
  c: Context,
  res: Omit<ApiResponse<T>, "success">,
) => {
  return c.json(
    {
      success: true,
      message: res.message,
      data: res.data,
    },
    res.statusCode,
  );
};

export const sendError = (
  c: Context,
  err: Omit<ApiErrorResponse, "success">,
) => {
  return c.json(
    {
      success: false,
      message: err.message,
      error: err.error ?? null,
    },
    err.statusCode,
  );
};

export const globalErrorHandler = async (err: Error, c: Context) => {
  if (err instanceof HTTPException)
    return sendError(c, {
      message: err.message,
      statusCode: err.status,
      error: err.message,
    });

  const isDev = process.env.NODE_ENV === "development";

  return c.json(
    {
      success: false,
      message: isDev ? err.message : "Internal Server Error",
      statusCode: 500,
      error: isDev ? err.stack : undefined,
    },
    500,
  );
};
