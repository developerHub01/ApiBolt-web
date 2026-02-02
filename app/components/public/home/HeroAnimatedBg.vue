<template>
  <div class="absolute inset-0">
    <div
      class="absolute inset-0 bg-linear-to-b from-primary/10 via-primary/5 to-transparent"
    />
    <div class="relative container mx-auto w-full h-full">
      <div
        ref="blob1Ref"
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full opacity-50 blur-3xl"
      />
      <div
        ref="blob2Ref"
        class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full opacity-50 blur-3xl"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const blob1Ref = ref<HTMLElement | null>(null);
const blob2Ref = ref<HTMLElement | null>(null);

onMounted(() => {
  const { $gsap } = useNuxtApp();

  if ($gsap && blob1Ref.value && blob2Ref.value) {
    $gsap.to(blob1Ref.value, {
      scale: 1.2,
      opacity: 0.8,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    $gsap.to(blob2Ref.value, {
      scale: 1.2,
      opacity: 0.8,
      duration: 4,
      delay: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }
});
</script>
