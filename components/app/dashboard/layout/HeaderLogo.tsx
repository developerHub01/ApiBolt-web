"use client";

import Image from "next/image";
import { useSidebar } from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "motion/react";

const HeaderLogo = () => {
  const { state, isMobile } = useSidebar();
  const showLogo = state === "collapsed" || isMobile;

  return (
    <AnimatePresence>
      {showLogo && (
        <motion.div
          initial={{
            opacity: 0,
            width: 0,
          }}
          animate={{
            opacity: 1,
            width: "auto",
          }}
          exit={{
            opacity: 0,
            width: 0,
          }}
          className="flex items-center gap-2 select-none overflow-hidden whitespace-nowrap"
        >
          <Image
            src="/logo.svg"
            alt="APIBolt"
            width={25}
            height={25}
            className="object-contain"
          />
          <h1 className="text-base font-bold font-brand">APIBolt</h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeaderLogo;
