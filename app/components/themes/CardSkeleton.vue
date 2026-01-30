<template>
  <Card
    class="w-full gap-4 p-4 rounded-md border-0 hover:shadow-2xl transition-all duration-100"
  >
    <CardHeader class="px-0">
      <AspectRatio :ratio="16 / 9" class="w-full rounded-md overflow-hidden">
        <Skeleton class="w-full h-full" />
      </AspectRatio>
    </CardHeader>
    <CardContent class="px-0">
      <CardTitle class="pb-2">
        <Skeleton class="w-4/5 h-9" />
      </CardTitle>
      <div class="pb-2 space-y-2">
        <Skeleton
          v-for="(value, index) in Array.from({ length: 2 })"
          :class="
            cn('w-4/5 h-6', {
              'w-full': !value,
            })
          "
        />
      </div>
      <Skeleton class="w-full max-w-40 h-8" />
    </CardContent>
    <CardFooter class="flex gap-2 px-0 justify-between">
      <Skeleton class="w-full max-w-40 h-9" />
      <Skeleton class="w-full max-w-20 h-9" />
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowUpRight, PencilRuler, User } from "lucide-vue-next";
import { THEME_PREVIEW_SIZE } from "~/constant/default-theme.constant";
import Skeleton from "~/components/ui/skeleton/Skeleton.vue";
import { cn } from "~/lib/utils";

const REQUIRED_WIDTH = THEME_PREVIEW_SIZE.REQUIRED_WIDTH;
const REQUIRED_HEIGHT = THEME_PREVIEW_SIZE.REQUIRED_HEIGHT;
</script>
