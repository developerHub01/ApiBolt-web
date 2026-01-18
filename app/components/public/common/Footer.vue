<script setup lang="ts">
const devLink = "https://shakil-five.vercel.app/";
</script>

<template>
  <section class="flex justify-center items-center p-3">
    <p class="text-center text-sm">
      All right reserve for Shakil_lab by
      <NuxtLink
        :to="devLink"
        target="_blank"
        class="text-primary underline font-semibold px-1 -tracking-tighter"
        >developer</NuxtLink
      >
    </p>
  </section>
</template>
