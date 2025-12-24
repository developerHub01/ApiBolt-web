<script setup lang="ts">
import ThemeCard from "~/components/themes/ThemeCard.vue";
import ThemeDetails from "~/components/themes/ThemeDetails.vue";

useSeoMeta({
  title: "APIBolt theme marketplace",
  description:
    "APIBolt theme marketplace. Explore tons of themes from the community and download and review.",
});

const searchTypeList = ["Name", "Author"];
const themeTypeList = ["All", "Dark", "Light", "Custom"];

const route = useRoute();
const router = useRouter();

const page = computed<number>({
  get() {
    const p = Number(route.params.page);
    return Number.isNaN(p) || p < 1 ? 1 : p;
  },
  set(value) {
    router.push({
      params: {
        ...route.params,
        page: value,
      },
    });
  },
});

const searchState = reactive({
  searchTerm: "",
  searchType: searchTypeList[0],
  themeType: themeTypeList[0],
});
const selectedTheme = ref<string | null>(null);

const themeList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const handleSelectTheme = (id?: string) => (selectedTheme.value = id ?? null);

const showClearFilter = computed(
  () =>
    searchState.searchType !== searchTypeList[0] ||
    searchState.themeType !== themeTypeList[0]
);
const isOpenDetails = computed(() => Boolean(selectedTheme.value));
</script>

<template>
  <!-- <UContainer>
    <UPageSection>
      <section
        class="w-full p-5 rounded-md shadow-2xl bg-elevated flex flex-col gap-5 justify-center items-center"
      >
        <div class="flex flex-col text-center">
          <h1 class="text-2xl md:text-4xl font-bold pb-3">Theme marketplace</h1>
          <p class="text-sm text-default/80">
            Search for themes and use in your app in just few clicks
          </p>
        </div>
        <div
          class="flex flex-col justify-center items-center w-full max-w-150 gap-3"
        >
          <div class="flex w-full">
            <UInput
              id="search-input"
              v-model="searchState.searchTerm"
              color="neutral"
              variant="ghost"
              placeholder="Search..."
              class="w-full border border-r-0 rounded-l-md"
            />
            <UButton
              trailing-icon="i-lucide-search"
              size="md"
              color="primary"
              variant="solid"
              class="rounded-none rounded-r-md"
              >Search</UButton
            >
          </div>
          <div
            class="flex flex-wrap justify-center items-center gap-x-3 gap-y-2"
          >
            <div class="flex items-center gap-1">
              <label for="search-type" class="text-sm">Search by:</label>
              <USelect
                v-model="searchState.searchType"
                :items="searchTypeList"
                class="w-30"
                id="search-type"
                variant="subtle"
              />
            </div>
            <div class="flex items-center gap-1">
              <label for="search-type" class="text-sm">Search by:</label>
              <USelect
                v-model="searchState.themeType"
                :items="themeTypeList"
                class="w-30"
                id="search-type"
                variant="subtle"
              />
            </div>
          </div>
          <UButton v-if="showClearFilter" class="w-fit">Clear Filters</UButton>
        </div>
      </section>
      <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ThemeCard
          v-for="theme in themeList"
          :id="theme"
          :onClick="() => handleSelectTheme(theme)"
          :isSelcted="selectedTheme === theme"
        />
      </section>
      <UPagination
        v-model:page="page"
        active-color="primary"
        active-variant="subtle"
        :total="100"
        class="mx-auto"
        :sibling-count="1"
        size="md"
      />
    </UPageSection>
    <ClientOnly>
      <LazyThemesThemeDetails
        :isOpen="isOpenDetails"
        :onClose="handleSelectTheme"
      />
    </ClientOnly>
  </UContainer> -->
</template>
