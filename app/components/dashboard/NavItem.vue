<script setup lang="ts">
import type { Component } from "vue";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  url?: string;
  icon?: Component;
}

defineProps<{
  item: NavItem;
}>();
</script>

<template>
  <SidebarMenuItem>
    <NuxtLink v-if="item.url" :href="item.url">
      <SidebarMenuButton :tooltip="item.title" class="cursor-pointer">
        <component :is="item.icon" v-if="item.icon" />
        <span>{{ item.title }}</span>
      </SidebarMenuButton>
    </NuxtLink>
    <SidebarMenuButton v-else :tooltip="item.title">
      <component :is="item.icon" v-if="item.icon" />
      <span>{{ item.title }}</span>
    </SidebarMenuButton>
  </SidebarMenuItem>
</template>
