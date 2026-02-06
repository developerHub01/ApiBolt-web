<template>
  <div class="grid gap-6">
    <Field>
      <FieldLabel for="theme-description" class="text-base font-medium">
        Theme Description
        <span
          v-if="maxLength"
          class="text-xs text-muted-foreground ml-2 font-normal"
        >
          ({{ modelValue.length }}/{{ maxLength }} characters)
        </span>
      </FieldLabel>
      <Textarea
        id="theme-description"
        placeholder="Describe your theme's style, inspiration, and key features..."
        v-model="modelValue"
        :maxlength="maxLength"
        class="resize-none min-h-40 bg-muted/20 border-white/5 focus-visible:ring-primary/50 transition-all p-4 leading-relaxed"
      />
    </Field>
  </div>
</template>

<script setup lang="ts">
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

const modelValue = defineModel<string>({ default: "" });

defineProps<{
  maxLength?: number;
}>();
</script>
