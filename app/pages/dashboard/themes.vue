<script setup lang="ts">
import type { SearchState, ThemeMetaInterface } from "~/types/theme.types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { toast } from "vue-sonner";
import { Spinner } from "~/components/ui/spinner";

const client = useSupabaseClient();

const themeList = ref<Array<ThemeMetaInterface>>([]);
const currentPage = ref<number>(1);
const totalCount = ref<number>(0);
const pageSize = 6;
const isLoading = ref<boolean>(true);
const selectedTheme = ref<string | null>(null);
const searchParams = reactive<SearchState>({
  searchTerm: "",
  themeType: "all",
});
const deleteCandidate = ref<string | null>(null);
const isDeleting = ref<boolean>(false);

const handleFetchThemes = async () => {
  isLoading.value = true;

  const from = (currentPage.value - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = client
    .from("themes")
    .select("*", {
      count: "exact",
    })
    .range(from, to)
    .order("created_at", {
      ascending: false,
    });

  if (searchParams.searchTerm)
    query.ilike("name", `%${searchParams.searchTerm.toLowerCase()}%`);
  if (searchParams.themeType !== "all")
    query = query.eq("type", searchParams.themeType);

  const { data, count, error } = await query;

  if (!error) {
    themeList.value = (data || []) as Array<ThemeMetaInterface>;
    totalCount.value = count || 0;
  }
  isLoading.value = false;
};

const handleSearch = (state: SearchState) => {
  searchParams.searchTerm = state.searchTerm;
  searchParams.themeType = state.themeType;
  currentPage.value = 1;
  handleFetchThemes();
};

const handleUpdatePage = (newPage: number) => {
  currentPage.value = newPage;
  handleFetchThemes();
};

const handleChangedeleteCandidate = async (id?: string) =>
  (deleteCandidate.value = id ?? null);

const handleDeleteTheme = async () => {
  isDeleting.value = true;
  try {
    await $fetch(`/api/v1/themes/${deleteCandidate.value}`, {
      method: "DELETE",
    });
    toast.success("Theme delete successfully");
    handleFetchThemes();
  } catch (error) {
    console.error(error);
  } finally {
    handleChangedeleteCandidate();
    isDeleting.value = false;
  }
};

onMounted(() => handleFetchThemes());
</script>

<template>
  <section class="w-full h-full flex flex-col gap-8">
    <ThemesSearch @search="handleSearch" :disabled="isLoading" />
    <template v-if="isLoading || themeList.length">
      <section class="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        <ThemesCardSkeleton
          v-if="isLoading"
          v-for="value in Array.from({ length: pageSize })"
        />
        <template v-else>
          <ThemesCard
            v-if="themeList.length"
            v-for="theme in themeList"
            :key="theme.id"
            v-bind="theme"
            :isSelcted="selectedTheme === theme.id"
            :canDelete="true"
            @delete="() => handleChangedeleteCandidate(theme.id)"
          />
        </template>
      </section>
    </template>
    <section
      v-else
      class="w-full py-20 flex flex-col items-center justify-center border-2 border-dashed rounded-xl border-muted min-h-96"
    >
      <div class="text-center">
        <p class="text-xl font-semibold">No themes found</p>
        <p class="text-muted-foreground">Adjust your filters and try again.</p>
      </div>
    </section>

    <ThemesPagination
      :total="totalCount"
      :pageSize="pageSize"
      :currentPage="currentPage"
      @update:currentPage="handleUpdatePage"
    />
    <ClientOnly>
      <AlertDialog :open="Boolean(deleteCandidate)">
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              theme and remove data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel @click="handleChangedeleteCandidate"
              >Cancel</AlertDialogCancel
            >
            <AlertDialogAction
              @click="handleDeleteTheme"
              :disabled="isDeleting"
            >
              <Spinner v-if="isDeleting" /> Continue</AlertDialogAction
            >
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ClientOnly>
  </section>
</template>
