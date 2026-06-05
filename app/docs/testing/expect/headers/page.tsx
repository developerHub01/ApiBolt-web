import { Metadata } from "next";
import Headers from "@/app/docs/testing/expect/headers/content.mdx";

export const metadata: Metadata = {
  title: "Expect API - Headers | APIBolt",
  description:
    "HTTP header assertion matchers for API testing with header presence checks, value validation, and content-type verification.",
  openGraph: {
    title: "Expect API - Headers | APIBolt",
    description:
      "HTTP header assertion matchers for API testing with header presence checks, value validation, and content-type verification.",
  },
};

const Page = () => <Headers />;

export default Page;
