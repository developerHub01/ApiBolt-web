<script setup lang="ts">
import { ref, computed } from "vue";
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
const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

/** File state */
const uploadedFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

/** Constants */
const REQUIRED_WIDTH = THEME_PREVIEW_SIZE.REQUIRED_WIDTH;
const REQUIRED_HEIGHT = THEME_PREVIEW_SIZE.REQUIRED_HEIGHT;
const MAX_SIZE_MB = THEME_PREVIEW_SIZE.MAX_SIZE_MB;

/** Computed preview URL */
const previewURL = computed(() =>
  uploadedFile.value
    ? URL.createObjectURL(uploadedFile.value)
    : props.modelValue || ""
);

/** Enable publish only if a valid preview exists */
const canPublish = computed(() => !!previewURL.value);

/** Trigger hidden input */
const triggerUpload = (): void => fileInput.value?.click();

/** Handle file selection with validations */
const handleFileChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  if (!target.files || !target.files[0]) return;

  const file = target.files[0];

  /** Check file size */
  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > MAX_SIZE_MB) {
    uploadedFile.value = null;
    emit("update:modelValue", "");
    toast.error(`File too large. Max size is ${MAX_SIZE_MB} MB.`);
    return;
  }

  /** Check image dimensions */
  const img = new Image();
  const reader = new FileReader();
  reader.onload = () => {
    img.src = reader.result as string;
  };
  img.onload = () => {
    if (img.width !== REQUIRED_WIDTH || img.height !== REQUIRED_HEIGHT) {
      uploadedFile.value = null;
      emit("update:modelValue", "");
      toast.error(
        `Invalid image size. Required ${REQUIRED_WIDTH}x${REQUIRED_HEIGHT}px. Actual: ${img.width}x${img.height}px.`
      );
      return;
    }

    /** Valid image */
    uploadedFile.value = file;
    emit("update:modelValue", reader.result as string);
    toast.success("Theme preview uploaded successfully!");
  };
  reader.readAsDataURL(file);
};

/** Reset preview */
const resetPreview = (): void => {
  uploadedFile.value = null;
  emit("update:modelValue", "");
  toast.info("Theme preview reset");
};
</script>

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
            :width="REQUIRED_WIDTH / 2"
            :height="REQUIRED_HEIGHT / 2"
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
            >Upload theme preview (1920x1080px, max 5MB).</EmptyDescription
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
