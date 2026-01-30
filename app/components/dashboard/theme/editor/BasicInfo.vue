<template>
  <FieldGroup>
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel for="theme-name">
            Theme name
            <span v-if="props.maxLength" class="text-xs text-muted-foreground">
              ({{ props.name.length }}/{{ props.maxLength }})
            </span>
          </FieldLabel>
          <Input
            id="theme-name"
            placeholder="Theme name"
            :value="props.name"
            @update:modelValue="handleNameInput"
            :maxlength="props.maxLength"
          />
        </Field>

        <Field orientation="horizontal">
          <FieldLabel>Theme type:</FieldLabel>
          <Select
            :value="props.themeType"
            :default-value="THEME_TYPE_LIST[0].id"
            @value-change="handleThemeTypeChange"
          >
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

interface Props {
  name: string;
  themeType: ThemeType;
  maxLength?: number;
}

interface Emits {
  (e: "update:name", value: string): void;
  (e: "update:themeType", value: ThemeType): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleNameInput = (value: string | number) => {
  emit("update:name", String(value));
};

const handleThemeTypeChange = (value: ThemeType) => {
  emit("update:themeType", value);
};
</script>
