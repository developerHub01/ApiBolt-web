<script lang="ts">
export const iframeHeight = "800px";
export const description =
  "A dashboard with sidebar, data table, and analytics cards.";
</script>

<script setup lang="ts">
import AppSidebar from "@/components/dashboard/AppSidebar.vue";
import SiteHeader from "@/components/dashboard/SiteHeader.vue";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ScrollArea from "~/components/ui/scroll-area/ScrollArea.vue";
</script>

<template>
  <SidebarProvider
    :style="{
      '--sidebar-width': 'calc(var(--spacing) * 72)',
      '--header-height': 'calc(var(--spacing) * 12)',
    }"
    class="h-screen overflow-hidden"
  >
    <AppSidebar variant="inset" />
    <SidebarInset>
      <SiteHeader />
      <ScrollArea class="flex-1 min-h-0">
        <section class="container mx-auto p-5">
          <slot />
        </section>
      </ScrollArea>
    </SidebarInset>
  </SidebarProvider>
</template>
