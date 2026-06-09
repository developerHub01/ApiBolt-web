"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";

interface Props {
  value: number;
  type?: keyof HTMLElementTagNameMap;
  className?: string;
}

const CounterAnimation = ({ value, className = "", ...props }: Props) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-15% 0px 0px 0px",
  });

  const motionValue = useMotionValue(0);
  const displayValue = useTransform(motionValue, (v) =>
    Math.round(v).toLocaleString(),
  );

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, {
        duration: 2,
        ease: [0.33, 0, 0.2, 1],
      });
    }
  }, [isInView, motionValue, value]);

  return (
    <motion.p ref={ref} className={className} {...props}>
      {displayValue}
    </motion.p>
  );
};

export default CounterAnimation;
