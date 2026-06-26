import Link from "next/link";
import { Metadata } from "next";
import * as motion from "motion/react-client";

export const metadata: Metadata = {
  title: "Documentation Overview",
};

const Page = () => {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className="flex flex-col gap-6 w-full"
    >
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-display mb-4">
          Documentation
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Welcome to the documentation. Navigate the sidebar to explore API
          testing, assertions, and more.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Link
          href="/docs/testing"
          className="p-5 rounded-xl bg-card border border-border hover:bg-muted/50 transition-all group block"
        >
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary">
            Testing Interface
          </h3>
          <p className="text-sm text-muted-foreground">
            Discover the built-in ABTestEngine and master API validation.
          </p>
        </Link>
      </div>
    </motion.section>
  );
};

export default Page;
