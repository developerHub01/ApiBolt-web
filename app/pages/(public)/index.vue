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

/* SEO ====================== */
const seoTitle = computed(() => "ApiBolt - Industrial API Tester");

const seoDescription = computed(
  () =>
    "Industrial-grade API management platform. Local-first. Zero cloud. Zero telemetry.",
);

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  ogImage: "/logo.svg",
  twitterCard: "summary",
});
</script>
