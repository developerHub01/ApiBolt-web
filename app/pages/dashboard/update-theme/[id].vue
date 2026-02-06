<template>
  <form
    @submit.prevent="handleUpdate"
    class="w-full h-full grid place-items-center"
  >
    <Card class="w-full h-full border-0 gap-6 py-8 items-center max-w-4xl">
      <DashboardThemeEditorHeader
        heading="Edit Theme"
        description="Modify your theme settings and save changes to the gallery."
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
        <Button
          type="button"
          variant="outline"
          class="rounded-full shadow-xl"
          :disabled="isSubmitting || !hasUnsavedChanges"
          @click="handleReset"
        >
          Reset
        </Button>
        <Button
          type="submit"
          class="rounded-full shadow-xl"
          :disabled="
            isSubmitting ||
            !themeState.description.trim() ||
            !themeState.name.trim() ||
            !hasUnsavedChanges
          "
        >
          <Spinner v-if="isSubmitting" />
          <span>{{ isSubmitting ? "Updating..." : "Update Theme" }}</span>
        </Button>
      </CardFooter>
    </Card>
  </form>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";
import { useThemeAssets } from "~/composable/useThemeAssets";
import type { ApiResponse } from "~~/server/types";
import type { ThemeInterface, TThemeType } from "~/types/theme.types";

const route = useRoute();
const themeId = route.params.id;
const isSubmitting = ref(false);
const { generateThemeAssets } = useThemeAssets();

const serverBaseline = shallowRef<{
  name: string;
  themeType: TThemeType;
  palette: Record<string, string>;
  description: string;
  previewUrl: string;
} | null>(null);

const themeState = reactive({
  name: "",
  themeType: "dark" as TThemeType,
  palette: {} as Record<string, string>,
  description: "",
  previewUrl: "",
  previewFile: null as File | null,
});

const { data: response } = await useFetch<ApiResponse<ThemeInterface>>(
  `/api/v1/themes/${themeId}`,
);

const syncFromResponse = (theme: ThemeInterface) => {
  themeState.name = theme.name;
  themeState.themeType = theme.type;
  themeState.palette = {
    ...theme.palette,
  };
  themeState.description = theme.description ?? "";
  themeState.previewUrl = theme.preview;

  serverBaseline.value = {
    name: theme.name.trim(),
    themeType: theme.type,
    palette: {
      ...theme.palette,
    },
    description: theme.description?.trim() ?? "",
    previewUrl: theme.preview,
  };
};

if (response.value?.data) syncFromResponse(response.value.data);

const handleReset = () => {
  if (!serverBaseline.value) return;

  const base = serverBaseline.value;
  themeState.name = base.name;
  themeState.themeType = base.themeType;
  themeState.palette = {
    ...base.palette,
  };
  themeState.description = base.description;
  themeState.previewUrl = base.previewUrl;

  themeState.previewFile = null;

  toast.info("Changes discarded");
};

const isPaletteDirty = computed(() => {
  if (!serverBaseline.value) return false;
  return Object.keys(themeState.palette).some(
    (key) => themeState.palette[key] !== serverBaseline.value?.palette[key],
  );
});

const hasUnsavedChanges = computed(() => {
  if (!serverBaseline.value) return false;
  const textChanged =
    themeState.name.trim() !== serverBaseline.value.name ||
    themeState.themeType !== serverBaseline.value.themeType ||
    themeState.description.trim() !== serverBaseline.value.description;

  return textChanged || isPaletteDirty.value || !!themeState.previewFile;
});

const handlePreviewChange = (file: File) => {
  themeState.previewFile = file;
  themeState.previewUrl = URL.createObjectURL(file);
};

const handleUpdate = async () => {
  if (!hasUnsavedChanges.value || isSubmitting.value) return;
  isSubmitting.value = true;

  try {
    const formData = new FormData();
    const base = serverBaseline.value!;

    if (themeState.name.trim() !== base.name)
      formData.append("name", themeState.name.trim());
    if (themeState.description.trim() !== base.description)
      formData.append("description", themeState.description.trim());
    if (themeState.themeType !== base.themeType)
      formData.append("type", themeState.themeType);
    if (isPaletteDirty.value)
      formData.append("palette", JSON.stringify(themeState.palette));

    if (themeState.previewFile) {
      const { preview, thumbnail } = await generateThemeAssets(
        themeState.previewFile,
      );
      formData.append("preview", preview);
      formData.append("thumbnail", thumbnail);
    }

    const res = await $fetch<ApiResponse<ThemeInterface>>(
      `/api/v1/themes/${themeId}`,
      {
        method: "PATCH",
        body: formData,
      },
    );

    if (res.success && res.data) {
      syncFromResponse(res.data);
      themeState.previewUrl += `?t=${Date.now()}`;
      themeState.previewFile = null;
      toast.success("Theme Updated");
    }
  } catch (err) {
    toast.error("Update Failed");
  } finally {
    isSubmitting.value = false;
  }
};
</script>
