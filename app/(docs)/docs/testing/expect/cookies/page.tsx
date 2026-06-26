import { Metadata } from "next";
import Cookies from "@/app/(docs)/docs/testing/expect/cookies/content.mdx";

export const metadata: Metadata = {
  title: "Expect API - Cookies | APIBolt",
  description:
    "Cookie assertion matchers for API testing with existence checks, value validation, security flags, and SameSite verification.",
  openGraph: {
    title: "Expect API - Cookies | APIBolt",
    description:
      "Cookie assertion matchers for API testing with existence checks, value validation, security flags, and SameSite verification.",
  },
};

const Page = () => <Cookies />;

export default Page;
