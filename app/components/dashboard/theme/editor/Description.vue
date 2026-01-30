<template>
  <FieldGroup>
    <FieldSet>
      <Field>
        <FieldLabel for="theme-description">
          Description
          <span v-if="maxLength" class="text-xs text-muted-foreground">
            ({{ modelValue.length }}/{{ maxLength }})
          </span>
        </FieldLabel>
        <Textarea
          id="theme-description"
          placeholder="Theme description"
          v-model="modelValue"
          :maxlength="maxLength"
          class="resize-none min-h-28 bg-background"
        />
      </Field>
    </FieldSet>
  </FieldGroup>
</template>

<script setup lang="ts">
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

const modelValue = defineModel<string>({ default: "" });

defineProps<{
  maxLength?: number;
}>();
</script>