<template>
  <Sidebar collapsible="offcanvas" data-lenis-prevent>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            as-child
            class="data-[slot=sidebar-menu-button]:p-1.5!"
          >
            <NuxtLink to="/dashboard" class="flex items-center">
              <NuxtImg
                src="/logo.svg"
                :width="25"
                :height="25"
                class="object-contain"
              />
              <span class="text-base font-semibold">APIBolt</span>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <DashboardLayoutNavMain :items="navMain" />
      <DashboardLayoutNavSecondary :items="navSecondary" class="mt-auto" />
    </SidebarContent>
  </Sidebar>
</template>

<script setup lang="ts">
import {
  House,
  Palette,
  PackagePlus,
  ArrowLeft,
  UserPen,
} from "lucide-vue-next";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navMain = [
  {
    title: "Home",
    url: "/dashboard",
    icon: House,
  },
  {
    title: "Update profile",
    url: "/dashboard/update-profile",
    icon: UserPen,
  },
  {
    title: "My Themes",
    icon: Palette,
    url: "/dashboard/themes",
  },
  {
    title: "Create Theme",
    icon: PackagePlus,
    url: "/dashboard/create-theme",
  },
];
const navSecondary = [
  {
    title: "Back To Home",
    url: "/",
    icon: ArrowLeft,
  },
];
</script>
