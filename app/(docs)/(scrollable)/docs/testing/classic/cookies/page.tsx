import { Metadata } from "next";
import Cookies from "@/app/(docs)/(scrollable)/docs/testing/classic/cookies/content.mdx";

export const metadata: Metadata = {
  title: "Classic API - Cookies | APIBolt",
  description:
    "Complete cookie-level assertions including secure flags, httpOnly, origins, lifespans, and SameSite validation using the Classic API.",
  openGraph: {
    title: "Classic API - Cookies | APIBolt",
    description:
      "Complete cookie-level assertions including secure flags, httpOnly, origins, lifespans, and SameSite validation using the Classic API.",
  },
};

const Page = () => <Cookies />;

export default Page;
