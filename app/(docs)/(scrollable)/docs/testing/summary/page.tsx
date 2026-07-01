import { Metadata } from "next";
import Summary from "@/app/(docs)/(scrollable)/docs/testing/summary/content.mdx";

export const metadata: Metadata = {
  title: "Summary API | APIBolt",
  description:
    "Generate final test reports and debug summaries with the ABTestEngine summary methods.",
  openGraph: {
    title: "Summary API | APIBolt",
    description: "Generate final test reports and debug summaries.",
  },
};

const Page = () => <Summary />;

export default Page;
