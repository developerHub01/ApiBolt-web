<template>
  <div class="flex flex-row flex-wrap items-center gap-12">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button size="icon" variant="secondary" @click="handleLogout">
            <LogOut />
          </Button>
        </TooltipTrigger>
        <TooltipContent align="end">
          <p>Logout from account</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogOut } from "lucide-vue-next";
import { useAuth } from "~/composable/useUserAuth";

const { handleLogout } = useAuth();
</script>
