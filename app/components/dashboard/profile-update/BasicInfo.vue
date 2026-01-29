<template>
  <FieldGroup>
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel
            for="full_name"
            :class="{
              'text-destructive': isNameInvalid,
            }"
          >
            Full name
            <span class="text-xs text-muted-foreground">
              ({{ fullName?.length || 0 }}/50)
            </span>
          </FieldLabel>
          <Input
            id="full_name"
            placeholder="Enter your full name"
            v-model="fullName"
            :maxlength="50"
            :class="{ 'border-destructive': isNameInvalid }"
          />
        </Field>

        <Field>
          <FieldLabel for="bio">
            Bio
            <span class="text-xs text-muted-foreground">
              ({{ bio?.length || 0 }}/200)
            </span>
          </FieldLabel>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself"
            v-model="bio"
            :maxlength="200"
            class="resize-none min-h-28 bg-background"
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  </FieldGroup>
</template>

<script setup lang="ts">
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const fullName = defineModel<string>("fullName", {
  required: true,
  default: "",
});
const bio = defineModel<string>("bio", { required: true, default: "" });

const isNameInvalid = computed(() => !fullName.value.trim());
</script>
