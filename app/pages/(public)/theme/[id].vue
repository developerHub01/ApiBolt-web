<script setup lang="ts">
import NotFound from "~/components/ui/NotFound.vue";
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

/* SEO ====================== */
const seoTitle = computed(() => {
  if (pending.value) return "Loading theme...";
  return data.value?.data?.name
    ? `${data.value.data.name} Theme - APIBolt`
    : "Theme not found - APIBolt";
});

const seoDescription = computed(() => {
  if (pending.value) return "Loading... - APIBolt";
  return data.value?.data?.name
    ? `${data.value.data.name} theme, author ${data.value.data.authorUsername} named ${data.value.data.author} - APIBolt.`
    : "Following theme not found - APIBolt.";
});
const seoImage = computed(() => data.value?.data?.thumbnail || "/logo.svg");

useHead({
  title: seoTitle,
  meta: [
    { name: "description", content: seoDescription },
    { property: "og:title", content: seoTitle },
    { property: "og:description", content: seoDescription },
    { property: "og:image", content: seoImage },
    { property: "og:type", content: "website" },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: seoTitle },
    { name: "twitter:image", content: seoImage },
  ],
});
</script>

<template>
  <template v-if="pending">pending</template>
  <template v-else-if="error || !data?.success || !data.data">
    <NotFound
      description="This theme not found. Maybe these theme not exist or author may deleted the theme."
    />
  </template>
  <template v-else>
    <ThemesDetails :theme="data.data" />
  </template>
</template>
