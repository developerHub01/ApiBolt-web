<template>
  <SidebarMenuItem class="select-none">
    <NuxtLink v-if="item.url" :to="item.url">
      <SidebarMenuButton
        :tooltip="item.title"
        class="cursor-pointer"
        :is-active="isActive"
      >
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

<script setup lang="ts">
import type { Component } from "vue";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  url?: string;
  icon?: Component;
}

const { item } = defineProps<{
  item: NavItem;
}>();

const route = useRoute();
const isActive = computed(() => (item.url ? route.path === item.url : false));
</script>
