<script setup lang="ts">
import {
  House,
  UserRoundPen,
  Palette,
  PackagePlus,
  ArrowLeft,
  CircleUser,
} from "lucide-vue-next";
import NavMain from "@/components/dashboard/layout/NavMain.vue";
import NavSecondary from "@/components/dashboard/layout/NavSecondary.vue";
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
    title: "Profile",
    url: "/dashboard/profile",
    icon: CircleUser,
  },
  {
    title: "Edit Profile",
    url: "/dashboard/edit-profile",
    icon: UserRoundPen,
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

<template>
  <Sidebar collapsible="offcanvas">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            as-child
            class="data-[slot=sidebar-menu-button]:p-1.5!"
          >
            <NuxtLink href="/dashboard">
              <span class="text-base font-semibold">APIBolt</span>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="navMain" />
      <NavSecondary :items="navSecondary" class="mt-auto" />
    </SidebarContent>
  </Sidebar>
</template>
