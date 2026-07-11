import { Metadata } from "next";
import KeyboardShortcut from "@/app/(docs)/(scrollable)/docs/keyboard/content.mdx";

export const metadata: Metadata = {
  title: "Keyboard Shortcuts | APIBolt",
  description:
    "Complete reference of all default keyboard shortcuts in APIBolt. Learn navigation, tab management, UI toggles, and productivity shortcuts.",
  openGraph: {
    title: "Keyboard Shortcuts | APIBolt",
    description:
      "Master APIBolt with comprehensive keyboard shortcuts for navigation, tabs, search, and more.",
  },
};

const Page = () => <KeyboardShortcut />;

export default Page;
