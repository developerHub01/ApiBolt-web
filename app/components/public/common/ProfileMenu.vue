<script setup>
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "~/composable/userAuth";

const { user, avatar, name } = useAuth();
</script>

<template>
  <div class="flex flex-row flex-wrap items-center gap-12">
    <NuxtLink :to="user ? '/dashboard' : '/login'">
      <Avatar v-if="user" class="ring-2 ring-primary">
        <AvatarImage :src="avatar" :alt="name" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Button v-else class="cursor-pointer">Login</Button>
    </NuxtLink>
  </div>
</template>
