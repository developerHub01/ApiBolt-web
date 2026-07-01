import { Metadata } from "next";
import Status from "@/app/(docs)/(scrollable)/docs/testing/expect/status/content.mdx";

export const metadata: Metadata = {
  title: "Expect API - Status | APIBolt",
  description:
    "HTTP status assertion matchers for API testing with exact matching, range checks, category matchers, and semantic helpers.",
  openGraph: {
    title: "Expect API - Status | APIBolt",
    description:
      "HTTP status assertion matchers for API testing with exact matching, range checks, category matchers, and semantic helpers.",
  },
};

const Page = () => <Status />;

export default Page;
