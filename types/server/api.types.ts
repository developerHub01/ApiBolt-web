import { createRouter } from "@/utils/server/create-router";
import { ContentfulStatusCode } from "hono/utils/http-status";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: ContentfulStatusCode;
  data?: T;
}

export type ApiErrorResponse = {
  success: false;
  message: string;
  statusCode: ContentfulStatusCode;
  error?: string | Record<string, unknown>;
};

export interface RouteListItemInterface {
  path: string;
  route: ReturnType<typeof createRouter>;
}
