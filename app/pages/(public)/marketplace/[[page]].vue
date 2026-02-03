<template>
  <section
    class="w-full h-full flex flex-col gap-8 container mx-auto px-6 pt-15 pb-20"
  >
    <h1 class="sr-only">Theme Gallery</h1>
    <ThemesSearch
      @search="handleSearch"
      :searchTerm="searchParams.searchTerm"
      :themeType="searchParams.themeType"
      :disabled="isLoading"
      heading="Explore Themes"
    />
    <template v-if="isLoading || themeList.length">
      <section class="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ThemesCardSkeleton
          v-if="isLoading"
          v-for="(_, index) in pageSize"
          :key="index"
        />
        <template v-else>
          <NuxtLink
            v-for="theme in themeList"
            :key="theme.id"
            :to="`/theme/${theme.id}`"
            target="_blank"
          >
            <ThemesCard
              v-bind="theme"
              :canDelete="false"
              :showLink="false"
              class="pointer-events-none"
            />
          </NuxtLink>
        </template>
      </section>
    </template>
    <section
      v-else
      class="w-full py-20 flex flex-col items-center justify-center border-2 border-dashed rounded-xl border-muted min-h-96"
    >
      <div class="text-center">
        <p class="text-xl font-semibold">No themes found</p>
      </div>
    </section>

    <ThemesPagination
      :total="totalCount"
      :pageSize="pageSize"
      :currentPage="currentPage"
      @update:currentPage="handleUpdatePage"
    />
  </section>
</template>

<script setup lang="ts">
import { SEARCH_THEME_TYPE_SET } from "~/constant/theme.constant";
import type {
  SearchState,
  ThemeListThemeMetaInterface,
  TThemeTypeSearch,
} from "~/types/theme.types";
import type { ApiResponse } from "~~/server/types";

const route = useRoute();
const router = useRouter();

const isThemeType = (type: unknown): type is TThemeTypeSearch =>
  typeof type === "string" &&
  SEARCH_THEME_TYPE_SET.has(type as TThemeTypeSearch);

const currentPage = ref<number>(Number(route.query.page) || 1);
const pageSize = 6;

const searchParams = reactive<SearchState>({
  searchTerm: String(route.query.searchTerm || ""),
  themeType: isThemeType(route.query.searchFilter)
    ? route.query.searchFilter
    : "all",
});

/* SEO ================= */
const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl as string;

const seoTitle = computed(() =>
  searchParams.searchTerm
    ? `Results for "${searchParams.searchTerm}" | ApiBolt Theme Marketplace`
    : "Explore ApiBolt Community Themes | Professional UI Theme Marketplace",
);
const seoDescription = computed(() =>
  searchParams.searchTerm
    ? `Browse themes matching "${searchParams.searchTerm}" for the ApiBolt desktop app. Find the perfect style for your API development workflow.`
    : "Explore and download custom themes for ApiBolt, the industrial API testing desktop app. Personalize your workspace with community-crafted designs built for speed and clarity.",
);
const seoImage = computed(() => `${siteUrl}/og.png`);

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

const { data: response, status } = useFetch<
  ApiResponse<ThemeListThemeMetaInterface>
>("/api/v1/client/themes/meta", {
  lazy: true,
  query: {
    page: currentPage,
    pageSize,
    searchTerm: computed(() => searchParams.searchTerm || undefined),
    searchFilter: computed(() => searchParams.themeType),
  },
});

const themeList = computed(() => response.value?.data?.data ?? []);
const totalCount = computed(() => response.value?.data?.meta.total ?? 0);
const isLoading = computed(() => status.value === "pending");

const handleSearch = (state: SearchState) => {
  searchParams.searchTerm = state.searchTerm;
  searchParams.themeType = isThemeType(state.themeType)
    ? state.themeType
    : "all";
  currentPage.value = 1;

  router.push({
    query: {
      ...route.query,
      page: 1,
      searchTerm: searchParams.searchTerm || undefined,
      searchFilter:
        searchParams.themeType !== "all" ? searchParams.themeType : undefined,
    },
  });
};

const handleUpdatePage = (newPage: number) => {
  currentPage.value = newPage;
  router.push({
    query: {
      ...route.query,
      page: newPage,
    },
  });
};
</script>
