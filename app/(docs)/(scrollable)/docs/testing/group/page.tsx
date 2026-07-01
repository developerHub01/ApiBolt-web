import { Metadata } from "next";
import Group from "@/app/(docs)/(scrollable)/docs/testing/group/content.mdx";

export const metadata: Metadata = {
  title: "group() method | APIBolt",
  description:
    "Learn how to organize API tests into logical groups using the group() method for better test structure and reporting.",
  openGraph: {
    title: "group() method | APIBolt",
    description:
      "Learn how to organize API tests into logical groups using the group() method for better test structure and reporting.",
  },
};

const Page = () => <Group />;

export default Page;
