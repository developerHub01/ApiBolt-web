<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "~/composable/useUserAuth";

const { user, avatar, name, handleLogout } = useAuth();
</script>

<template>
  <ClientOnly>
    <template v-if="user">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar class="ring-2 ring-primary">
            <AvatarImage :src="avatar" :alt="name" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <NuxtLink to="/dashboard">
            <DropdownMenuItem class="cursor-pointer">
              Profile
            </DropdownMenuItem>
          </NuxtLink>
          <DropdownMenuItem variant="destructive" @click="handleLogout"
            >Logout</DropdownMenuItem
          >
        </DropdownMenuContent>
      </DropdownMenu>
    </template>
    <template else>
      <NuxtLink to="/login">
        <Button>Login</Button>
      </NuxtLink>
    </template>
  </ClientOnly>
</template>
