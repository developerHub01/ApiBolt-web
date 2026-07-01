import { Metadata } from "next";
import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Summary API | APIBolt",
};

interface Props {
  className?: string;
  children: React.ReactNode;
}

const ContentWrapper = ({ className, children }: Props) => {
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
      className={cn("flex flex-col w-full", className)}
    >
      {children}
    </motion.section>
  );
};

export default ContentWrapper;
