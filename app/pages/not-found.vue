<template>
  <div class="container mx-auto px-4">
    <NotFound
      description="The page you're looking for doesn't exist. It might have been moved or deleted."
      class="min-h-[70vh]"
    />
  </div>
</template>

<script setup lang="ts">
import { NotFound } from "~/components/ui/not-found";

useSeoMeta({
  title: "Page Not Found | APIBolt",
  description: "The requested page could not be found on APIBolt.",
});
</script>
