<template>
  <div
    class="flex flex-col w-full gap-1"
    :class="depth > 0 ? 'pl-5 border-l border-border/40 mt-1' : ''"
  >
    <template v-for="item in items" :key="item.slug">
      <!-- Leaf Node -->
      <NuxtLink
        v-if="!item.children || item.children.length === 0"
        :to="resolveFullPath(parentPath, item.slug)"
        class="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-all cursor-pointer w-full group text-muted-foreground hover:text-foreground"
        :class="[
          isActive(resolvePath(parentPath, item.slug))
            ? 'font-medium text-foreground bg-muted/50'
            : '',
        ]"
      >
        <span>{{ item.label }}</span>
      </NuxtLink>

      <!-- Parent Node -->
      <div v-else class="flex flex-col w-full relative">
        <div
          class="flex items-center justify-between px-2 py-1.5 text-sm rounded-md transition-all w-full group"
          :class="[
            isPathActiveOrChildActive(resolvePath(parentPath, item.slug)) ||
            openSections.has(item.slug)
              ? 'text-foreground'
              : 'text-muted-foreground',
            depth === 0 ? 'mt-2 font-medium' : '',
          ]"
        >
          <NuxtLink
            :to="resolveFullPath(parentPath, item.slug)"
            class="flex-1 hover:text-foreground truncate"
            :class="
              isActive(resolvePath(parentPath, item.slug))
                ? 'font-medium text-foreground'
                : ''
            "
          >
            {{ item.label }}
          </NuxtLink>
          <button
            @click.prevent="toggleSection(item.slug)"
            class="p-1 hover:bg-muted rounded-sm transition-colors cursor-pointer shrink-0 ml-1 text-muted-foreground"
            :class="isSectionOpen(item.slug) ? 'text-foreground' : ''"
          >
            <ChevronDown
              class="w-3.5 h-3.5 transition-transform duration-200 opacity-60"
              :class="isSectionOpen(item.slug) ? 'rotate-180 opacity-100' : ''"
            />
          </button>
        </div>

        <div v-show="isSectionOpen(item.slug)" class="flex flex-col w-full">
          <PublicDocsSidebarNode
            :items="item.children"
            :parent-path="resolvePath(parentPath, item.slug)"
            :depth="depth + 1"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";
import type { DocsNavItem } from "~/config/docs";

const props = defineProps<{
  items: Array<DocsNavItem>;
  parentPath: Array<string>;
  depth: number;
}>();

const route = useRoute();
const openSections: Ref<Set<string>> = ref(new Set());

const resolvePath = (parents: Array<string>, slug: string) => [
  ...parents,
  slug,
];

const resolveFullPath = (parents: Array<string>, slug: string) =>
  `/docs/${[...parents, slug].join("/")}`;

const isActive = (pathArr: Array<string>): boolean => {
  const fullPath = `/docs/${pathArr.join("/")}`;
  return route.path === fullPath;
};

const isPathActiveOrChildActive = (pathArr: Array<string>): boolean => {
  const fullPath = `/docs/${pathArr.join("/")}`;
  return route.path === fullPath || route.path.startsWith(`${fullPath}/`);
};

onMounted(() => {
  autoOpenActive();
});

watch(
  () => route.path,
  () => {
    autoOpenActive();
  },
);

function autoOpenActive() {
  for (const item of props.items) {
    if (
      item.children &&
      isPathActiveOrChildActive(resolvePath(props.parentPath, item.slug))
    )
      openSections.value.add(item.slug);
  }
}

const isSectionOpen = (slug: string): boolean => {
  return openSections.value.has(slug);
};

const toggleSection = (slug: string) => {
  const newSet = new Set(openSections.value);
  if (newSet.has(slug)) newSet.delete(slug);
  else newSet.add(slug);

  openSections.value = newSet;
};
</script>
