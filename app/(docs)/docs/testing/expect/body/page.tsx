import { Metadata } from "next";
import Body from "@/app/(docs)/docs/testing/expect/body/content.mdx";

export const metadata: Metadata = {
  title: "Expect API - Body | APIBolt",
  description:
    "Body assertion matchers for API testing with exact matching, type validation, property checks, and numerical boundaries.",
  openGraph: {
    title: "Expect API - Body | APIBolt",
    description:
      "Body assertion matchers for API testing with exact matching, type validation, property checks, and numerical boundaries.",
  },
};

const Page = () => <Body />;

export default Page;
