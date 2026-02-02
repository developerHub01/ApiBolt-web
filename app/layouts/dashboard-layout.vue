<template>
  <SidebarProvider
    :style="{
      '--sidebar-width': 'calc(var(--spacing) * 72)',
      '--header-height': 'calc(var(--spacing) * 12)',
    }"
    class="h-screen overflow-hidden"
  >
    <DashboardLayoutSidebar variant="inset" />
    <SidebarInset>
      <DashboardLayoutHeader />
      <ScrollArea
        ref="scrollArea"
        class="flex-1 min-h-0 [&>div>div]:container [&>div>div]:mx-auto [&>div>div]:min-h-0 [&>div>div]:flex [&>div>div]:flex-col"
      >
        <section class="flex-1 container p-5">
          <slot />
        </section>
      </ScrollArea>
    </SidebarInset>
  </SidebarProvider>
</template>

<script lang="ts">
export const iframeHeight = "800px";
export const description =
  "A dashboard with sidebar, data table, and analytics cards.";
</script>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ScrollArea from "~/components/ui/scroll-area/ScrollArea.vue";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const scrollArea = ref(null);
const dashboardLenis = ref<Lenis | null>(null);

onMounted(() => {
  // Use a small timeout to ensure DOM is fully rendered by the scroll area component
  setTimeout(() => {
    const el = (scrollArea.value as any)?.$el;
    const viewport = el?.querySelector('[data-slot="scroll-area-viewport"]');
    const content = viewport?.children[0];

    if (viewport && content) {
      dashboardLenis.value = new Lenis({
        wrapper: viewport as HTMLElement,
        content: content as HTMLElement,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      // Sync with GSAP ScrollTrigger
      dashboardLenis.value.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        dashboardLenis.value?.raf(time * 1000);
      };

      gsap.ticker.add(raf);

      onUnmounted(() => {
        gsap.ticker.remove(raf);
        dashboardLenis.value?.destroy();
      });
    }
  }, 0);
});
</script>
