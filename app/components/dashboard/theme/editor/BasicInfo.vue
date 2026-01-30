<template>
  <FieldGroup>
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel for="theme-name">
            Theme name
            <span v-if="maxLength" class="text-xs text-muted-foreground">
              ({{ name.length }}/{{ maxLength }})
            </span>
          </FieldLabel>
          <Input
            id="theme-name"
            placeholder="Theme name"
            v-model="name"
            :maxlength="maxLength"
          />
        </Field>
        <Field orientation="horizontal">
          <FieldLabel>Theme type:</FieldLabel>
          <Select v-model="themeType">
            <SelectTrigger class="w-45">
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
        </Field>
      </FieldGroup>
    </FieldSet>
  </FieldGroup>
</template>

<script setup lang="ts">
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
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
