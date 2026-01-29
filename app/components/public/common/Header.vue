<script setup lang="ts">
const route = useRoute();

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
</script>

<template>
  <section class="w-full flex items-center justify-center py-2">
    <header class="container flex items-center justify-between gap-2 py-2">
      <NuxtLink
        to="/"
        class="text-lg font-bold select-none flex items-center gap-2"
      >
        <NuxtImg src="/logo.svg" class="size-7" alt="api-bolt" />
        APIBolt
      </NuxtLink>
      <div class="flex items-center gap-4">
        <template v-for="{ to, label } in items">
          <NuxtLink :to="to">
            <Button variant="link" size="lg" class="px-1 cursor-pointer">
              {{ label }}
            </Button>
          </NuxtLink>
        </template>
        <PublicCommonProfileMenu />
      </div>
    </header>
  </section>
</template>
