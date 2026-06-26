import { Metadata } from "next";
import { SITE_URL } from "@/constant/index.constant";

export const metadata: Metadata = {
  title: {
    template: "%s | APIBolt Documentation",
    default: "Documentation | APIBolt",
  },
  description:
    "Complete documentation for APIBolt - the professional API testing desktop app. Learn about assertions, test organization, environment access, and advanced debugging.",
  openGraph: {
    title: "Documentation | APIBolt",
    description:
      "Complete documentation for APIBolt API testing. Master assertions, test organization, and advanced debugging.",
    url: `${SITE_URL}/docs`,
    siteName: "APIBolt",
    images: [`${SITE_URL}/og.png`],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentation | APIBolt",
    description:
      "Complete documentation for APIBolt API testing. Master assertions, test organization, and advanced debugging.",
    images: [`${SITE_URL}/og.png`],
  },
};

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => children;

export default Layout;
