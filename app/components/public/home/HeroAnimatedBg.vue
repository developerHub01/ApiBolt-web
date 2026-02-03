<template>
  <div class="absolute inset-0">
    <div
      class="absolute inset-0 bg-linear-to-b from-primary/10 via-primary/5 to-transparent"
    />
    <div class="relative w-full h-full">
      <div
        ref="blob1Ref"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full opacity-50 blur-[120px]"
      />
      <div
        ref="blob2Ref"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full opacity-50 blur-[100px]"
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
    const animateBlob = (el: HTMLElement) => {
      $gsap.to(el, {
        x: "random(-60, 60)vw",
        y: "random(-60, 60)vh",
        scale: "random(0.8, 2.2)",
        duration: "random(10, 20)",
        ease: "sine.inOut",
        onComplete: () => animateBlob(el),
      });
    };

    animateBlob(blob1Ref.value);
    animateBlob(blob2Ref.value);

    // Initial scale/opacity pulses
    $gsap.to([blob1Ref.value, blob2Ref.value], {
      opacity: 0.8,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }
});
</script>
