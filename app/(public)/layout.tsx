import React from "react";
import { Metadata } from "next";
import Header from "@/components/app/common/Header";
import Footer from "@/components/app/common/Footer";
import ScrollToTop from "@/components/app/common/ScrollToTop";

interface Props {
  children: React.ReactNode;
}

/* SEO ============= */
export const metadata: Metadata = {
  title: "APIBolt - Professional API Testing Desktop App",
  description:
    "APIBolt is a powerful desktop application for API development, testing, and debugging. Local-first, zero cloud, and zero telemetry.",
  openGraph: {
    title: "APIBolt - Professional API Testing Desktop App",
    description: "Local-first, zero cloud, and zero telemetry API client.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "APIBolt - Professional API Testing Desktop App",
    description: "Local-first, zero cloud, and zero telemetry API client.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og.png`],
  },
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <main className="min-h-screen flex flex-col font-sans text-foreground bg-background overflow-x-clip">
        <Header />
        <section className="flex-1 w-full flex flex-col -mt-24">
          {children}
        </section>
        <Footer />
        <ScrollToTop />
      </main>
    </>
  );
};

export default Layout;
