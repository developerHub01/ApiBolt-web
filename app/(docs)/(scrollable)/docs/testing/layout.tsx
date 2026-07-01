import React from "react";
import { Metadata } from "next";
import ContentWrapper from "@/components/app/docs/ContentWrapper";
import { SITE_URL } from "@/constant/index.constant";

export const metadata: Metadata = {
  title: {
    template: "%s | APIBolt Testing API",
    default: "Testing API | APIBolt",
  },
  description:
    "Master the ABTestEngine DSL for professional API testing. Learn expect() assertions, test organization with group(), response validation, and advanced debugging methods.",
  openGraph: {
    title: "Testing API | APIBolt",
    description:
      "Master the ABTestEngine DSL for professional API testing. Complete guide to assertions, test organization, and debugging.",
    url: `${SITE_URL}/docs/testing`,
    siteName: "APIBolt",
    images: [`${SITE_URL}/og.png`],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Testing API | APIBolt",
    description:
      "Master the ABTestEngine DSL for professional API testing. Complete guide to assertions, test organization, and debugging.",
    images: [`${SITE_URL}/og.png`],
  },
};

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

export default Layout;
