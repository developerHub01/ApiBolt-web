"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { Play, X } from "lucide-react";

const VideoSection = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: videoContainerRef,
    offset: ["start 90%", "end 30%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [60, 0, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.5, 1, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [0, 1, 1]);
  const y = useTransform(smoothProgress, [0, 0.5, 1], [150, 0, 0]);

  const videoUrl = isOpen
    ? "https://www.youtube.com/embed/u2t3AvMtXXI?si=_8mcg3QsrJfCygn-&autoplay=1"
    : "https://www.youtube.com/embed/u2t3AvMtXXI?si=_8mcg3QsrJfCygn-";

  return (
    <section className="py-32 px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div
        className="container mx-auto relative"
        style={{
          perspective: "800px",
        }}
      >
        <motion.div
          ref={titleRef}
          className="text-center mb-12"
          initial={{
            opacity: 0,
            y: 32,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "0px 0px -15% 0px",
          }}
          transition={{
            duration: 0.8,
            ease: [0.33, 0, 0.2, 1],
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            See APIBolt in Action
          </h2>
          <p className="text-muted-foreground text-lg">
            Watch how fast you can build and test APIs
          </p>
        </motion.div>

        <motion.div
          ref={videoContainerRef}
          className="group relative rounded-2xl bg-background/50 border border-border/50 shadow-2xl backdrop-blur-sm overflow-hidden scale-90!"
          initial={{
            rotateX: 60,
            scale: 0.5,
            opacity: 0,
            y: 150,
          }}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
            rotateX,
            scale,
            opacity,
            y,
          }}
        >
          <div className="relative bg-black/50 aspect-video group-hover:bg-black/40 transition-colors duration-500">
            <Image
              src="/images/home/app_video_thumbnail.png"
              alt="ApiBolt Demo"
              width={1040}
              height={585}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 ease-out"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="relative group/btn flex items-center gap-3 px-4 py-2 sm:px-8 sm:py-4 bg-background/10 hover:bg-background/90 backdrop-blur-md rounded-full border border-white/10 hover:border-primary/20 shadow-[0_0_200px_50px] shadow-transparent group-hover:shadow-accent hover:shadow-[0_0_200px_150px] group-hover:scale-105 hover:scale-120 transition-all duration-300"
              >
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center">
                  <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5" />
                </div>
                <span className="text-white font-medium pr-2">
                  Watch Introduction
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-md"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-7xl max-h-[90vh] aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black"
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                title="close"
                className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors z-101 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
              <iframe
                width="100%"
                height="100%"
                src={videoUrl}
                title="ApiBolt Introduction"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoSection;
