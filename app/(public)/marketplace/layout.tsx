import React from "react";
import { Metadata } from "next";
import { SITE_URL } from "@/constant/index.constant";

interface Props {
  children: React.ReactNode;
}

/* SEO ============= */
const authTitle = "APIBolt | Professional API Testing Desktop App";
const authDescription = "";

export const metadata: Metadata = {
  title: authTitle,
  description: authDescription,
  openGraph: {
    title: authTitle,
    description: authDescription,
    images: [`${SITE_URL}/og.png`],
    url: `${SITE_URL}`,
  },
  twitter: {
    card: "summary_large_image",
    title: authTitle,
    description: authDescription,
    images: [`${SITE_URL}/og.png`],
  },
};

const Layout = ({ children }: Props) => {
  return <>{children}</>;
};

export default Layout;
