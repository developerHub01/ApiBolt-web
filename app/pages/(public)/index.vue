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
const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl as string;

const seoTitle =
  "ApiBolt - Industrial API Testing Desktop App | Open Source Postman Alternative";
const seoDescription =
  "ApiBolt is a powerful desktop application for API development, testing, and debugging. Local-first, zero cloud, and zero telemetry. The best open-source alternative to Postman for Windows, macOS, and Linux.";

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
