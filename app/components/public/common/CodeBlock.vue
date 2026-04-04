<template>
  <div
    class="doc-code-block group relative rounded-lg border border-border/60 bg-[#0B0F19] overflow-hidden my-4"
  >
    <!-- Header bar -->
    <div
      v-if="title || lang"
      class="flex items-center justify-between px-4 py-2.5 bg-card/60 border-b border-border/40"
    >
      <div class="flex items-center gap-2">
        <span
          v-if="lang"
          class="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 select-none"
        >
          {{ lang }}
        </span>
        <span v-if="title" class="text-xs text-muted-foreground font-medium">
          {{ title }}
        </span>
      </div>
      <button
        @click="copyCode"
        class="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
        :class="{
          'text-emerald-400 hover:text-emerald-400': copied,
        }"
      >
        <Check v-if="copied" class="w-3.5 h-3.5" />
        <Copy v-else class="w-3.5 h-3.5" />
        <span>{{ copied ? "Copied" : "Copy" }}</span>
      </button>
    </div>

    <!-- Code content -->
    <div class="relative">
      <div class="absolute top-0 left-0 w-1 h-full bg-primary/20" />
      <pre
        class="p-4 pl-5 text-sm font-mono overflow-x-auto doc-scrollbar leading-relaxed"
        v-html="highlightedCode"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Copy, Check } from "lucide-vue-next";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

const props = defineProps<{
  code: string;
  lang?: string;
  title?: string;
}>();

const copied = ref<boolean>(false);

const highlightedCode = computed(() => {
  if (!props.code) return "";

  const language = props.lang || "typescript";
  try {
    return hljs.highlight(props.code, { language }).value;
  } catch (error) {
    console.error("Highlighting failed", error);
    return props.code;
  }
});

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (e) {
    console.error(e);
  }
};
</script>

<style scoped>
.doc-scrollbar::-webkit-scrollbar {
  height: 6px;
  background-color: transparent;
}
.doc-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
</style>
