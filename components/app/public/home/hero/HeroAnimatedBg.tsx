import * as motion from "motion/react-client";

const generateRandomPoints = () =>
  Array.from({ length: 3 }, () => ({
    x: `${Math.random() * 120 - 60}vw`,
    y: `${Math.random() * 120 - 60}vh`,
    scale: Math.random() * 1.4 + 0.8,
  }));

const points1 = generateRandomPoints();
const points2 = generateRandomPoints();

const HeroAnimatedBg = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-linear-to-b from-primary/10 via-primary/5 to-transparent" />
      <div className="relative w-full h-full">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/20 rounded-full opacity-50 blur-[120px]"
          animate={{
            x: points1.map((p) => p.x),
            y: points1.map((p) => p.y),
            scale: points1.map((p) => p.scale),
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 15,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-primary/10 rounded-full opacity-50 blur-[100px]"
          animate={{
            x: points2.map((p) => p.x),
            y: points2.map((p) => p.y),
            scale: points2.map((p) => p.scale),
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </div>
  );
};

export default HeroAnimatedBg;
