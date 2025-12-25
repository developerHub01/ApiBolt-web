<script setup lang="ts">
import type { Component } from "vue";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import NavItem from "@/components/dashboard/layout/NavItem.vue";

interface NavItem {
  title: string;
  url?: string;
  icon?: Component;
}

defineProps<{
  items: Array<NavItem>;
}>();
</script>

<template>
  <SidebarGroup>
    <SidebarGroupContent class="flex flex-col gap-2">
      <SidebarMenu>
        <NavItem v-for="item in items" :key="item.title" :item="item" />
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
