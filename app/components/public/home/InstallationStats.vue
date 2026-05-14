<template>
  <section class="py-32 px-6 relative overflow-x-hidden">
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/10 rounded-full blur-[150px] pointer-events-none opacity-30"
    />

    <div class="container mx-auto relative z-10">
      <SectionHeader class="text-center">
        <template #title>
          Trusted by <span class="text-primary">Developers</span>
        </template>
        <template #description>
          Real installation numbers from developers worldwide
        </template>
      </SectionHeader>

      <div
        ref="statsGridRef"
        class="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto opacity-0 translate-y-8"
      >
        <div
          v-for="stat in statsList"
          :key="stat.id"
          class="stat-card group relative flex flex-col gap-4 rounded-xl border-2 border-white/10 bg-card/40 backdrop-blur-md shadow-xl overflow-hidden hover:border-primary/30 transition-colors duration-500 p-5"
          @mousemove="handleMouseMove"
        >
          <div
            class="absolute w-100 h-100 bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-[-50%] translate-y-[-50%] left-(--mouse-x) top-(--mouse-y) z-0"
          />
          <div
            class="flex-1 flex flex-col justify-center items-center z-20 p-5 text-center"
          >
            <p
              class="text-5xl sm:text-6xl font-black font-brand tracking-wider text-foreground leading-none mb-3"
            >
              {{ stat.displayValue }}
            </p>
            <h3
              class="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300"
            >
              {{ stat.title }}
            </h3>
            <p class="text-muted-foreground leading-relaxed text-sm">
              {{ stat.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeader from "@/components/public/common/SectionHeader.vue";

interface InstallStatsData {
  totalInstalls: number;
  uniqueDevices: number;
}

interface InstallStatsResponse {
  success: boolean;
  data: InstallStatsData | null;
}

const { data: statsResponse } = await useFetch<InstallStatsResponse>(
  "/api/v1/stats/installs",
  {
    server: true,
    lazy: false,
  },
);

const totalInstalls = computed(
  () => statsResponse.value?.data?.totalInstalls ?? 0,
);
const uniqueDevices = computed(
  () => statsResponse.value?.data?.uniqueDevices ?? 0,
);

const displayedTotalInstalls = ref<number>(0);
const displayedUniqueDevices = ref<number>(0);
const hasAnimated = ref<boolean>(false);

const formatNumber = (num: number): string => num.toLocaleString();

const statsList = computed(() => [
  {
    id: "total-installs",
    title: "Total Installs",
    description: "Every installation across all devices",
    displayValue: formatNumber(displayedTotalInstalls.value),
  },
  {
    id: "unique-devices",
    title: "Unique Devices",
    description: "Individual machines running ApiBolt",
    displayValue: formatNumber(displayedUniqueDevices.value),
  },
]);

const handleMouseMove = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  target.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
  target.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
};

const statsGridRef = ref<HTMLElement | null>(null);
const taglineRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const { $gsap } = useNuxtApp();

  if (!$gsap) return;

  if (statsGridRef.value) {
    $gsap.to(statsGridRef.value, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: statsGridRef.value,
        start: "top 85%",
      },
      onStart: () => {
        if (hasAnimated.value) return;
        hasAnimated.value = true;

        $gsap.to(displayedTotalInstalls, {
          value: totalInstalls.value,
          duration: 2,
          ease: "power2.out",
          roundProps: "value",
        });

        $gsap.to(displayedUniqueDevices, {
          value: uniqueDevices.value,
          duration: 2,
          ease: "power2.out",
          roundProps: "value",
        });
      },
    });
  }

  if (taglineRef.value) {
    $gsap.to(taglineRef.value, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: taglineRef.value,
        start: "top 90%",
      },
    });
  }
});
</script>
