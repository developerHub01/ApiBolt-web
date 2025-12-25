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
import DashboardHeading from "~/components/dashboard/DashboardHeading.vue";

const searchTypeList = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "author",
    label: "Author",
  },
];

const themeTypeList = [
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

const labelList = ["Search Type", "Theme Type"];

const searchState = reactive({
  searchTearm: "",
  searchType: searchTypeList[0]?.id,
  themeType: themeTypeList[0]?.id,
});

const showClearFilter = computed(
  () =>
    searchState.searchType !== searchTypeList[0]?.id ||
    searchState.themeType !== themeTypeList[0]?.id
);

const handleSubmit = () => {
  console.log({ searchState });
};
const handleClearFilter = () => {
  searchState.searchType = searchTypeList[0]?.id;
  searchState.themeType = themeTypeList[0]?.id;
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
            v-model="searchState.searchTearm"
          />
          <Button type="submit">Search</Button>
        </ButtonGroup>
        <div class="w-full grid grid-cols-2 gap-3">
          <Label v-for="label in labelList" class="text-muted-foreground"
            >{{ label }}:</Label
          >
          <Select v-model="searchState.searchType">
            <SelectTrigger size="sm" class="w-full">
              <SelectValue placeholder="Search type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="{ id, label } in searchTypeList"
                :value="id"
                :key="id"
              >
                {{ label }}
              </SelectItem>
            </SelectContent>
          </Select>
          <Select v-model="searchState.themeType">
            <SelectTrigger size="sm" class="w-full">
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
        </div>
        <Button
          type="button"
          class="self-center"
          variant="secondary"
          size="sm"
          @click="handleClearFilter"
          v-if="showClearFilter"
          >Clear Filter</Button
        >
      </form>
    </CardContent>
  </Card>
</template>
