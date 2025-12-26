<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <NuxtLink href="/dashboard/profile">
        <DropdownMenuItem class="cursor-pointer"> Profile </DropdownMenuItem>
      </NuxtLink>
      <DropdownMenuItem variant="destructive">Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
