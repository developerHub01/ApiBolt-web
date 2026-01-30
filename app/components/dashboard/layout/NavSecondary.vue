<template>
  <SidebarGroup>
    <SidebarGroupContent>
      <SidebarMenu>
        <DashboardLayoutNavItem
          v-for="item in items"
          :key="item.title"
          :item="item"
        />
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>

<script setup lang="ts">
import type { Component } from "vue";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  url?: string;
  icon?: Component;
}

defineProps<{
  items: Array<NavItem>;
}>();
</script>
