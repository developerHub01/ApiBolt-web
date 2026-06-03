import Link from "next/link";
import Image from "next/image";
import { Download, Lock, ShieldOff, WifiOff, Settings2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import HeroAnimatedBg from "./HeroAnimatedBg";
import { APP_INSTALLER_URL, APP_RELEASE_URL } from "@/constant/index.constant";
import * as motion from "motion/react-client";

const ctaButtonList = [
  {
    id: "windows",
    label: "Windows",
    icon: Download,
    href: APP_INSTALLER_URL,
    isDownloadable: true,
  },
  {
    id: "all-release",
    label: "View All Releases",
    href: APP_RELEASE_URL,
  },
];

const featureList = [
  {
    id: "private",
    title: "Private",
    description: "Zero tracking",
    icon: ShieldOff,
  },
  {
    id: "secure",
    title: "Secure",
    description: "Local password",
    icon: Lock,
  },
  {
    id: "offline",
    title: "Offline",
    description: "100% Works",
    icon: WifiOff,
  },
  {
    id: "custom",
    title: "Customizable",
    description: "Themes & layout",
    icon: Settings2,
  },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-46 pb-20">
      <HeroAnimatedBg />
      <div className="relative z-10 container mx-auto text-center flex flex-col items-center">
        <Badge
          className="mb-8 text-sm gap-2 shadow-2xl px-4 py-1.5 bg-primary/10 border-primary/20 text-primary animate-pulse scale-75 sm:scale-100 h-auto"
          variant="outline"
        >
          From the River to the Sea, Palestine Will be Free
          <Image
            src="/icons/palestine.png"
            alt="Palestine Flag"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </Badge>

        <motion.div
          className="mb-6"
          initial={{
            opacity: 0,
            y: 32,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <Image
            src="/logo.svg"
            width={96}
            height={96}
            className="w-24 h-24 mx-auto drop-shadow-2xl"
            alt="ApiBolt"
          />
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-7xl md:text-9xl font-black font-brand not-italic tracking-tighter mb-8"
          initial={{
            opacity: 0,
            y: 32,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.2,
            delay: 0.4,
            ease: [0.25, 1, 0.5, 1],
          }}
        >
          <span className="inline-block bg-linear-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            API<span className="text-primary">Bolt</span>
          </span>
        </motion.h1>

        <motion.p
          className="text-xl sm:text-3xl md:text-4xl text-muted-foreground font-bold mb-6"
          initial={{
            opacity: 0,
            y: 32,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            ease: [0.25, 1, 0.5, 1],
          }}
        >
          Desktop API Testing
        </motion.p>

        <motion.p
          className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12"
          initial={{
            opacity: 0,
            y: 32,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 1.0,
            ease: [0.25, 1, 0.5, 1],
          }}
        >
          Test and debug APIs on your machine. No cloud, no tracking, no BS.
          <br className="hidden md:block" />
          Just a powerful desktop app that respects your privacy.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 1.4,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          {ctaButtonList.map(
            ({ id, label, href, icon: Icon, isDownloadable }) => (
              <Link
                key={id}
                href={href}
                target={isDownloadable ? "_self" : "_blank"}
                download={isDownloadable}
              >
                <button
                  type="button"
                  className="group relative px-12 py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-lg overflow-hidden shadow-[0_0_40px_-10px] hover:shadow-primary/50 hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {Icon && (
                      <Icon className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                    )}
                    {label}
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-primary to-primary/80 group-hover:scale-105 transition-transform" />
                </button>
              </Link>
            ),
          )}
        </motion.div>

        <motion.div
          className="w-full sm:w-fit grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          initial={{
            opacity: 0,
            y: 32,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 1.6,
            ease: [0.25, 1, 0.5, 1],
          }}
        >
          {featureList.map(({ id, title, icon: Icon, description }) => (
            <div
              key={id}
              className="group p-4 py-8 sm:p-8 md:px-4 lg:px-8 rounded-3xl border-2 border-border/50 bg-card/50 backdrop-blur-xl text-center hover:border-primary/50 hover:bg-card transition-all duration-300 hover:scale-105"
            >
              <div className="mb-4 p-4 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 inline-block">
                <Icon className="size-5 md:size-8 text-primary" />
              </div>
              <h3 className="font-bold text-base md:text-lg mb-1">{title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
