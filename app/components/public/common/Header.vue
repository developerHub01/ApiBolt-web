<template>
  <section
    ref="headerRef"
    class="sticky top-0 w-full flex items-center justify-center py-4 z-50 transition-all duration-300 pointer-events-none"
  >
    <header class="container flex items-center justify-between gap-6 px-4">
      <NuxtLink
        to="/"
        class="text-xl font-black select-none flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 pointer-events-auto"
      >
        <NuxtImg src="/logo.svg" class="size-8" alt="api-bolt" />
        <span class="tracking-tighter">APIBolt</span>
      </NuxtLink>

      <div class="flex items-center gap-2">
        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-1 mr-4">
          <template v-for="{ to, label, active } in items">
            <NuxtLink :to="to" class="pointer-events-auto">
              <Button
                variant="ghost"
                class="px-4 rounded-full font-medium transition-all"
                :class="
                  active
                    ? 'bg-primary/10 text-primary hover:bg-primary/20'
                    : 'text-muted-foreground hover:text-foreground'
                "
              >
                {{ label }}
              </Button>
            </NuxtLink>
          </template>
        </nav>

        <!-- Profile Menu -->
        <PublicCommonProfileMenu />

        <!-- Mobile Nav Menu -->
        <Sheet>
          <SheetTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="md:hidden rounded-full hover:bg-primary/10 hover:text-primary pointer-events-auto"
            >
              <Menu class="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            class="w-[300px] bg-card/80 backdrop-blur-xl border-white/5 p-8 flex flex-col gap-8"
          >
            <SheetHeader class="text-left">
              <SheetTitle class="flex items-center gap-2">
                <NuxtImg src="/logo.svg" class="size-6" alt="api-bolt" />
                <span class="font-black tracking-tighter">APIBolt</span>
              </SheetTitle>
              <SheetDescription class="text-xs">
                Accelerate your workflow with premium API themes.
              </SheetDescription>
            </SheetHeader>

            <nav class="flex flex-col gap-2 mt-4">
              <template v-for="{ to, label, active } in items">
                <NuxtLink :to="to">
                  <SheetClose as-child>
                    <Button
                      variant="ghost"
                      class="w-full justify-start h-12 rounded-xl text-base font-medium transition-all"
                      :class="
                        active
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-white/5'
                      "
                    >
                      {{ label }}
                    </Button>
                  </SheetClose>
                </NuxtLink>
              </template>
            </nav>

            <div class="mt-auto pt-8 border-t border-white/5">
              <p class="text-xs text-muted-foreground">
                © {{ new Date().getFullYear() }} APIBolt
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  </section>
</template>

<script setup lang="ts">
import { Menu } from "lucide-vue-next";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const route = useRoute();
const headerRef = ref<HTMLElement | null>(null);

const items = computed(() => [
  {
    label: "Home",
    to: "/",
    active: route.path === "/",
  },
  {
    label: "Marketplace",
    to: "/marketplace",
    active: route.path.startsWith("/marketplace"),
  },
]);

onMounted(() => {
  const { $gsap, $ScrollTrigger } = useNuxtApp();
  if ($gsap && $ScrollTrigger && headerRef.value) {
    $gsap.to(headerRef.value, {
      background:
        "linear-gradient(to bottom, rgba(21, 27, 37, 0.9) 0%, rgba(21, 27, 37, 0.5) 50%, rgba(21, 27, 37, 0) 100%)",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "+=100",
        scrub: true,
      },
    });
  }
});
</script>
