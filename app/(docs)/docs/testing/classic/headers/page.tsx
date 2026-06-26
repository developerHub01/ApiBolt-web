import { Metadata } from "next";
import Headers from "@/app/(docs)/docs/testing/classic/headers/content.mdx";

export const metadata: Metadata = {
  title: "Classic API - Headers | APIBolt",
  description:
    "Execute direct header verifications with case-insensitive matching, value checks, and negative testing using the Classic API.",
  openGraph: {
    title: "Classic API - Headers | APIBolt",
    description:
      "Execute direct header verifications with case-insensitive matching, value checks, and negative testing using the Classic API.",
  },
};

const Page = () => <Headers />;

export default Page;
