<script setup lang="ts">
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { SearchState, TThemeTypeSearch } from "~/types/theme.types";

const props = defineProps<{
  disabled: boolean;
}>();

const themeTypeList: Array<{
  id: TThemeTypeSearch;
  label: string;
}> = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "dark",
    label: "Dark",
  },
  {
    id: "light",
    label: "Light",
  },
  {
    id: "custom",
    label: "Custom",
  },
];

const searchState = reactive<SearchState>({
  searchTerm: "",
  themeType: themeTypeList[0]?.id ?? "all",
});

const emit = defineEmits<{
  (e: "search", state: SearchState): void;
}>();

const showClearSearch = computed(
  () => searchState.searchTerm || searchState.themeType !== themeTypeList[0]?.id
);

const handleSubmit = () => emit("search", searchState);

const handleClearFilter = () => {
  searchState.searchTerm = "";
  searchState.themeType = themeTypeList[0]?.id ?? "all";
  emit("search", searchState);
};
</script>

<template>
  <Card class="w-full py-8 border-0">
    <CardHeader>
      <DashboardHeading>My themes</DashboardHeading>
    </CardHeader>
    <CardContent class="flex justify-center items-center">
      <form
        class="w-full max-w-xl flex flex-col gap-3"
        @submit.prevent="handleSubmit"
      >
        <ButtonGroup class="w-full">
          <Input
            id="search-term"
            type="text"
            placeholder="Search with theme details"
            v-model="searchState.searchTerm"
          />
          <Button type="submit" :disabled="disabled">Search</Button>
        </ButtonGroup>
        <div class="w-full flex items-center justify-center gap-3">
          <Label class="text-muted-foreground">Theme Type:</Label>
          <Select v-model="searchState.themeType">
            <SelectTrigger size="sm" class="min-w-40">
              <SelectValue placeholder="Theme type" />
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
          <Button
            type="button"
            class="self-center"
            variant="secondary"
            size="sm"
            @click="handleClearFilter"
            v-if="showClearSearch"
            >Clear Search</Button
          >
        </div>
      </form>
    </CardContent>
  </Card>
</template>
