<template>
  <section
    class="relative min-h-screen flex items-center justify-center px-6 pt-45 pb-20 -mt-24"
  >
    <PublicHomeHeroAnimatedBg />
    <div
      class="relative z-10 container mx-auto text-center flex flex-col items-center"
    >
      <Badge
        class="mb-8 text-sm gap-2 shadow-2xl px-4 py-1.5 bg-primary/10 border-primary/20 text-primary animate-pulse scale-75 sm:scale-100"
        variant="outline"
      >
        From the River to the Sea, Palestine Will be Free
        <NuxtImg
          src="/icons/palestine.png"
          alt="Palestine Flag"
          class="w-6 h-6"
        />
      </Badge>

      <div ref="logoRef" class="mb-6 opacity-0 translate-y-8">
        <NuxtImg
          src="/logo.svg"
          class="w-24 h-24 mx-auto drop-shadow-2xl"
          alt="ApiBolt"
        />
      </div>
      <h1
        ref="headingRef"
        class="text-7xl md:text-9xl font-black font-brand not-italic tracking-tighter mb-8 opacity-0 translate-y-8"
      >
        <span
          class="inline-block bg-linear-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent"
        >
          API<span class="text-primary">Bolt</span>
        </span>
      </h1>
      <p
        ref="subtitleRef"
        class="text-2xl sm:text-3xl md:text-4xl text-muted-foreground font-bold mb-6 opacity-0 translate-y-8"
      >
        Desktop API Testing
      </p>
      <p
        ref="descRef"
        class="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12 opacity-0 translate-y-8"
      >
        Test and debug APIs on your machine. No cloud, no tracking, no BS.<br
          class="hidden md:block"
        />
        Just a powerful desktop app that respects your privacy.
      </p>

      <!-- CTA Buttons -->
      <div
        ref="ctaRef"
        class="flex flex-col sm:flex-row gap-6 justify-center mb-20 opacity-0 scale-90"
      >
        <NuxtLink
          v-for="{ id, label, href } in ctaButtonList"
          :key="id"
          :to="href"
          target="_blank"
        >
          <button
            class="group relative px-12 py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-lg overflow-hidden shadow-[0_0_40px_-10px] hover:shadow-primary/50 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span class="relative z-10 flex items-center justify-center gap-3">
              <Download class="w-6 h-6" />
              {{ label }}
            </span>
            <div
              class="absolute inset-0 bg-linear-to-r from-primary to-primary/80 group-hover:scale-105 transition-transform"
            />
          </button>
        </NuxtLink>
      </div>

      <!-- Feature highlights -->
      <div
        ref="featuresRef"
        class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto opacity-0 translate-y-8"
      >
        <div
          v-for="{ id, title, icon, description } in featureList"
          :key="id"
          class="group p-4 sm:p-8 rounded-3xl border-2 border-border/50 bg-card/50 backdrop-blur-xl text-center hover:border-primary/50 hover:bg-card transition-all duration-300 hover:scale-105"
        >
          <div
            class="mb-4 p-4 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 inline-block"
          >
            <component :is="icon" class="size-5 md:size-8 text-primary" />
          </div>
          <h3 class="font-bold text-base md:text-lg mb-1">{{ title }}</h3>
          <p class="text-xs md:text-sm text-muted-foreground">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  Download,
  Lock,
  ShieldOff,
  HardDrive,
  WifiOff,
  Settings2,
} from "lucide-vue-next";

const ctaButtonList = [
  {
    id: "windows",
    label: "Windows",
    icon: "Download",
    href: "https://github.com/api-bolt/api-bolt/releases/download/v1.0.0/api-bolt-1.0.0-win-x64.exe",
  },
  {
    id: "linux",
    label: "Linux",
    icon: "Download",
    href: "https://github.com/api-bolt/api-bolt/releases/download/v1.0.0/api-bolt-1.0.0-linux-x64.AppImage",
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

// Element refs
const logoRef = ref<HTMLElement | null>(null);
const headingRef = ref<HTMLElement | null>(null);
const subtitleRef = ref<HTMLElement | null>(null);
const descRef = ref<HTMLElement | null>(null);
const ctaRef = ref<HTMLElement | null>(null);
const featuresRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const { $gsap } = useNuxtApp();

  if ($gsap) {
    const tl = $gsap.timeline({
      defaults: {
        ease: "power4.out",
      },
    });

    if (
      logoRef.value &&
      headingRef.value &&
      subtitleRef.value &&
      descRef.value &&
      ctaRef.value &&
      featuresRef.value
    ) {
      tl.to(logoRef.value, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.7)",
      })
        .to(
          headingRef.value,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.6",
        )
        .to(
          subtitleRef.value,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.8",
        )
        .to(
          descRef.value,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.6",
        )
        .to(
          ctaRef.value,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
          },
          "-=0.4",
        )
        .to(
          featuresRef.value,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.6",
        );
    }
  }
});
</script>
