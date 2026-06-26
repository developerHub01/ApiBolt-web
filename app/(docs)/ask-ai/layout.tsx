import React from "react";
import { Metadata } from "next";
import ContentWrapper from "@/components/app/docs/ContentWrapper";
import { SITE_URL } from "@/constant/index.constant";

export const metadata: Metadata = {
  title: {
    template: "%s | APIBolt Ask AI",
    default: "Ask AI | APIBolt",
  },
  description: "Ask questions to bolt-chat to get info about the app and docs.",
  openGraph: {
    title: "Ask AI | APIBolt",
    description:
      "Ask questions to bolt-chat to get info about the app and docs.",
    url: `${SITE_URL}/docs/testing`,
    siteName: "APIBolt",
    images: [`${SITE_URL}/og.png`],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ask AI | APIBolt",
    description:
      "Ask questions to bolt-chat to get info about the app and docs.",
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
