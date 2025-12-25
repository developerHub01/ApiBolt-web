<script setup lang="ts">
import ThemeCard from "~/components/themes/ThemeCard.vue";
import ThemeDetails from "~/components/themes/ThemeDetails.vue";
import ThemePagination from "~/components/themes/ThemePagination.vue";
import ThemeSearch from "~/components/themes/ThemeSearch.vue";

const selectedTheme = ref<string | null>(null);

const handleChangeSelectedTheme = (id?: string | null) =>
  (selectedTheme.value = id ?? null);
</script>

<template>
  <section class="w-full h-full flex flex-col gap-6">
    <ThemeSearch />
    <section class="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      <ThemeCard
        v-for="value in Array.from({ length: 10 }, (_, index) =>
          String(index + 1)
        )"
        :key="value"
        :id="value"
        :onDetails="() => handleChangeSelectedTheme(value)"
      />
    </section>
    <ThemePagination />
    <ThemeDetails :id="selectedTheme" :onClose="handleChangeSelectedTheme" />
  </section>
</template>
