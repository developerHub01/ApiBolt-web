import { Metadata } from "next";
import Classic from "@/app/(docs)/docs/testing/classic/content.mdx";

export const metadata: Metadata = {
  title: "Classic API | APIBolt",
  description:
    "Low-level API testing methods for direct access to status, body, headers, and cookies without the expect() wrapper.",
  openGraph: {
    title: "Classic API | APIBolt",
    description:
      "Low-level API testing methods for direct access to status, body, headers, and cookies without the expect() wrapper.",
  },
};

const Page = () => <Classic />;

export default Page;
