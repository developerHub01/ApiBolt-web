import { Metadata } from "next";
import Env from "@/app/(docs)/docs/testing/env/content.mdx";

export const metadata: Metadata = {
  title: "Environment Access | APIBolt",
  description:
    "Learn how to access environment variables directly in API test scripts using ab.env for runtime validation and configuration.",
  openGraph: {
    title: "Environment Access | APIBolt",
    description:
      "Learn how to access environment variables directly in API test scripts using ab.env for runtime validation and configuration.",
  },
};

const Page = () => <Env />;

export default Page;
