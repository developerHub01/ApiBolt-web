import { Context, Next } from "hono";
import { createClient } from "@/lib/supabase/server";
import type { HTTPContext } from "@/types/server/env.types";

const checkUser = async (c: HTTPContext, next: Next) => {
  const supabase = await createClient();
  const {
    data: { user = null },
  } = await supabase.auth.getUser();

  c.set("user", user);

  await next();
};

export const AuthMiddleware = {
  checkUser,
};
