<script setup lang="ts">
import {
  DEFAULT_THEME_PALETTE,
  THEME_PAYLOAD_SIZE,
} from "~/constant/default-theme.constant";
import { Button } from "@/components/ui/button";
import { isValidColor } from "~/utils/color.utils";
import { useThemeAssets } from "~/composable/useThemeAssets";
import { toast } from "vue-sonner";
import { FetchError } from "ofetch";
import type { TThemeType } from "~/types/theme.types";

interface ThemeState {
  name: string;
  themeType: TThemeType;
  palette: Record<string, string>;
  description: string;
  preview: File | null;
}

const { generateThemeAssets } = useThemeAssets();

const themeState = reactive<ThemeState>({
  name: "",
  themeType: "dark",
  palette: { ...DEFAULT_THEME_PALETTE },
  description: "",
  preview: null,
});
const isSubmitting = ref<boolean>(false);

/* Compute validation states */
const isNameValid = computed(
  () =>
    themeState.name.trim().length &&
    themeState.name.length <= THEME_PAYLOAD_SIZE.MAX_NAME,
);
const isDescriptionValid = computed(
  () =>
    themeState.description.trim().length &&
    themeState.description.length <= THEME_PAYLOAD_SIZE.MAX_DESCRIPTION,
);
const isPaletteValid = computed(() =>
  Object.values(themeState.palette).every((c) => isValidColor(c)),
);
const isPreviewValid = computed(() => Boolean(themeState.preview));

const isFormValid = computed(
  () =>
    isNameValid.value &&
    isPreviewValid.value &&
    isDescriptionValid.value &&
    isPaletteValid.value,
);

const isEnableSubmit = computed(() => isFormValid.value && !isSubmitting.value);

const handleReset = (): void => {
  themeState.name = "";
  themeState.themeType = "dark";
  themeState.palette = { ...DEFAULT_THEME_PALETTE };
  themeState.description = "";
  themeState.preview = null;
};

const handlePublish = async () => {
  if (!isEnableSubmit) return;
  isSubmitting.value = true;

  try {
    const { preview, thumbnail } = await generateThemeAssets(
      themeState.preview!,
    );

    const formData = new FormData();
    formData.append("preview", preview);
    formData.append("thumbnail", thumbnail);
    formData.append("name", themeState.name);
    formData.append("description", themeState.description);
    formData.append("themeType", themeState.themeType);
    formData.append("palette", JSON.stringify(themeState.palette));

    await $fetch("/api/v1/themes/publish", {
      method: "POST",
      body: formData,
    });

    toast.success("Theme Published!");
    handleReset();
  } catch (error) {
    toast.error((error as FetchError).data?.message ?? "Publish failed");
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <form
    class="w-full h-full grid place-items-center"
    @submit.prevent="handlePublish"
  >
    <Card class="w-full border-0 gap-6 py-8 items-center max-w-4xl">
      <DashboardThemeEditorHeader />
      <CardContent class="w-full flex flex-col gap-6">
        <DashboardThemeEditorBasicInfo
          v-model:name="themeState.name"
          v-model:themeType="themeState.themeType"
          :maxLength="THEME_PAYLOAD_SIZE.MAX_NAME"
        />
        <DashboardThemeEditorPreview v-model:modelValue="themeState.preview" />
        <DashboardThemeEditorPalette v-model:palette="themeState.palette" />
        <DashboardThemeEditorDescription
          v-model:modelValue="themeState.description"
          :maxLength="THEME_PAYLOAD_SIZE.MAX_DESCRIPTION"
        />
      </CardContent>

      <CardFooter class="w-full flex gap-2 justify-end">
        <Button type="submit" :disabled="!isEnableSubmit">
          <Spinner v-if="isSubmitting" />
          Publish</Button
        >
        <Button variant="outline" type="button" @click="handleReset"
          >Reset</Button
        >
      </CardFooter>
    </Card>
  </form>
</template>
