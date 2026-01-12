<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "~/composable/useUserAuth";

const { supabase, avatar, name, handleLogout } = useAuth();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar class="ring-2 ring-primary">
        <AvatarImage :src="avatar" :alt="name" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <NuxtLink to="/dashboard/profile">
        <DropdownMenuItem class="cursor-pointer"> Profile </DropdownMenuItem>
      </NuxtLink>
      <DropdownMenuItem variant="destructive" @click="handleLogout"
        >Logout</DropdownMenuItem
      >
    </DropdownMenuContent>
  </DropdownMenu>
</template>
