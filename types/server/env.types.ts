import { User } from "@supabase/supabase-js";
import { Context } from "hono";

export interface AppEnv {
  Variables: {
    user: User | null;
  };
}

export type HTTPContext = Context<AppEnv>;
