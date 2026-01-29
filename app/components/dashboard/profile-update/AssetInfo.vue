<template>
  <div class="flex flex-col">
    <FieldGroup>
      <Field>
        <FieldLabel>Profile Cover</FieldLabel>
        <div
          class="relative group cursor-pointer overflow-hidden rounded-lg border-4"
          @click="coverInput?.click()"
        >
          <AspectRatio :ratio="16 / 5">
            <NuxtImg
              :src="coverUrl"
              alt="profile cover"
              class="object-cover w-full h-full"
            />
          </AspectRatio>
          <div
            class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <span class="text-white text-sm font-medium">Change Cover</span>
          </div>
        </div>
        <input
          type="file"
          ref="coverInput"
          class="hidden"
          accept="image/*"
          @change="(e) => onFileSelect(e, 'cover')"
        />
      </Field>
    </FieldGroup>

    <div class="flex items-center gap-4 -translate-y-1/2 px-6 mx-auto">
      <div
        class="relative size-30 md:size-40 lg:size-45 rounded-full border-4 bg-muted overflow-hidden group cursor-pointer"
        @click="avatarInput?.click()"
      >
        <NuxtImg :src="avatarUrl" class="size-full object-cover" />
        <div
          class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <CameraIcon class="size-5 text-white" />
        </div>
      </div>
      <input
        type="file"
        ref="avatarInput"
        class="hidden"
        accept="image/*"
        @change="(e) => onFileSelect(e, 'avatar')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { CameraIcon } from "lucide-vue-next";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

const props = defineProps<{
  avatarUrl: string;
  coverUrl: string;
}>();

const emit = defineEmits<{
  "update:avatarFile": [file: File];
  "update:coverFile": [file: File];
}>();

const avatarInput = ref<HTMLInputElement | null>(null);
const coverInput = ref<HTMLInputElement | null>(null);

const onFileSelect = (event: Event, type: "avatar" | "cover") => {
  const target = event.target as HTMLInputElement;
  if (!target.files?.[0]) return;

  const file = target.files[0];
  if (type === "avatar") emit("update:avatarFile", file);
  else emit("update:coverFile", file);
};
</script>
