<template>
  <div class="h-screen w-full flex flex-col bg-background text-foreground overflow-hidden">
    <Header class="shrink-0 border-b border-border/40 z-20 bg-background/80 backdrop-blur-xl" />
    
    <div class="flex-1 flex overflow-hidden w-full">
      <!-- Sidebar Drawer -->
      <PublicDocsSidebar />
       
      <!-- Main Content Area -->
      <main class="flex-1 min-w-0 flex flex-col bg-background relative z-0 overflow-hidden">
        <ScrollArea class="h-full w-full relative" data-lenis-prevent="true">
          <div class="max-w-4xl mx-auto py-8 sm:py-10 px-6 sm:px-8 md:px-12 w-full">
            <NuxtPage />
          </div>
        </ScrollArea>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "~/components/public/common/Header.vue";
import { ScrollArea } from "@/components/ui/scroll-area";

definePageMeta({ layout: false });

useSeoMeta({
  title: "Documentation | APIBolt",
  ogTitle: "Documentation | APIBolt",
  description: "Developer-friendly documentation for APIBolt API Client.",
  ogDescription: "Developer-friendly documentation for APIBolt API Client.",
});
</script>
