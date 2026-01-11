import type { H3Event } from "h3";
import { serverSupabaseClient } from "#supabase/server";

export const checkUser = async (event: H3Event) => {
  const supabase = await serverSupabaseClient(event);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ?? null;
};
