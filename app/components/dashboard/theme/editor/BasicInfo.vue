<template>
  <div class="grid gap-6">
    <Field>
      <FieldLabel for="theme-name" class="text-base font-medium">
        Theme Name
        <span
          v-if="maxLength"
          class="text-xs text-muted-foreground ml-2 font-normal"
        >
          ({{ name.length }}/{{ maxLength }} characters)
        </span>
      </FieldLabel>
      <Input
        id="theme-name"
        placeholder="e.g. Neon Horizon"
        v-model="name"
        :maxlength="maxLength"
        class="bg-muted/20 border-white/5 focus-visible:ring-primary/50 transition-all"
      />
    </Field>

    <Field>
      <FieldLabel class="text-base font-medium">Category</FieldLabel>
      <Select v-model="themeType">
        <SelectTrigger
          class="h-12 bg-muted/20 border-white/5 focus-visible:ring-primary/50 transition-all"
        >
          <SelectValue placeholder="Select theme type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="{ id, label } in THEME_TYPE_LIST"
            :key="id"
            :value="id"
          >
            {{ label }}
          </SelectItem>
        </SelectContent>
      </Select>
      <p
        class="text-[10px] text-muted-foreground mt-1.5 uppercase tracking-wider"
      >
        Helps users find your theme in the marketplace
      </p>
    </Field>
  </div>
</template>

<script setup lang="ts">
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const THEME_TYPE_LIST = [
  {
    id: "dark",
    label: "Dark",
  },
  {
    id: "light",
    label: "Light",
  },
  {
    id: "custom",
    label: "Custom",
  },
] as const;

type ThemeType = (typeof THEME_TYPE_LIST)[number]["id"];

const name = defineModel<string>("name", {
  default: "",
});
const themeType = defineModel<ThemeType>("themeType", {
  default: "dark",
});

defineProps<{
  maxLength?: number;
}>();
</script>
