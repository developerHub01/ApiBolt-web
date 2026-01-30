<template>
  <div class="w-full flex flex-col items-center gap-2 select-none">
    <input
      type="file"
      ref="fileInput"
      class="hidden"
      accept="image/*"
      @change="handleFileChange"
    />

    <template v-if="previewURL">
      <section
        class="w-full border border-dashed bg-background rounded-md p-4 flex flex-col gap-4"
      >
        <AspectRatio
          :ratio="16 / 9"
          class="w-full bg-muted rounded-lg overflow-hidden ring-2 ring-border"
        >
          <NuxtImg
            :src="previewURL"
            alt="Theme Preview"
            class="h-full w-full object-cover"
          />
        </AspectRatio>
        <div class="flex gap-2 justify-end">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            @click="triggerUpload"
          >
            Reupload theme preview
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            :disabled="!canPublish"
            @click="resetPreview"
          >
            Reset Preview
          </Button>
        </div>
      </section>
    </template>

    <template v-else>
      <Empty
        class="w-full border border-dashed h-64 flex flex-col justify-center items-center"
      >
        <EmptyHeader>
          <EmptyMedia variant="icon"><Cloud /></EmptyMedia>
          <EmptyTitle>Theme Preview Empty</EmptyTitle>
          <EmptyDescription
            >Upload theme preview ({{ REQUIRED_WIDTH }}x{{ REQUIRED_HEIGHT }}px,
            max {{ MAX_SIZE_MB }}MB).</EmptyDescription
          >
        </EmptyHeader>
        <EmptyContent>
          <Button
            variant="outline"
            size="sm"
            type="button"
            @click="triggerUpload"
          >
            Upload Preview
          </Button>
        </EmptyContent>
      </Empty>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from "vue";
import { Cloud } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { toast } from "vue-sonner";
import AspectRatio from "~/components/ui/aspect-ratio/AspectRatio.vue";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { THEME_PREVIEW_SIZE } from "~/constant/default-theme.constant";

/** Props */
const props = defineProps<{
  modelValue: File | null;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: File | null): void;
}>();

const REQUIRED_WIDTH = THEME_PREVIEW_SIZE.REQUIRED_WIDTH;
const REQUIRED_HEIGHT = THEME_PREVIEW_SIZE.REQUIRED_HEIGHT;
const MAX_SIZE_MB = THEME_PREVIEW_SIZE.MAX_SIZE_MB;

const previewURL = ref<string>("");
const fileInput = ref<HTMLInputElement | null>(null);

watch(
  () => props.modelValue,
  (newFile) => {
    if (previewURL.value) URL.revokeObjectURL(previewURL.value);
    previewURL.value = newFile ? URL.createObjectURL(newFile) : "";
    if (fileInput.value) fileInput.value.value = "";
  },
  { immediate: true },
);

const canPublish = computed(() => !!previewURL.value);
const triggerUpload = (): void => fileInput.value?.click();

const handleFileChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  if (file.size / (1024 * 1024) > MAX_SIZE_MB) {
    toast.error(`File too large. Max size is ${MAX_SIZE_MB} MB.`);
    target.value = "";
    return;
  }

  const img = new Image();
  const validationUrl = URL.createObjectURL(file);

  img.onload = () => {
    URL.revokeObjectURL(validationUrl);

    if (img.width !== REQUIRED_WIDTH || img.height !== REQUIRED_HEIGHT) {
      toast.error(
        `Invalid image size. Required ${REQUIRED_WIDTH}x${REQUIRED_HEIGHT}px.`,
      );
      return;
    }

    emit("update:modelValue", file);
    toast.success("Theme preview uploaded successfully!");
  };

  img.onerror = () => {
    URL.revokeObjectURL(validationUrl);
    toast.error("Failed to load image.");
  };

  img.src = validationUrl;
};

const resetPreview = (): void => {
  emit("update:modelValue", null);
  toast.info("Theme preview reset");
};

onUnmounted(() => {
  if (previewURL.value) URL.revokeObjectURL(previewURL.value);
});
</script>
