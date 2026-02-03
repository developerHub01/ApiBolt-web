<template>
  <main
    class="min-h-screen flex flex-col font-sans text-foreground bg-background overflow-x-clip"
  >
    <Header />
    <section class="flex-1 w-full flex flex-col">
      <slot />
    </section>
    <Footer />
    <PublicCommonScrollToTop />
  </main>
</template>

<script setup lang="ts">
import Header from "~/components/public/common/Header.vue";
import Footer from "~/components/public/common/Footer.vue";
</script>
