import { Metadata } from "next";
import Status from "@/app/(docs)/docs/testing/classic/status/content.mdx";

export const metadata: Metadata = {
  title: "Classic API - Status | APIBolt",
  description:
    "HTTP status validation methods for API testing with exact matching, multi-match, range checks, and semantic helpers.",
  openGraph: {
    title: "Classic API - Status | APIBolt",
    description:
      "HTTP status validation methods for API testing with exact matching, multi-match, range checks, and semantic helpers.",
  },
};

const Page = () => <Status />;

export default Page;
