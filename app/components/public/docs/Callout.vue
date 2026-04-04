<template>
  <div class="my-5 flex gap-3 rounded-lg border p-4" :class="variantClasses">
    <component :is="iconComponent" class="w-5 h-5 shrink-0 mt-0.5" />
    <div class="text-sm leading-relaxed">
      <span v-if="label" class="font-bold mr-1.5">{{ label }}</span>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Lightbulb,
  Info,
  AlertTriangle,
  Zap,
  type LucideIcon,
} from "lucide-vue-next";

const props = withDefaults(
  defineProps<{
    variant?: "tip" | "note" | "warning" | "info";
    label?: string;
  }>(),
  {
    variant: "tip",
  },
);

const variantMap: Record<
  string,
  {
    icon: LucideIcon;
    classes: string;
  }
> = {
  tip: {
    icon: Lightbulb,
    classes: "bg-emerald-500/5 border-emerald-500/20 text-emerald-200",
  },
  note: {
    icon: Info,
    classes: "bg-blue-500/5 border-blue-500/20 text-blue-200",
  },
  warning: {
    icon: AlertTriangle,
    classes: "bg-amber-500/5 border-amber-500/20 text-amber-200",
  },
  info: {
    icon: Zap,
    classes: "bg-primary/5 border-primary/20 text-primary",
  },
};

const entry = computed(() => variantMap[props.variant] || variantMap.tip);
const iconComponent = computed(() => entry.value?.icon);
const variantClasses = computed(() => entry.value?.classes);
</script>
