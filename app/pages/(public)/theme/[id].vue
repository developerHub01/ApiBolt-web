<template>
  <div class="w-full mx-auto">
    <template v-if="pending">pending</template>
    <template v-else-if="error || !data?.success || !data.data">
      <NotFound
        description="This theme not found. Maybe these theme not exist or author may deleted the theme."
      />
    </template>
    <template v-else>
      <ThemesDetails :theme="data.data" />
    </template>
  </div>
</template>

<script setup lang="ts">
import NotFound from "~/components/ui/not-found/NotFound.vue";
import type { ThemeInterface } from "~/types/theme.types";
import type { ApiResponse } from "~~/server/types";

const route = useRoute();
const themeId = computed(() => route.params.id);

const { data, pending, error } = useFetch<ApiResponse<ThemeInterface>>(
  () => `/api/v1/client/themes/details/${themeId.value}`,
  {
    lazy: true,
    key: `theme-${themeId.value}`,
  },
);

/* SEO ====================== */
const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl as string;

const seoTitle = computed(() => {
  if (pending.value) return "Loading theme...";
  return data.value?.data?.name
    ? `${data.value.data.name} Theme for APIBolt | Industrial UI Style`
    : "Theme not found | APIBolt Marketplace";
});

const seoDescription = computed(() => {
  if (pending.value) return "Loading theme details...";
  if (data.value?.data) {
    const theme = data.value.data;
    return `Check out the "${theme.name}" theme created by ${theme.author} (@${theme.authorUsername}) for APIBolt. Enhance your industrial API testing experience with this professional custom styling.`;
  }
  return "The requested theme could not be found in the APIBolt community marketplace.";
});

const seoImage = computed(() => {
  const thumbnail = data.value?.data?.thumbnail;
  if (!thumbnail) return `${siteUrl}/og.png`;
  return thumbnail.startsWith("http") ? thumbnail : `${siteUrl}${thumbnail}`;
});

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  ogImage: seoImage,
  ogUrl: computed(() => `${siteUrl}${route.path}`),
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
  twitterImage: seoImage,
  twitterCard: "summary_large_image",
});
</script>
