<template>
  <div class="flex flex-col w-full">
    <FieldGroup>
      <Field>
        <FieldLabel>Theme Preview</FieldLabel>
        <div
          class="relative group cursor-pointer overflow-hidden rounded-lg border-4 bg-muted"
          @click="fileInput?.click()"
        >
          <AspectRatio :ratio="16 / 9">
            <NuxtImg
              v-if="previewUrl"
              :src="previewUrl"
              alt="theme preview"
              class="object-cover w-full h-full"
            />
            <div v-else class="flex items-center justify-center h-full">
              <ImageIcon class="size-40 text-muted-foreground/80" />
            </div>
          </AspectRatio>

          <div
            class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <span class="text-white text-sm font-medium">
              {{ previewUrl ? "Change Preview" : "Upload Preview" }}
            </span>
          </div>
        </div>

        <input
          type="file"
          ref="fileInput"
          class="hidden"
          accept="image/*"
          @change="onFileSelect"
        />
      </Field>
    </FieldGroup>
  </div>
</template>

<script setup lang="ts">
import { ImageIcon } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { THEME_PREVIEW_SIZE } from "~/constant/default-theme.constant";

const props = defineProps<{
  previewUrl: string;
}>();

const emit = defineEmits<{
  "update:previewFile": [file: File];
}>();

const fileInput = ref<HTMLInputElement | null>(null);

const onFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const { REQUIRED_WIDTH, REQUIRED_HEIGHT, MAX_SIZE_MB } = THEME_PREVIEW_SIZE;

  if (file.size / (1024 * 1024) > MAX_SIZE_MB) {
    toast.error(`Max size is ${MAX_SIZE_MB}MB`);
    return;
  }

  const img = new Image();
  const objectUrl = URL.createObjectURL(file);
  img.onload = () => {
    URL.revokeObjectURL(objectUrl);
    if (img.width !== REQUIRED_WIDTH || img.height !== REQUIRED_HEIGHT) {
      toast.error(`Required size: ${REQUIRED_WIDTH}x${REQUIRED_HEIGHT}px`);
      return;
    }
    emit("update:previewFile", file);
  };
  img.src = objectUrl;
};
</script>
