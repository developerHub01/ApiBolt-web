<script setup lang="ts">
useSeoMeta({
  title: "APIBolt theme marketplace",
  description:
    "APIBolt theme marketplace. Explore tons of themes from the community and download and review.",
});

const searchTypeList = ["Name", "Author"];
const themeTypeList = ["All", "Dark", "Light", "Custom"];

const route = useRoute();
const router = useRouter();

const page = computed<number>({
  get() {
    const p = Number(route.params.page);
    return Number.isNaN(p) || p < 1 ? 1 : p;
  },
  set(value) {
    router.push({
      params: {
        ...route.params,
        page: value,
      },
    });
  },
});
</script>

<template></template>
