import { Metadata } from "next";
import Expect from "@/app/docs/testing/expect/content.mdx";

export const metadata: Metadata = {
  title: "Expect API | APIBolt",
  description:
    "Master the expect() API - the most powerful testing interface in ABTestEngine with value mode and response mode for comprehensive API validation.",
  openGraph: {
    title: "Expect API | APIBolt",
    description:
      "Master the expect() API - the most powerful testing interface in ABTestEngine with value mode and response mode for comprehensive API validation.",
  },
};

const Page = () => <Expect />;

export default Page;
