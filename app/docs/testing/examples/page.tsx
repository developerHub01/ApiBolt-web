import { Metadata } from "next";
import Examples from "@/app/docs/testing/examples/content.mdx";

export const metadata: Metadata = {
  title: "Pro Examples | APIBolt",
  description:
    "Advanced API testing examples with pagination checks, security audits, and conditional logic using ABTestEngine.",
  openGraph: {
    title: "Pro Examples | APIBolt",
    description:
      "Advanced API testing examples with pagination checks, security audits, and conditional logic using ABTestEngine.",
  },
};

const Page = () => <Examples />;

export default Page;
