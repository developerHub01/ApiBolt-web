<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-10 opacity-0 scale-95"
    enter-to-class="translate-y-0 opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100 scale-100"
    leave-to-class="translate-y-10 opacity-0 scale-95"
  >
    <Button
      v-if="isVisible"
      @click="scrollToTop"
      variant="secondary"
      size="icon"
      class="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 size-10 md:size-12 rounded-full bg-card/40 backdrop-blur-xl border-white/10 shadow-2xl hover:bg-primary! hover:text-primary-foreground hover:scale-110 active:scale-95 transition-all group"
      aria-label="Scroll to top"
    >
      <ChevronUp
        class="size-6 transition-transform group-hover:-translate-y-1"
      />
    </Button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { ChevronUp } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

const isVisible = ref(false);

const checkScroll = () =>
  (isVisible.value = window.scrollY > window.innerHeight);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>
