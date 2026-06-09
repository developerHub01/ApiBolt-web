import React from "react";
import { Metadata } from "next";
import Header from "@/components/app/common/header/Header";
import Footer from "@/components/app/common/Footer";
import ScrollToTop from "@/components/app/common/ScrollToTop";
import LenisProvider from "@/provider/LenisProvider";
import { SITE_URL } from "@/constant/index.constant";

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
    url: SITE_URL,
    images: [`${SITE_URL}/og.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "APIBolt - Professional API Testing Desktop App",
    description: "Local-first, zero cloud, and zero telemetry API client.",
    images: [`${SITE_URL}/og.png`],
  },
};

const Layout = ({ children }: Props) => {
  return (
    <LenisProvider>
      <main className="min-h-screen flex flex-col font-sans text-foreground bg-background overflow-x-clip">
        <Header />
        <section className="flex-1 w-full flex flex-col -mt-24">
          {children}
        </section>
        <Footer />
        <ScrollToTop />
      </main>
    </LenisProvider>
  );
};

export default Layout;
