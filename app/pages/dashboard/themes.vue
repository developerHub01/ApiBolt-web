<script setup lang="ts">
import ThemeCard from "~/components/themes/ThemeCard.vue";
import ThemePagination from "~/components/themes/ThemePagination.vue";
import ThemeSearch from "~/components/themes/ThemeSearch.vue";
</script>

<template>
  <section class="w-full h-full flex flex-col gap-6">
    <ThemeSearch />
    <section class="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      <ThemeCard v-for="value in Array.from({ length: 10 }).fill(0)" />
    </section>
    <ThemePagination />
  </section>
</template>
