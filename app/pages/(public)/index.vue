<template>
  <main class="min-h-screen bg-background text-foreground font-sans mx-auto">
    <PublicHomeHero />
    <!-- Feature Sections -->
    <PublicHomeFeatures />
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

useSeoMeta({
  title: "ApiBolt - Industrial API Tester",
  description:
    "Industrial-grade API management platform. Local-first. Zero cloud. Zero telemetry.",
});
</script>
