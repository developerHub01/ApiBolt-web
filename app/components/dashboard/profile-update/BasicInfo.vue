<template>
  <div class="space-y-6 pt-4">
    <div class="grid gap-6">
      <Field>
        <FieldLabel
          for="full_name"
          class="text-base font-medium"
          :class="{
            'text-destructive': isNameInvalid,
          }"
        >
          Full Name
          <span class="text-xs text-muted-foreground ml-2 font-normal">
            ({{ fullName?.length || 0 }}/50 characters)
          </span>
        </FieldLabel>
        <Input
          id="full_name"
          placeholder="e.g. John Doe"
          v-model="fullName"
          :maxlength="50"
          class="bg-muted/20 border-white/5 focus-visible:ring-primary/50 transition-all"
          :class="{ 'border-destructive': isNameInvalid }"
        />
      </Field>

      <Field>
        <FieldLabel for="bio" class="text-base font-medium">
          Short Bio
          <span class="text-xs text-muted-foreground ml-2 font-normal">
            ({{ bio?.length || 0 }}/200 characters)
          </span>
        </FieldLabel>
        <Textarea
          id="bio"
          placeholder="Write a short introduction about yourself..."
          v-model="bio"
          :maxlength="200"
          class="resize-none min-h-32 bg-muted/20 border-white/5 focus-visible:ring-primary/50 transition-all p-4 leading-relaxed"
        />
      </Field>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const fullName = defineModel<string>("fullName", {
  required: true,
  default: "",
});
const bio = defineModel<string>("bio", { required: true, default: "" });

const isNameInvalid = computed(() => !fullName.value.trim());
</script>
