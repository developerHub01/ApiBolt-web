import { Database } from "~/types/database.types";
import type { SupabaseClient } from "@supabase/supabase-js";

export const getSocialByUserId = async (
  supabase: SupabaseClient<Database>,
  id: string
) => {
  const { data, error } = await supabase
    .from("social_links")
    .select("*")
    .eq("user_id", id);

  if (error) return null;

  return data;
};
