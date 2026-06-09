"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const checkScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight);
    };

    checkScroll();

    window.addEventListener("scroll", checkScroll, { passive: true });

    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{
            y: 40,
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          exit={{
            y: 40,
            opacity: 0,
            scale: 0.95,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={cn(
            "fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 size-10 md:size-12 rounded-full",
            "bg-card/40 backdrop-blur-xl border border-white/10 shadow-2xl",
            "hover:bg-primary hover:text-primary-foreground hover:scale-110 active:scale-95",
            "transition-all group flex items-center justify-center",
          )}
        >
          <ChevronUp className="size-6 transition-transform group-hover:-translate-y-1" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
