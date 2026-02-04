<template>
  <div class="min-h-[70vh] flex flex-col items-center justify-center">
    <NotFound
      :description="
        error.statusCode === 404
          ? 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
          : error.message || 'Something went wrong on our end.'
      "
    />
    <div
      v-if="error.statusCode !== 404"
      class="mt-8 flex flex-col items-center gap-4"
    >
      <p
        class="text-sm text-muted-foreground font-mono bg-muted/30 px-3 py-1 rounded-md"
      >
        Code: {{ error.statusCode }}
      </p>
      <Button variant="outline" @click="handleError" class="cursor-pointer">
        Try again
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

definePageMeta({
  layout: "default",
});

const props = defineProps<{
  error: NuxtError;
}>();

const handleError = () =>
  clearError({
    redirect: "/",
  });

useSeoMeta({
  title:
    props.error.statusCode === 404
      ? "Page Not Found | ApiBolt"
      : "Error Occurred | ApiBolt",
  description:
    props.error.message || "An error occurred while processing your request.",
});
</script>
