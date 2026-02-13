<template>
  <div class="border border-border/60 bg-card rounded-lg overflow-hidden group">
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-muted/20 border-b border-border/40"
    >
      <div class="flex items-center gap-3 overflow-hidden">
        <span
          class="shrink-0 px-2.5 py-1 rounded text-[10px] font-bold font-mono uppercase tracking-wider border select-none"
          :class="methodClasses"
        >
          {{ method }}
        </span>
        <code
          class="font-mono text-sm text-foreground/90 truncate"
          :title="path"
        >
          {{ path }}
        </code>
      </div>
      <div
        v-if="description"
        class="text-xs text-muted-foreground font-medium md:text-right"
      >
        {{ description }}
      </div>
    </div>

    <!-- Body -->
    <div v-if="(params && params.length) || example" class="p-4 space-y-4">
      <!-- Params -->
      <div v-if="params && params.length">
        <div
          class="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-2"
        >
          Parameters
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="param in params"
            :key="param"
            class="px-2 py-1 rounded border border-border bg-background text-xs font-mono text-muted-foreground"
          >
            {{ param }}
          </span>
        </div>
      </div>

      <!-- Example Toggle -->
      <div v-if="example">
        <button
          @click="isOpen = !isOpen"
          class="flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider"
        >
          <span>{{ isOpen ? "Hide" : "Show" }} Response</span>
          <ChevronDown
            class="w-3 h-3 transition-transform duration-200"
            :class="{ 'rotate-180': isOpen }"
          />
        </button>

        <div v-show="isOpen" class="mt-3">
          <div
            class="relative rounded-md border border-border bg-[#0B0F19] overflow-hidden"
          >
            <div class="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
            <pre
              class="p-3 text-xs font-mono text-blue-100 overflow-x-auto custom-scrollbar"
            ><code>{{ example }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";

const props = defineProps<{
  method: string;
  path: string;
  description?: string;
  params?: string[];
  example?: string;
}>();

const isOpen = ref(false);

const methodClasses = computed(() => {
  const map: Record<string, string> = {
    GET: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    POST: "bg-green-500/10 text-green-500 border-green-500/20",
    PUT: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    PATCH: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    DELETE: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  return (
    map[props.method] || "bg-secondary text-muted-foreground border-border"
  );
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
  background-color: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
</style>
