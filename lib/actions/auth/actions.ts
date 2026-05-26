"use server";

import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export const signInWithGithub = async () => {
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

export const signOut = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign-out failed:", error.message);
    return;
  }

  redirect("/");
};

export const getUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
};
