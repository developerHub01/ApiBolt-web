import type { H3Event } from "h3";
import type { ApiResponse } from "~~/server/types/index";

export const sendStandardResponse = <T>(
  event: H3Event,
  payload: {
    success: boolean;
    data?: T;
    message?: string;
    statusCode?: number;
  },
): ApiResponse<T> => {
  const statusCode = payload.statusCode || 200;

  // Set the actual HTTP header so the protocol is valid
  setResponseStatus(event, statusCode);

  // Return the full envelope for your Mobile/Desktop apps
  return {
    success: payload.success,
    status: statusCode,
    message: payload.message || (payload.success ? "Success" : "Error"),
    data: payload.data ?? null,
    timestamp: new Date().toISOString(),
  };
};
