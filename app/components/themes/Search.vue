<template>
  <div class="w-full flex flex-col items-center gap-8 py-10">
    <SectionHeader
      v-if="heading"
      :title="heading"
      description="Discover and share custom themes to personalize your workspace"
    />

    <form
      class="w-full max-w-2xl bg-card/40 backdrop-blur-md rounded-2xl border-2 border-white/10 p-2 flex flex-col sm:flex-row gap-2 shadow-2xl"
      @submit.prevent="handleSubmit"
    >
      <div class="relative flex-1 group">
        <Search
          class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none"
        />
        <Input
          id="search-term"
          type="text"
          placeholder="Search themes..."
          v-model="searchState.searchTerm"
          class="pl-10 bg-transparent border-transparent ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-muted-foreground/50 hover:bg-muted/10 transition-colors"
        />
      </div>

      <div class="flex items-center gap-2 border-white/5">
        <Select v-model="searchState.themeType">
          <SelectTrigger
            class="flex-1 sm:w-[130px] border-0 bg-transparent focus:ring-0 shadow-none hover:bg-muted/20"
          >
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="{ id, label } in themeTypeList"
              :value="id"
              :key="id"
            >
              {{ label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" class="flex-1 sm:w-auto"> Search </Button>
      </div>
    </form>

    <div
      v-if="showClearSearch"
      class="flex gap-2 items-center animate-in fade-in slide-in-from-top-2"
    >
      <Badge
        variant="secondary"
        class="h-8 px-4 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors rounded-full"
        @click="handleClearFilter"
      >
        Clear Filters
        <X class="w-3 h-3 ml-2" />
      </Badge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-vue-next";
import SectionHeader from "@/components/public/common/SectionHeader.vue";
import type { SearchState, TThemeTypeSearch } from "~/types/theme.types";

const props = withDefaults(
  defineProps<{
    disabled: boolean;
    searchTerm: string;
    themeType: TThemeTypeSearch;
    heading?: string;
  }>(),
  {
    heading: "My themes",
  },
);

const themeTypeList: Array<{
  id: TThemeTypeSearch;
  label: string;
}> = [
  {
    id: "all",
    label: "All Types",
  },
  {
    id: "dark",
    label: "Dark Themes",
  },
  {
    id: "light",
    label: "Light Themes",
  },
  {
    id: "custom",
    label: "Custom Themes",
  },
];

const searchState = reactive<SearchState>({
  searchTerm: props.searchTerm,
  themeType: props.themeType,
});

const emit = defineEmits<{
  (e: "search", state: SearchState): void;
}>();

watch(
  () => props.searchTerm,
  (newValue) => (searchState.searchTerm = newValue),
);
watch(
  () => props.themeType,
  (newValue) => (searchState.themeType = newValue),
);

const showClearSearch = computed(
  () =>
    searchState.searchTerm || searchState.themeType !== themeTypeList[0]?.id,
);

const handleSubmit = () => emit("search", searchState);

const handleClearFilter = () => {
  searchState.searchTerm = "";
  searchState.themeType = themeTypeList[0]?.id ?? "all";
  emit("search", searchState);
};
</script>
