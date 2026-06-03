import { AppInstallationInterface } from "@/types/status.types";
import * as motion from "motion/react-client";
import CounterAnimation from "@/components/app/common/CounterAnimation";
import SectionHeader from "@/components/app/common/SectionHeader";
import SpotlightEffectCard from "@/components/app/common/SpotlightEffectCard";
import { API_URL } from "@/constant/index.constant";
import { ApiResponse } from "@/types/server/api.types";

const getStats = async () => {
  const res = await fetch(`${API_URL}/status/installs`, {
    next: {
      revalidate: 60,
    },
  });

  const response: ApiResponse<AppInstallationInterface> = await res.json();
  return (
    response.data ?? {
      totalInstalls: 0,
      uniqueDevices: 0,
    }
  );
};

const InstallationStates = async () => {
  const stats = await getStats();

  const statsList = [
    {
      id: "total-installs",
      title: "Total Installs",
      description: "Every installation across all devices",
      displayValue: stats.totalInstalls,
    },
    {
      id: "unique-devices",
      title: "Unique Devices",
      description: "Individual machines running ApiBolt",
      displayValue: stats.uniqueDevices,
    },
  ];

  return (
    <motion.section
      className="py-35 px-6 relative overflow-x-hidden"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/10 rounded-full blur-[150px] pointer-events-none opacity-30" />

      <div className="container mx-auto relative z-10">
        <SectionHeader
          title={
            <>
              Trusted by <span className="text-primary">Developers</span>
            </>
          }
          description={<>Real installation numbers from developers worldwide</>}
        />
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto"
          initial={{
            opacity: 0,
            y: 32,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.4,
            duration: 1,
            ease: "easeOut",
          }}
        >
          {statsList.map((stat) => (
            <SpotlightEffectCard
              key={stat.id}
              className="group relative flex flex-col gap-4 rounded-xl border-2 border-white/10 bg-card/40 backdrop-blur-md shadow-xl overflow-hidden hover:border-primary/30 transition-colors duration-500 p-5"
              whileHover={{
                scale: 1.02,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
            >
              <div className="flex-1 flex flex-col justify-center items-center z-20 p-5 text-center">
                <CounterAnimation
                  value={stat.displayValue}
                  className="text-5xl sm:text-6xl font-black font-brand tracking-wider text-foreground leading-none mb-3"
                />
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                  {stat.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {stat.description}
                </p>
              </div>
            </SpotlightEffectCard>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default InstallationStates;
