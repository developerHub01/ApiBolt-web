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
import type { ThemeInterface } from "~/types/theme.types";

defineProps<
  ThemeInterface & {
    id: string;
    onDetails: () => void;
    // isSelcted?: boolean;
  }
>();

const REQUIRED_WIDTH = THEME_PREVIEW_SIZE.REQUIRED_WIDTH;
const REQUIRED_HEIGHT = THEME_PREVIEW_SIZE.REQUIRED_HEIGHT;
</script>

<template>
  <Card
    class="w-full gap-4 p-4 rounded-md border-0 hover:shadow-2xl transition-all duration-100"
    :data-theme-id="id"
  >
    <CardHeader class="px-0">
      <AspectRatio :ratio="16 / 9" class="w-full rounded-md overflow-hidden">
        <NuxtImg
          :width="REQUIRED_WIDTH / 4"
          :height="REQUIRED_HEIGHT / 4"
          :src="thumbnail"
          alt="Image"
          class="w-full h-full object-cover"
        />
      </AspectRatio>
    </CardHeader>
    <CardContent class="px-0">
      <CardTitle class="pb-2">{{ name }}</CardTitle>
      <CardDescription class="line-clamp-2 leading-relaxed pb-2">
        {{ description }}
      </CardDescription>
      <Button
        variant="link"
        class="pl-0! text-sm text-accent-foreground underline"
      >
        <User :size="14" />
        <NuxtLink to="/profile/1" target="_blank"> Username </NuxtLink>
      </Button>
    </CardContent>
    <CardFooter class="flex gap-2 px-0 justify-between">
      <div class="flex items-center gap-1">
        <span class="text-sm text-muted-foreground"> Theme Type: </span>
        <Badge variant="secondary"> {{ type }} </Badge>
      </div>
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Go Back"
              @click="onDetails"
            >
              <ArrowUpRight />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>See Details</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <NuxtLink to="/dashboard/update-theme">
            <TooltipTrigger as-child>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Go Back"
                class="rounded-l-none cursor-pointer"
              >
                <PencilRuler />
              </Button>
            </TooltipTrigger>
          </NuxtLink>
          <TooltipContent side="bottom">
            <p>Update Theme</p>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </CardFooter>
  </Card>
</template>
