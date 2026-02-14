<template>
  <section class="py-32 px-6 relative">
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50"
    />
    <div class="container mx-auto relative perspective-1000">
      <div ref="titleRef" class="opacity-0 translate-y-8">
        <SectionHeader class="text-center">
          <template #title>See APIBolt in Action </template>
          <template #description>
            Watch how fast you can build and test APIs
          </template>
        </SectionHeader>
      </div>

      <!-- Video Container -->
      <div
        class="group relative rounded-2xl bg-background/50 border border-border/50 shadow-2xl backdrop-blur-sm overflow-hidden scale-90!"
        style="transform-style: preserve-3d"
        ref="videoContainerRef"
      >
        <!-- Video Thumbnail Container -->
        <AspectRatio
          :ratio="16 / 9"
          class="relative bg-black/50 aspect-video group-hover:bg-black/40 transition-colors duration-500"
        >
          <NuxtImg
            src="/images/home/app_video_thumbnail.png"
            alt="ApiBolt Demo"
            loading="lazy"
            format="webp"
            :sizes="{
              sm: '100vw',
              md: '100vw',
              lg: '1040px',
            }"
            class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 ease-out"
          />

          <!-- Play Button -->
          <div class="absolute inset-0 flex items-center justify-center">
            <button
              @click="isOpen = true"
              class="relative group/btn flex items-center gap-3 px-4 py-2 sm:px-8 sm:py-4 bg-background/10 hover:bg-background/90 backdrop-blur-md rounded-full border border-white/10 hover:border-primary/20 shadow-[0_0_200px_50px] shadow-transparent group-hover:shadow-accent hover:shadow-[0_0_200px_150px] group-hover:scale-105 hover:scale-120 transition-all duration-300"
            >
              <div
                class="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center"
              >
                <Play
                  class="w-5 h-5 text-primary-foreground fill-current ml-0.5"
                />
              </div>
              <span class="text-white font-medium pr-2"
                >Watch Introduction</span
              >
            </button>
          </div>
        </AspectRatio>
      </div>

      <!-- Video Modal -->
      <Teleport to="body">
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 backdrop-blur-none"
          enter-to-class="opacity-100 backdrop-blur-md"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 backdrop-blur-md"
          leave-to-class="opacity-0 backdrop-blur-none"
        >
          <div
            v-if="isOpen"
            class="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8 bg-background/80"
            @click.self="isOpen = false"
          >
            <div
              class="relative w-full max-w-7xl max-h-[90vh] aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black"
            >
              <button
                class="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors z-101 cursor-pointer"
                @click="isOpen = false"
              >
                <X class="w-6 h-6" />
              </button>
              <iframe
                width="100%"
                height="100%"
                :src="videoUrl"
                title="ApiBolt Introduction"
                frameborder="0"
                allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture;
                "
                allowfullscreen
              />
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Play, X } from "lucide-vue-next";
import SectionHeader from "@/components/public/common/SectionHeader.vue";

const isOpen = ref(false);
const videoContainerRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);

const videoUrl = computed(() => {
  const base = "https://www.youtube.com/embed/u2t3AvMtXXI?si=_8mcg3QsrJfCygn-";
  return isOpen.value ? `${base}&autoplay=1` : base;
});

onMounted(() => {
  const { $gsap } = useNuxtApp();
  if ($gsap) {
    /* 1. Title Entrance (Simple Fade Up) */
    if (titleRef.value) {
      $gsap.to(titleRef.value, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.value,
          start: "top 85%",
        },
      });
    }

    /* 2. Video 3D "Wake Up" Scroll Scrub */
    if (videoContainerRef.value) {
      $gsap.set(videoContainerRef.value, {
        rotateX: 60,
        scale: 0.5,
        opacity: 0,
        y: 150,
        transformOrigin: "center center",
      });

      const tl = $gsap.timeline({
        scrollTrigger: {
          trigger: videoContainerRef.value,
          start: "top bottom-=10%",
          end: "bottom top+=30%",
          scrub: 1,
        },
      });

      /* Phase 1: Wake up (Enter from bottom) */
      tl.to(videoContainerRef.value, {
        rotateX: 0,
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power2.out",
      })
        /* Phase 2: Stay flat (Center screen) - Longer hold */
        .to(videoContainerRef.value, {
          rotateX: 0,
          duration: 2,
        });
    }
  }
});
</script>

<style scoped>
.perspective-1000 {
  perspective: 800px;
}
</style>
