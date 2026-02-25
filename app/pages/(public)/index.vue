<template>
  <main
    class="min-h-screen w-full bg-background text-foreground font-sans mx-auto"
  >
    <PublicHomeHero />
    <PublicHomeVideoSection />
    <PublicHomeFeatures />
    <PublicHomeFakeApiSection />
    <PublicHomeCallToAction />
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});
/* SEO ====================== */
const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl as string;

const seoTitle = "APIBolt - Professional API Testing Desktop App";
const seoDescription =
  "APIBolt is a powerful desktop application for API development, testing, and debugging. Local-first, zero cloud, and zero telemetry. The best open-source lightweight API client for Windows.";

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  ogImage: `${siteUrl}/og.png`,
  ogUrl: siteUrl,
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
  twitterImage: `${siteUrl}/og.png`,
  twitterCard: "summary_large_image",
});
</script>
