import { Context } from "hono";
import { type SupabaseClient, User } from "@supabase/supabase-js";

export interface AppEnv {
  Variables: {
    user: User | null;
    supabase: SupabaseClient;
  };
}

export type HTTPContext = Context<AppEnv>;
