<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const items = computed<Array<Array<NavigationMenuItem>>>(() => [
  [
    {
      label: "Home",
      icon: "i-lucide-house",
      to: "/dashboard",
      active: route.path === "/dashboard",
    },
    {
      label: "Profile",
      icon: "i-lucide-circle-user",
      to: "/dashboard/profile",
      active: route.path === "/dashboard/profile",
    },
    {
      label: "Edit Profile",
      icon: "i-lucide-user-round-pen",
      to: "/dashboard/edit-profile",
      active: route.path === "/dashboard/edit-profile",
    },
    {
      label: "Theme",
      icon: "i-lucide-palette",
      defaultOpen: true,
      children: [
        {
          label: "My Themes",
          to: "/dashboard/themes",
          active: route.path === "/dashboard/themes",
        },
        {
          label: "Create Theme",
          to: "/dashboard/create-theme",
          active: route.path === "/dashboard/create-theme",
        },
        {
          label: "Update Theme",
          to: "/dashboard/update-theme",
          active: route.path === "/dashboard/update-theme",
        },
      ],
    },
  ],
  [
    {
      label: "Home Page",
      icon: "i-lucide-home",
      to: "/",
      target: "_blank",
    },
    {
      label: "Theme marketplace",
      icon: "i-lucide-store",
      to: "/marketplace",
      target: "_blank",
    },
  ],
]);
</script>

<template>
  <UDashboardSidebar
    collapsible
    resizable
    :ui="{ footer: 'border-t border-default' }"
    :default-size="50"
    :min-size="30"
  >
    <template #header="{ collapsed }">
      <Logo v-if="!collapsed" class="h-5 w-auto shrink-0">ApiBolt</Logo>
      <UIcon
        v-else
        name="i-simple-icons-nuxtdotjs"
        class="size-5 text-primary mx-auto"
      />
    </template>

    <template #default="{ collapsed }">
      <UNavigationMenu
        :collapsed="collapsed"
        :items="items[0]"
        orientation="vertical"
      />

      <UNavigationMenu
        :collapsed="collapsed"
        :items="items[1]"
        orientation="vertical"
        class="mt-auto"
      />
    </template>
  </UDashboardSidebar>
</template>
