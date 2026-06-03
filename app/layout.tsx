import type { Metadata } from "next";
import { Inter, Zen_Dots } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "APIBolt - Professional API Testing Desktop App",
  description:
    "APIBolt is a powerful desktop application for API development, testing, and debugging. Local-first, zero cloud, and zero telemetry.",
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
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
