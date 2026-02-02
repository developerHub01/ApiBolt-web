<template>
  <main
    class="min-h-screen w-full bg-background text-foreground font-sans mx-auto"
  >
    <PublicHomeHero />
    <PublicHomeVideoSection />
    <PublicHomeFeatures />
    <PublicHomeCallToAction />
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

/* SEO ====================== */
const seoTitle = computed(() => "ApiBolt - Industrial API Testing Desktop App");
const seoDescription = computed(
  () =>
    "Powerful desktop application for API development, testing, and debugging. Local-first. Zero cloud. Zero telemetry. Available for Windows, macOS, and Linux.",
);
useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  ogImage: "/logo.svg",
  twitterCard: "summary_large_image",
});
</script>
