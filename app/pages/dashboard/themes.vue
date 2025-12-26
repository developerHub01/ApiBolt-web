<script setup lang="ts">
const selectedTheme = ref<string | null>(null);

const handleChangeSelectedTheme = (id?: string | null) =>
  (selectedTheme.value = id ?? null);
</script>

<template>
  <section class="w-full h-full flex flex-col gap-8">
    <ThemesSearch />
    <section class="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      <ThemesCard
        v-for="value in Array.from({ length: 10 }, (_, index) =>
          String(index + 1)
        )"
        :key="value"
        :id="value"
        :onDetails="() => handleChangeSelectedTheme(value)"
      />
    </section>
    <ThemesPagination />
    <ThemesDetails :id="selectedTheme" :onClose="handleChangeSelectedTheme" />
  </section>
</template>
