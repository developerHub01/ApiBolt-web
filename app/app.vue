<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <TooltipProvider>
      <NuxtPage />
    </TooltipProvider>
  </NuxtLayout>
  <Toaster />
</template>

<script setup lang="ts">
import "vue-sonner/style.css";
import { Toaster } from "@/components/ui/sonner";
</script>
