<template>
  <!-- Desktop Sidebar -->
  <aside
    class="hidden lg:block w-[280px] shrink-0 border-r border-border/40 relative z-10 bg-background"
  >
    <ScrollArea class="h-full w-full" data-lenis-prevent="true">
      <div class="pt-5 pb-10 pr-6 pl-2 w-full h-full">
        <div class="mb-4 pl-3">
          <span
            class="text-[10px] uppercase font-bold text-muted-foreground tracking-widest"
          >
            Documentation
          </span>
        </div>

        <nav class="flex flex-col relative z-10 w-full overflow-visible">
          <PublicDocsSidebarNode :items="config" :parent-path="[]" :depth="0" />
        </nav>
      </div>
    </ScrollArea>
  </aside>

  <!-- Mobile Sidebar  -->
  <div class="lg:hidden">
    <button
      @click="isMobileOpen = true"
      class="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all md:bottom-8 md:right-8 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      aria-label="Open documentation menu"
    >
      <Menu
        class="w-5 h-5 absolute"
        :class="
          isMobileOpen
            ? 'scale-0 opacity-0'
            : 'scale-100 opacity-100 transition-all duration-200'
        "
      />
      <X
        class="w-5 h-5 absolute"
        :class="
          isMobileOpen
            ? 'scale-100 opacity-100 transition-all duration-200'
            : 'scale-0 opacity-0'
        "
      />
    </button>

    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        leave-active-class="transition-opacity duration-200 ease-in"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isMobileOpen"
          @click="isMobileOpen = false"
          class="fixed inset-0 z-100 bg-background/80 backdrop-blur-sm lg:hidden"
        />
      </Transition>

      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        leave-active-class="transition-transform duration-200 ease-in"
        enter-from-class="-translate-x-full"
        leave-to-class="-translate-x-full"
      >
        <div
          v-show="isMobileOpen"
          class="fixed inset-y-0 left-0 z-110 w-[280px] bg-background border-r border-border shadow-2xl lg:hidden flex flex-col"
        >
          <div
            class="flex items-center justify-between p-4 border-b border-border bg-muted/10 shrink-0"
          >
            <span class="font-semibold tracking-tight text-foreground"
              >Documentation</span
            >
            <button
              @click="isMobileOpen = false"
              class="p-1.5 -mr-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="flex-1 overflow-hidden min-h-0 relative w-full">
            <ScrollArea class="h-full w-full" data-lenis-prevent="true">
              <div class="p-4 w-full h-full">
                <nav class="flex flex-col w-full pb-8">
                  <PublicDocsSidebarNode
                    :items="config"
                    :parent-path="[]"
                    :depth="0"
                  />
                </nav>
              </div>
            </ScrollArea>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { Menu, X } from "lucide-vue-next";
import { docsConfig } from "~/config/docs";
import { ScrollArea } from "@/components/ui/scroll-area";

const config = docsConfig;
const route = useRoute();
const isMobileOpen = ref<boolean>(false);

// Automatically close the sidebar when navigation happens
watch(
  () => route.path,
  () => {
    isMobileOpen.value = false;
  },
);
</script>
