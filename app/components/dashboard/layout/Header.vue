<template>
  <header
    class="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
  >
    <div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
      <SidebarTrigger class="-ml-1" />
      <Separator
        orientation="vertical"
        class="mx-2 data-[orientation=vertical]:h-4"
      />
      <div v-if="showLogo" class="flex items-center gap-2 select-none">
        <NuxtImg
          src="/logo.svg"
          :width="25"
          :height="25"
          class="object-contain"
        />
        <h1 class="text-base font-medium font-brand">APIBolt</h1>
      </div>
      <div class="ml-auto flex items-center gap-2">
        <DashboardLayoutHeaderAvatar />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

const { state, isMobile } = useSidebar();
const showLogo = computed(() => state.value === "collapsed" || isMobile.value);
</script>
