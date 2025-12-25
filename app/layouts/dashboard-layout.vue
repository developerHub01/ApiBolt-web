<script lang="ts">
export const iframeHeight = "800px";
export const description =
  "A dashboard with sidebar, data table, and analytics cards.";
</script>

<script setup lang="ts">
import AppSidebar from "@/components/dashboard/layout/AppSidebar.vue";
import DashboardHeader from "@/components/dashboard/layout/DashboardHeader.vue";
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
      <DashboardHeader />
      <ScrollArea
        class="flex-1 min-h-0 [&>div>div]:h-full [&>div>div]:container [&>div>div]:mx-auto [&>div>div]:min-h-0 [&>div>div]:flex [&>div>div]:flex-col"
      >
        <section class="flex-1 container p-5">
          <slot />
        </section>
      </ScrollArea>
    </SidebarInset>
  </SidebarProvider>
</template>
