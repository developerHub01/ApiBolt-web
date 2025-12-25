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
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowUpRight, Edit, PencilRuler, User } from "lucide-vue-next";

defineProps<{
  id: string;
  onDetails: () => void;
  // isSelcted?: boolean;
}>();
</script>

<template>
  <Card class="w-full gap-4 p-4 rounded-md" :data-theme-id="id">
    <CardHeader class="px-0">
      <AspectRatio :ratio="16 / 9" class="w-full rounded-md overflow-hidden">
        <img
          src="/images/hero-image.jpeg"
          alt="Image"
          class="w-full h-full object-cover"
        />
      </AspectRatio>
    </CardHeader>
    <CardContent class="px-0">
      <CardTitle class="pb-2">Login to your account</CardTitle>
      <CardDescription class="line-clamp-2 leading-relaxed pb-2">
        Enter your email below to login to your account
      </CardDescription>
      <Button variant="link" class="pl-0! text-sm">
        <User :size="14" />
        <NuxtLink href="/profile/1" target="_blank"> Username </NuxtLink>
      </Button>
    </CardContent>
    <CardFooter class="flex gap-2 px-0 justify-between">
      <div class="flex items-center gap-1">
        <span class="text-sm text-muted-foreground"> Theme Type: </span>
        <Badge variant="secondary"> Dark </Badge>
      </div>
      <TooltipProvider>
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
            <NuxtLink href="/dashboard/update-theme">
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
      </TooltipProvider>
    </CardFooter>
  </Card>
</template>
