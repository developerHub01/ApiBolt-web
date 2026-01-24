<template>
  <swiper
    :effect="'cards'"
    :grabCursor="true"
    :modules="modules"
    class="mySwiper w-full relative"
  >
    <span
      class="absolute bottom-0 translate-y-full left-0 w-full h-10 bg-radial from-black/70 via-black/10 to-transparent blur-sm"
    />
    <swiper-slide v-for="{ src, alt } in images">
      <AspectRatio
        :ratio="16 / 9"
        class="w-full h-full rounded-md overflow-hidden shadow-2xl"
      >
        <NuxtImg :src="src" :alt="alt" class="w-full h-full object-cover" />
      </AspectRatio>
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCards } from "swiper/modules";
import AspectRatio from "~/components/ui/aspect-ratio/AspectRatio.vue";
const modules = [EffectCards];

const props = defineProps<{
  images: Array<{
    src: string;
    alt: string;
  }>;
}>();
</script>
