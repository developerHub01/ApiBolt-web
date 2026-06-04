import React from "react";
import { Metadata } from "next";
import { SITE_URL } from "@/constant/index.constant";
import * as motion from "motion/react-client";
import ScrollNav from "@/components/app/public/fake/ScrollNav";
import FakeHeader from "@/components/app/public/fake/FakeHeader";

interface Props {
  children: React.ReactNode;
}

/* SEO ============= */
export const metadata: Metadata = {
  title: "Fake API | APIBolt",
  description: "Professional-grade fake REST API for testing.",
  openGraph: {
    title: "Fake API | APIBolt",
    description: "Professional-grade fake REST API for testing.",
    images: [`${SITE_URL}/og.png`],
    url: `${SITE_URL}/fake`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Fake API | APIBolt",
    description: "Professional-grade fake REST API for testing.",
    images: [`${SITE_URL}/og.png`],
  },
};

const targets = [
  {
    id: "users",
    label: "Users",
  },
  {
    id: "posts",
    label: "Posts",
  },
  {
    id: "products",
    label: "Products",
  },
  {
    id: "orders",
    label: "Orders",
  },
  {
    id: "categories",
    label: "Categories",
  },
  {
    id: "status",
    label: "Status",
  },
];

const Layout = ({ children }: Props) => {
  return (
    <>
      <main className="min-h-screen w-full text-foreground font-sans overflow-x-hidden">
        <FakeHeader />

        <div className="container mx-auto max-w-7xl px-4 py-20 relative">
          <motion.nav
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.8,
              ease: [0.33, 0, 0.2, 1],
            }}
            className="flex flex-wrap gap-2 mb-16 pb-8 border-b border-white/5"
          >
            <ScrollNav targets={targets} />
          </motion.nav>
          {children}

          <div className="absolute bottom-10 -right-20 size-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        </div>
      </main>
    </>
  );
};

export default Layout;
