import { Database } from "~/types/database.types";
import { serverSupabaseClient } from "#supabase/server";

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T | null;
  timestamp: string;
}

export type TSupabaseClient = Awaited<ReturnType<typeof serverSupabaseClient<Database>>>
