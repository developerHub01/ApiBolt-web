<script setup lang="ts">
import type { ThemeInterface } from "~/types/theme.types";
import type { ApiResponse } from "~~/server/types";

const route = useRoute();
const themeId = computed(() => route.params.id);

const { data, pending, error } = await useFetch<ApiResponse<ThemeInterface>>(
  () => `/api/v1/client/themes/details/${themeId.value}`,
  {
    key: () => `theme-${themeId.value}`,
  },
);

console.log({
  data: data.value,
  pending,
  error,
});
</script>

<template>
  <template v-if="pending">pending</template>
  <template v-else-if="error || !data?.success || !data.data">error</template>
  <template v-else>
    <ThemesDetails :theme="data.data" />
  </template>
</template>
