import type { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "~/types/database.types";

export const getUserIdFromUserName = async (
  supabase: SupabaseClient<Database>,
  userName: string,
) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_name", userName)
    .single();

  if (error) return null;
  return data.id ?? null;
};

export const getProfileByUserName = async (
  supabase: SupabaseClient<Database>,
  userName: string,
) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_name", userName)
    .single();

  if (error) return null;
  return data;
};

export const getFullProfileById = async (
  supabase: SupabaseClient<Database>,
  id: string,
) => {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
    *,
    themes (
      id,
      name,
      type,
      preview,
      thumbnail,
      version,
      description,
      install_count,
      author,
      created_at
    )
    `,
    )
    .eq("id", id)
    .order("install_count", {
      referencedTable: "themes",
      ascending: false,
    })
    .order("created_at", {
      referencedTable: "themes",
      ascending: false,
    })
    .limit(3, {
      foreignTable: "themes",
    })
    .single();

  if (error) return null;

  return data;
};

export const getProfileMetaById = async (
  supabase: SupabaseClient<Database>,
  id: string,
) => {
  const { data, error } = await supabase
    .from("profiles")
    .select(`*`)
    .eq("id", id)
    .single();

  if (error) return null;

  return data;
};
