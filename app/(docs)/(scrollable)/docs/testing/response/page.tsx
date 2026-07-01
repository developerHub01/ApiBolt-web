import { Metadata } from "next";
import Response from "@/app/(docs)/(scrollable)/docs/testing/response/content.mdx";

export const metadata: Metadata = {
  title: "Response Object | APIBolt",
  description:
    "Learn how to access and use the ab.response object to build advanced conditional tests on raw HTTP payloads, headers, and cookies.",
  openGraph: {
    title: "Response Object | APIBolt",
    description:
      "Learn how to access and use the ab.response object to build advanced conditional tests on raw HTTP payloads, headers, and cookies.",
  },
};

const Page = () => <Response />;

export default Page;
