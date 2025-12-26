<script setup lang="ts">
import { DEFAULT_THEME_PALETTE } from "~/constant/default-theme.constant";
import { Button } from "@/components/ui/button";
import { isValidColor } from "~/utils/color.utils";

interface ThemeState {
  name: string;
  themeType: "dark" | "light" | "custom";
  palette: Record<string, string>;
  description: string;
  preview: string;
}

const MAX_NAME = 50;
const MAX_DESCRIPTION = 200;

const themeState = reactive<ThemeState>({
  name: "",
  themeType: "dark",
  palette: { ...DEFAULT_THEME_PALETTE },
  description: "",
  preview: "",
});

/* Compute validation states */
const isNameValid = computed(
  () => themeState.name.trim().length > 0 && themeState.name.length <= MAX_NAME
);
const isDescriptionValid = computed(
  () =>
    themeState.description.trim().length > 0 &&
    themeState.description.length <= MAX_DESCRIPTION
);
const isPaletteValid = computed(() =>
  Object.values(themeState.palette).every((c) => isValidColor(c))
);
const isPreviewValid = computed(() => Boolean(themeState.preview.trim()));

const isFormValid = computed(
  () =>
    isNameValid.value &&
    isPreviewValid.value &&
    isDescriptionValid.value &&
    isPaletteValid.value
);

const handleReset = (): void => {
  themeState.name = "";
  themeState.themeType = "dark";
  themeState.palette = { ...DEFAULT_THEME_PALETTE };
  themeState.description = "";
  themeState.preview = "";
};
</script>

<template>
  <form
    class="w-full h-full grid place-items-center"
    @submit.prevent="console.log('publish', themeState)"
  >
    <Card class="w-full border-0 gap-6 py-8 items-center max-w-4xl">
      <DashboardThemeEditorHeader />
      <CardContent class="w-full flex flex-col gap-6">
        <DashboardThemeEditorBasicInfo
          v-model:name="themeState.name"
          v-model:themeType="themeState.themeType"
          :maxLength="MAX_NAME"
        />
        <DashboardThemeEditorPreview v-model:modelValue="themeState.preview" />
        <DashboardThemeEditorPalette v-model:palette="themeState.palette" />
        <DashboardThemeEditorDescription
          v-model:modelValue="themeState.description"
          :maxLength="MAX_DESCRIPTION"
        />
      </CardContent>

      <CardFooter class="w-full flex gap-2 justify-end">
        <Button type="submit" :disabled="!isFormValid">Publish</Button>
        <Button variant="outline" type="button" @click="handleReset"
          >Reset</Button
        >
      </CardFooter>
    </Card>
  </form>
</template>
