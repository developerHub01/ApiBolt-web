import { Metadata } from "next";
import Testing from "@/app/docs/testing/content.mdx";

export const metadata: Metadata = {
  title: "Testing Overview | APIBolt",
  description:
    "Master the ABTestEngine DSL - a full-featured API testing framework with expect() assertions, test organization, and comprehensive validation methods.",
  openGraph: {
    title: "Testing Overview | APIBolt",
    description:
      "Master the ABTestEngine DSL - a full-featured API testing framework with expect() assertions, test organization, and comprehensive validation methods.",
  },
};

const Page = () => <Testing />;

export default Page;
