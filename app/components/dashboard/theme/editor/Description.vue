<template>
  <FieldGroup>
    <FieldSet>
      <Field>
        <FieldLabel for="theme-description">
          Description
          <span v-if="props.maxLength" class="text-xs text-muted-foreground">
            ({{ props.modelValue.length }}/{{ props.maxLength }})
          </span>
        </FieldLabel>
        <Textarea
          id="theme-description"
          placeholder="Theme description"
          :value="props.modelValue"
          @update:modelValue="handleInput"
          :maxlength="props.maxLength"
          class="resize-none min-h-28 bg-background"
        />
      </Field>
    </FieldSet>
  </FieldGroup>
</template>

<script setup lang="ts">
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  modelValue: string;
  maxLength?: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const handleInput = (value: string | number): void => {
  emit("update:modelValue", String(value));
};
</script>
