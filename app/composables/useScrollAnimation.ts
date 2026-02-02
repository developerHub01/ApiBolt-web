import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useScrollAnimation = () => {
  const animateOnScroll = (selector: string) => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const elements = gsap.utils.toArray<HTMLElement>(selector);

    elements.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        onEnter: () => el.classList.add("animate-in"),
        once: true,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (elements.includes(st.trigger as HTMLElement)) {
          st.kill();
        }
      });
    };
  };

  return {
    animateOnScroll,
  };
};
