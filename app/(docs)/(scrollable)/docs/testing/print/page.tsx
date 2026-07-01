import { Metadata } from "next";
import Print from "@/app/(docs)/(scrollable)/docs/testing/print/content.mdx";

export const metadata: Metadata = {
  title: "print() method | APIBolt",
  description:
    "Learn how to use the print() method to inspect response state and environment variables during API test execution.",
  openGraph: {
    title: "print() method | APIBolt",
    description:
      "Learn how to use the print() method to inspect response state and environment variables during API test execution.",
  },
};

const Page = () => <Print />;

export default Page;
