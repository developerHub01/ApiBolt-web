<template>
  <NuxtPage />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard-layout",
  middleware: ["auth"],
});
</script>
