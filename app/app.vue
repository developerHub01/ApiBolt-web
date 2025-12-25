<script setup lang="ts">
import "vue-sonner/style.css";
import { Toaster } from "@/components/ui/sonner";
</script>

<template>
  <NuxtRouteAnnouncer />
  <section class="w-full h-full min-h-screen flex flex-col">
    <NuxtLayout>
      <TooltipProvider>
        <NuxtPage />
      </TooltipProvider>
    </NuxtLayout>
    <Toaster />
  </section>
</template>
