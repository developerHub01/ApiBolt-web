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

const userName = computed(() => route.params["username"] as string);

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

useSeoMeta({
  title: () =>
    searchParams.searchTerm
      ? `Results for "${searchParams.searchTerm}"`
      : "Community Themes",
  description: "Browse custom themes.",
});

const { data: response, status } = await useFetch<
  ApiResponse<ThemeListThemeMetaInterface>
>("/api/v1/client/themes/meta", {
  query: {
    page: currentPage,
    pageSize,
    searchTerm: computed(() => searchParams.searchTerm || undefined),
    searchFilter: computed(() => searchParams.themeType),
    userName,
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

<template>
  <section class="w-full flex flex-col gap-8 container mx-auto py-15">
    <ThemesSearch
      @search="handleSearch"
      :searchTerm="searchParams.searchTerm"
      :themeType="searchParams.themeType"
      :disabled="isLoading"
      :heading="`All themes by ${userName}`"
    />
    <template v-if="isLoading || themeList.length">
      <section class="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-5">
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
