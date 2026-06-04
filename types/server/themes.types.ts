import { ContentfulStatusCode } from "hono/utils/http-status";
import { ThemeMetaInterface } from "@/types/theme.types";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: ContentfulStatusCode;
  data?: T;
}

export type ThemeMetaResponse = {
  data: Array<ThemeMetaInterface>;
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    totalThemeCount: number;
  };
};
