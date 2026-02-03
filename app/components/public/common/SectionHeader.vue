<template>
  <div class="mb-12 text-center">
    <h2
      class="text-5xl md:text-6xl font-bold pb-6 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
    >
      {{ title }}
    </h2>
    <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>
