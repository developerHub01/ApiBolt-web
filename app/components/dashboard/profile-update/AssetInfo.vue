<template>
  <div class="flex flex-col gap-6">
    <FieldGroup>
      <Field>
        <FieldLabel class="text-lg font-semibold mb-3"
          >Profile Identity Assets</FieldLabel
        >

        <!-- Cover Upload -->
        <div
          class="relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-white/5 shadow-xl bg-muted/30"
          @click="coverInput?.click()"
        >
          <AspectRatio :ratio="16 / 4">
            <NuxtImg
              :src="coverUrl"
              alt="profile cover"
              class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </AspectRatio>
          <div
            class="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <CameraIcon class="size-8 text-white mb-2" />
            <span class="text-white text-sm font-medium">Change Cover Art</span>
          </div>
        </div>
        <input
          type="file"
          ref="coverInput"
          class="hidden"
          accept="image/*"
          @change="(e) => onFileSelect(e, 'cover')"
        />

        <!-- Avatar Upload Overflow -->
        <div
          class="relative flex justify-center -mt-16 md:-mt-20 lg:-mt-24 z-20"
        >
          <div
            class="relative size-32 md:size-40 lg:size-48 rounded-full border-4 border-background bg-muted overflow-hidden group cursor-pointer shadow-2xl transition-transform hover:scale-105"
            @click="avatarInput?.click()"
          >
            <NuxtImg :src="avatarUrl" class="size-full object-cover" />
            <div
              class="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <CameraIcon class="size-8 text-white" />
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
      </Field>
    </FieldGroup>
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
