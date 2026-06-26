import { Metadata } from "next";
import Body from "@/app/(docs)/docs/testing/classic/body/content.mdx";

export const metadata: Metadata = {
  title: "Classic API - Body | APIBolt",
  description:
    "Payload body verifications with exact matching, type validation, property checks, and number validation using the Classic API.",
  openGraph: {
    title: "Classic API - Body | APIBolt",
    description:
      "Payload body verifications with exact matching, type validation, property checks, and number validation using the Classic API.",
  },
};

const Page = () => <Body />;

export default Page;
