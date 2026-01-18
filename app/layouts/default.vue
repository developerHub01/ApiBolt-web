<script setup lang="ts">
import Header from "~/components/public/common/Header.vue";
import Footer from "~/components/public/common/Footer.vue";
</script>

<template>
  <main class="flex-1 h-auto flex flex-col px-4">
    <Header />
    <section class="flex-1 flex">
      <slot />
    </section>
    <Footer />
  </main>
</template>
