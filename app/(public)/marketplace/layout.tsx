import React from "react";
import { Metadata } from "next";

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

const Layout = ({ children }: Props) => {
  return <>{children}</>;
};

export default Layout;
