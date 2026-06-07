import { Next } from "hono";
import { createClient } from "@/lib/supabase/server";
import type { HTTPContext } from "@/types/server/env.types";
import { HTTPException } from "hono/http-exception";

const checkUser = async (c: HTTPContext, next: Next) => {
  try {
    const supabase = await createClient();
    const {
      data: { user = null },
    } = await supabase.auth.getUser();

    c.set("user", user);

    await next();
  } catch (error) {
    console.log(error);
    await next();
  }
};

const authenticatedUserOnly = async (c: HTTPContext, next: Next) => {
  const user = c.get("user");

  if (!user || !user?.id)
    throw new HTTPException(400, {
      message: "No user found",
    });

  await next();
};

export const AuthMiddleware = {
  checkUser,
  authenticatedUserOnly,
};
