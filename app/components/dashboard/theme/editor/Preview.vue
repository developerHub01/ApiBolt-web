<template>
  <div class="flex flex-col w-full gap-4">
    <div class="space-y-1">
      <FieldLabel class="text-base font-semibold">Discovery Asset</FieldLabel>
      <p class="text-xs text-muted-foreground">
        Recommend: 1920x1080 (16:9) | Max 2MB
      </p>
    </div>

    <FieldGroup>
      <Field>
        <div
          class="relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-white/5 bg-muted/20 shadow-xl transition-all hover:border-primary/50"
          @click="fileInput?.click()"
        >
          <AspectRatio :ratio="16 / 9">
            <template v-if="previewUrl">
              <NuxtImg
                :src="previewUrl"
                alt="theme preview"
                class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
            </template>
            <div
              v-else
              class="flex flex-col items-center justify-center h-full gap-4 bg-muted/10"
            >
              <div
                class="size-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
              >
                <ImageIcon class="size-8 text-primary/60" />
              </div>
              <div class="text-center">
                <p class="text-sm font-medium">Click to upload theme preview</p>
                <p class="text-xs text-muted-foreground mt-1">
                  PNG, JPG or WEBP only
                </p>
              </div>
            </div>
          </AspectRatio>

          <div
            class="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <div
              class="p-3 rounded-full bg-white/20 border border-white/20 mb-2"
            >
              <CameraIcon class="size-6 text-white" />
            </div>
            <span
              class="text-white text-sm font-semibold tracking-wide uppercase"
            >
              {{ previewUrl ? "Replace Artwork" : "Choose Artwork" }}
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
import { ImageIcon, CameraIcon } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { THEME_PREVIEW_SIZE } from "~/constant/default-theme.constant";

const REQUIRED_RATIO = (
  THEME_PREVIEW_SIZE.REQUIRED_WIDTH / THEME_PREVIEW_SIZE.REQUIRED_HEIGHT
).toFixed(2);

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
    if ((img.width / img.height).toFixed(2) !== REQUIRED_RATIO) {
      toast.error(`Required size: ${REQUIRED_WIDTH}x${REQUIRED_HEIGHT}px`);
      return;
    }
    emit("update:previewFile", file);
  };
  img.src = objectUrl;
};
</script>
