"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const signInWithGithubAction = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      queryParams: { prompt: "select_account" },
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error("GitHub sign-in failed:", error.message);
    redirect("/auth?error=github_failed");
  }

  redirect(data.url);
};

export const signOutAction = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign-out failed:", error.message);
    return;
  }

  redirect("/");
};

export const getUserAction = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
};
