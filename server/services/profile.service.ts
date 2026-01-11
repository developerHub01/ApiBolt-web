import type { SupabaseClient } from "@supabase/supabase-js";

export const getProfileByUsername = async (
  supabase: SupabaseClient,
  username: string
) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_name", username)
    .single();

  if (error) return null;

  return data;
};
