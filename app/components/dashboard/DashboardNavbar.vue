<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

const items: Array<TabsItem> = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Unread",
    value: "unread",
  },
];
</script>

<template>
  <UDashboardNavbar>
    <template #leading>
      <UDashboardSidebarCollapse />
    </template>

    <template #right>
      <NuxtLink href="/dashboard/profile">
        <UAvatar src="https://github.com/benjamincanac.png" />
      </NuxtLink>
    </template>
  </UDashboardNavbar>
</template>
