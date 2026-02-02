<template>
  <ClientOnly>
    <template v-if="user">
      <DropdownMenu>
        <DropdownMenuTrigger class="outline-none">
          <Avatar
            class="size-9 ring-2 ring-primary/20 hover:ring-primary transition-all cursor-pointer"
          >
            <AvatarImage :src="avatar" :alt="name" />
            <AvatarFallback class="bg-muted text-xs font-bold">{{
              name?.slice(0, 2).toUpperCase() || "CN"
            }}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          class="w-56 bg-card/80 backdrop-blur-xl border-white/10 rounded-xl p-2 shadow-2xl"
        >
          <div class="px-2 py-3 mb-2 border-b border-white/5">
            <p class="text-sm font-bold truncate">{{ name }}</p>
            <p class="text-xs text-muted-foreground truncate">
              {{ user.email }}
            </p>
          </div>
          <NuxtLink to="/dashboard">
            <DropdownMenuItem
              class="cursor-pointer rounded-lg hover:bg-primary/10 hover:text-primary transition-colors gap-3 py-2.5"
            >
              <User class="size-4" />
              <span>Personal Dashboard</span>
            </DropdownMenuItem>
          </NuxtLink>
          <NuxtLink to="/dashboard/update-profile">
            <DropdownMenuItem
              class="cursor-pointer rounded-lg hover:bg-primary/10 hover:text-primary transition-colors gap-3 py-2.5"
            >
              <Settings class="size-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </NuxtLink>
          <div class="my-1 border-t border-white/5"></div>
          <DropdownMenuItem
            variant="destructive"
            @click="handleLogout"
            class="cursor-pointer rounded-lg gap-3 py-2.5"
          >
            <LogOut class="size-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </template>
    <template v-else>
      <NuxtLink to="/login">
        <Button
          variant="default"
          class="rounded-full px-6 font-semibold shadow-lg hover:scale-105 transition-transform active:scale-95"
        >
          Get Started
        </Button>
      </NuxtLink>
    </template>
  </ClientOnly>
</template>

<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "~/composable/useUserAuth";
import { User, Settings, LogOut } from "lucide-vue-next";

const { user, avatar, name, handleLogout } = useAuth();
</script>
