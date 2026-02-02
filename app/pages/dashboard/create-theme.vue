<template>
  <form
    @submit.prevent="handlePublish"
    class="w-full h-full flex flex-col items-center py-10"
  >
    <Card
      class="w-full max-w-4xl border border-white/10 bg-card/40 backdrop-blur-xl shadow-2xl rounded-3xl p-4 md:p-8 flex flex-col gap-8"
    >
      <DashboardThemeEditorHeader
        heading="Create New Masterpiece"
        description="Configure your palette, assets, and metadata to share with the community."
      />
      <CardContent class="w-full flex flex-col gap-8 p-0">
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
      <CardFooter
        class="w-full flex gap-4 justify-end pt-6 border-t border-white/5 p-0"
      >
        <Button
          type="submit"
          class="min-w-32 rounded-full py-6 text-base font-semibold shadow-xl transition-all hover:scale-105 active:scale-95 px-8"
          :disabled="isSubmitting || !isFormValid"
        >
          <Spinner v-if="isSubmitting" class="mr-2" />
          <span>{{
            isSubmitting ? "Publishing Theme..." : "Publish to Marketplace"
          }}</span>
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
