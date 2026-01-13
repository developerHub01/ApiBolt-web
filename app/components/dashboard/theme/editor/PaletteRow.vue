<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { cn } from "~/lib/utils";
import { isValidColor } from "~/utils/color.utils";

interface Props {
  name: string;
  color: string;
  modelValue: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const localColor = ref<string>(props.modelValue);

const isError = computed<boolean>(() => !isValidColor(localColor.value));

watch(localColor, (newColor: string): void => {
  if (isValidColor(newColor)) emit("update:modelValue", newColor.toLowerCase());
});

watch(
  () => props.modelValue,
  (newVal: string): void => {
    localColor.value = newVal;
  }
);
</script>

<template>
  <div class="w-full flex items-center justify-between gap-2 p-3">
    <p class="line-clamp-1 flex-1 capitalize text-sm">
      {{ props.name.replaceAll("-", " ") }}
    </p>

    <div
      :class="
        cn(
          'flex gap-2 p-1 rounded-sm bg-background w-33 pr-2.5 border shadow shrink-0',
          { 'border-destructive ring-1 ring-destructive': isError }
        )
      "
    >
      <div
        class="size-7 rounded-xs border border-white/50 border-dashed shadow shrink-0"
        :style="{ background: localColor }"
      />
      <div class="flex-1 border-b">
        <input
          :id="props.name"
          v-model="localColor"
          :placeholder="props.color"
          class="w-full px-0 py-0 border-0 bg-transparent focus-visible:ring-0 focus-visible:outline-0 rounded-none h-full text-center uppercase tracking-wide text-sm"
        />
      </div>
    </div>
  </div>
</template>
