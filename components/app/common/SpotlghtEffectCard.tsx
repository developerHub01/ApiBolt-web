"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "motion/react";

interface Props extends HTMLMotionProps<"div"> {
  className?: string;
  children: React.ReactNode;
}

const SpotlghtEffectCard = ({ className, children, ...props }: Props) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    target.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      className={cn("relative", className)}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <div className="absolute w-100 h-100 bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 left-(--mouse-x) top-(--mouse-y) z-0" />
      {children}
    </motion.div>
  );
};

export default SpotlghtEffectCard;
