<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

const links = ref<Array<ButtonProps>>([
  {
    label: "Learn more about me",
    color: "neutral",
    variant: "subtle",
    trailingIcon: "i-lucide-arrow-right",
  },
]);
</script>

<template>
  <UPageCTA
    title="Md. Abdus Shohid Shakil"
    description="I am the developer of APIBolt and fullstack developer who is more love to build complext frontend and desktop softwares and solve problems."
    orientation="horizontal"
    :links="links"
    class="flex-1 flex justify-center items-center h-full"
  >
    <div class="w-full flex items-center lg:justify-end">
      <img
        src="/images/developer.jpg"
        width="320"
        height="364"
        alt="Illustration"
        class="w-full max-w-96 rounded-lg"
      />
    </div>
  </UPageCTA>
</template>
