import type { Metadata } from "next";
import { Inter, Zen_Dots } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/constant/index.constant";
import MainLayoutProviderWrapper from "@/components/MainLayoutProviderWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const zenDots = Zen_Dots({
  subsets: ["latin"],
  variable: "--font-zen-dots",
  display: "swap",
  weight: "400",
});

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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${zenDots.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <MainLayoutProviderWrapper>{children}</MainLayoutProviderWrapper>
      </body>
    </html>
  );
}
