<template>
  <section
    class="w-full h-full flex flex-col gap-8 container mx-auto px-6 pt-40 md:pt-45 pb-20"
  >
    <!-- Decorative Background Elements -->
    <div
      class="fixed top-1/4 -left-20 size-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none"
    ></div>
    <div
      class="fixed bottom-1/4 -right-20 size-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none"
    ></div>
    <h1 class="sr-only">Theme Gallery</h1>
    <ThemesSearch
      @search="handleSearch"
      :searchTerm="searchParams.searchTerm"
      :themeType="searchParams.themeType"
      :disabled="isLoading"
    >
      <template #title> Theme Market </template>

      <template #description>
        <template v-if="totalThemeCount && totalThemeCount > 0">
          Explore and share
          <span
            class="inline-block bg-primary text-primary-foreground rounded-full px-3 py-1 mx-0.5 text-sm font-bold ring-1 ring-primary/30 backdrop-blur-sm shadow-[0_0_80px_0px] shadow-primary animate-pulse"
            >{{ totalThemeCount }}+</span
          >
          custom themes to make your workspace truly yours.
        </template>
        <template v-else>
          Explore and share custom themes to make your workspace truly yours.
        </template>
      </template>
    </ThemesSearch>
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
const totalThemeCount = computed(
  () => response.value?.data?.meta.totalThemeCount ?? 0,
);
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
    ? `Results for "${searchParams.searchTerm}" | APIBolt Theme Marketplace`
    : "Explore APIBolt Community Themes | Professional UI Theme Marketplace",
);
const seoDescription = computed(() =>
  searchParams.searchTerm
    ? `Browse themes matching "${searchParams.searchTerm}" for the APIBolt desktop app. Find the perfect style for your API development workflow.`
    : "Explore and download custom themes for APIBolt, the industrial API testing desktop app. Personalize your workspace with community-crafted designs built for speed and clarity.",
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
