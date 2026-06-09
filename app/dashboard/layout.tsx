import React from "react";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "@/components/app/dashboard/layout/Header";
import Sidebar from "@/components/app/dashboard/layout/Sidebar";

interface Props {
  children: React.ReactNode;
}

/* SEO ============= */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
const authTitle = "APIBolt | Professional API Testing Desktop App";
const authDescription = "";

export const metadata: Metadata = {
  title: authTitle,
  description: authDescription,
  openGraph: {
    title: authTitle,
    description: authDescription,
    images: [`${siteUrl}/og.png`],
    url: `${siteUrl}`,
  },
  twitter: {
    card: "summary_large_image",
    title: authTitle,
    description: authDescription,
    images: [`${siteUrl}/og.png`],
  },
};

const Layout = async ({ children }: Props) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
      className="h-screen overflow-hidden"
    >
      <Sidebar variant="inset" />
      <SidebarInset>
        <Header />
        <ScrollArea className="min-h-0">
          <section className="flex-1 container p-5 mx-auto">{children}</section>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
