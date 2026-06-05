import { Metadata } from "next";
import Code from "@/app/docs/testing/code/content.mdx";

export const metadata: Metadata = {
  title: "code() API | APIBolt",
  description:
    "Learn how to use the code() method to log complex objects and payloads as syntax-highlighted code blocks in the ApiBolt console.",
  openGraph: {
    title: "code() API | APIBolt",
    description:
      "Learn how to use the code() method to log complex objects and payloads as syntax-highlighted code blocks in the ApiBolt console.",
  },
};

const Page = () => <Code />;

export default Page;
