import { APP_INSTALLER_URL, SITE_URL } from "@/constant/index.constant";
import * as motion from "motion/react-client";
import Link from "next/link";
import { Download } from "lucide-react";
import CopyButton from "@/components/app/public/fake/CopyButton";
import HeroAnimatedBg from "@/components/app/public/home/hero/HeroAnimatedBg";

const apiBaseUrl = `${SITE_URL}/fake/v1`;

const FakeHeader = () => {
  return (
    <header className="relative py-24 md:py-32 pt-50 md:pt-60 border-white/5">
      <HeroAnimatedBg />
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          <motion.div
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
              ease: [0.33, 0, 0.2, 1],
            }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-brand tracking-tight text-white mb-6">
              Fake API
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A comprehensive mock API for prototyping and testing.{" "}
              <span className="text-foreground">
                Zero config. No auth. Always free.
              </span>
            </p>
            <Link
              href={APP_INSTALLER_URL}
              download
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 mt-6 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> DOWNLOAD APIBOLT
              </span>
            </Link>
          </motion.div>

          <motion.div
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
              delay: 0.4,
              ease: [0.33, 0, 0.2, 1],
            }}
            className="w-fit self-end lg:w-auto"
          >
            <div className="group relative rounded-lg bg-black/40 border border-white/10 backdrop-blur-sm overflow-hidden transition-all hover:border-primary/50">
              <div className="flex items-center gap-4 px-5 py-4 font-mono text-sm">
                <span className="text-primary font-bold">GET</span>
                <span className="text-white select-all">{apiBaseUrl}</span>
                <CopyButton text={apiBaseUrl} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default FakeHeader;
