import ThemeCreateForm from "@/components/app/dashboard/themes/ThemeCreateForm";
import * as motion from "motion/react-client";

const Page = () => {
  return (
    <motion.section
      className="w-full h-full flex flex-col items-center py-10"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <ThemeCreateForm />
    </motion.section>
  );
};

export default Page;
