"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Lenis from "lenis";
import type { LenisOptions } from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => {
  const context = useContext(LenisContext);
  if (context === undefined)
    throw new Error("useLenis must be used within a LenisProvider");

  return context;
};

interface Props {
  children: React.ReactNode;
  options?: LenisOptions;
}

const LenisProvider = ({ children, options }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    const lenisInstance = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
      anchors: true,
      syncTouch: false,
      ...optionsRef.current,
    });

    setLenis(lenisInstance);

    return () => {
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
};

export default LenisProvider;
