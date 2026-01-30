<template>
  <form
    @submit.prevent="handlePublish"
    class="w-full h-full grid place-items-center"
  >
    <Card class="w-full h-full border-0 gap-6 py-8 items-center max-w-4xl">
      <DashboardThemeEditorHeader
        heading="Create new theme"
        description="Configure the theme and publish"
      />
      <CardContent class="w-full flex flex-col gap-6 flex-1">
        <DashboardThemeEditorBasicInfo
          v-model:name="themeState.name"
          v-model:themeType="themeState.themeType"
        />
        <DashboardThemeEditorPreview
          :previewUrl="themeState.previewUrl"
          @update:previewFile="handlePreviewChange"
        />
        <DashboardThemeEditorPalette v-model:palette="themeState.palette" />
        <DashboardThemeEditorDescription
          v-model:modelValue="themeState.description"
        />
      </CardContent>
      <CardFooter class="w-full flex gap-2 justify-end">
        <Button type="submit" :disabled="isSubmitting || !isFormValid">
          <Spinner v-if="isSubmitting" />
          <span>{{ isSubmitting ? "Publishing..." : "Publish" }}</span>
        </Button>
      </CardFooter>
    </Card>
  </form>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";
import { useThemeAssets } from "~/composable/useThemeAssets";
import { DEFAULT_THEME_PALETTE } from "~/constant/default-theme.constant";

const isSubmitting = ref(false);
const { generateThemeAssets } = useThemeAssets();

const themeState = reactive({
  name: "",
  themeType: "dark" as const,
  palette: {
    ...DEFAULT_THEME_PALETTE,
  },
  description: "",
  previewUrl: "",
  previewFile: null as File | null,
});

const isFormValid = computed(() => {
  return (
    themeState.name.trim() &&
    themeState.description.trim() &&
    themeState.previewFile
  );
});

const handlePreviewChange = (file: File) => {
  themeState.previewFile = file;
  themeState.previewUrl = URL.createObjectURL(file);
};

const handlePublish = async () => {
  if (!isFormValid.value || isSubmitting.value) return;
  isSubmitting.value = true;

  try {
    const { preview, thumbnail } = await generateThemeAssets(
      themeState.previewFile!,
    );
    const formData = new FormData();
    formData.append("name", themeState.name);
    formData.append("description", themeState.description);
    formData.append("type", themeState.themeType);
    formData.append("palette", JSON.stringify(themeState.palette));
    formData.append("preview", preview);
    formData.append("thumbnail", thumbnail);

    await $fetch("/api/v1/themes/publish", { method: "POST", body: formData });
    toast.success("Theme Published");
  } catch (err) {
    toast.error("Failed to publish");
  } finally {
    isSubmitting.value = false;
  }
};
</script>
