<template>
  <section class="flex justify-center items-center p-4 border-t">
    <p class="text-center text-sm">
      All right reserve for <span class="font-bold text-primary">ShakilLab</span> by
      <NuxtLink
        :to="devLink"
        target="_blank"
        class="text-primary underline font-semibold px-1 -tracking-tighter"
        >developer</NuxtLink
      >
    </p>
    <NuxtLink
      to="https://www.flaticon.com/free-icons/github"
      title="github icons"
      hidden="true"
      >Github icons created by Freepik - Flaticon</NuxtLink
    >
  </section>
</template>

<script setup lang="ts">
const devLink = "https://shakil-five.vercel.app/";
</script>
