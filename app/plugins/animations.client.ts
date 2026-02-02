import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

export default defineNuxtPlugin(() => {
  if (typeof window === "undefined") return;

  /* Register GSAP plugins */
  gsap.registerPlugin(ScrollTrigger);

  /* Initialize Lenis smooth scroll */
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  /* Connect Lenis with GSAP ScrollTrigger */
  lenis.on("scroll", ScrollTrigger.update);

  /* Connect Lenis with GSAP ticker */
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  /* Set GSAP ticker lag smoothing */
  gsap.ticker.lagSmoothing(0);

  return {
    provide: {
      gsap,
      lenis,
      ScrollTrigger,
    },
  };
});
