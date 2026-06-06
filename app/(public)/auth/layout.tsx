import React from "react";
import { Metadata } from "next";
import { SITE_URL } from "@/constant/index.constant";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

/* SEO ============= */
const authTitle = "Sign in to APIBolt | Professional API Testing Desktop App";
const authDescription =
  "Log in to your APIBolt account to manage your projects, themes, and accelerate your API development workflow with speed and privacy.";

export const metadata: Metadata = {
  title: authTitle,
  description: authDescription,
  openGraph: {
    title: authTitle,
    description: authDescription,
    images: [`${SITE_URL}/og.png`],
    url: `${SITE_URL}/login`,
  },
  twitter: {
    card: "summary_large_image",
    title: authTitle,
    description: authDescription,
    images: [`${SITE_URL}/og.png`],
  },
};

const Layout = async ({ children }: Props) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return <>{children}</>;
};

export default Layout;
