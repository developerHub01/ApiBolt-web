import { Metadata } from "next";
import * as motion from "motion/react-client";

export const metadata: Metadata = {
  title: "Summary API | APIBolt",
};

interface Props {
  children: React.ReactNode;
}

const ContentWrapper = ({ children }: Props) => {
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
      className="flex flex-col w-full"
    >
      {children}
    </motion.section>
  );
};

export default ContentWrapper;
