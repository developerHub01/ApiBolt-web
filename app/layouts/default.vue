<script setup lang="ts">
import Header from "~/components/public/common/Header.vue";
import Footer from "~/components/public/common/Footer.vue";
</script>

<template>
  <Header />
  <main class="flex-1 h-auto flex flex-col">
    <slot />
  </main>
  <Footer />
</template>
