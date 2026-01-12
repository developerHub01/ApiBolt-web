<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Badge from "@/components/ui/badge/Badge.vue";
import {
  User as AuthorIcon,
  CloudDownload as DownloadIcon,
} from "lucide-vue-next";
import { THEME_PREVIEW_SIZE } from "~/constant/default-theme.constant";
import type { ThemeInterface } from "~/types/theme.types";

const { onClose } = defineProps<{
  theme?: ThemeInterface;
  onClose: () => void;
}>();

const REQUIRED_WIDTH = THEME_PREVIEW_SIZE.REQUIRED_WIDTH;
const REQUIRED_HEIGHT = THEME_PREVIEW_SIZE.REQUIRED_HEIGHT;

const handleClose = (open: boolean) => {
  if (!open) onClose();
};
</script>

<template>
  <Sheet :open="Boolean(theme)" @update:open="handleClose">
    <SheetContent
      class="inset-5 h-auto ml-auto rounded-md border-0 w-10/12 sm:max-w-2xl gap-0"
      v-if="theme"
    >
      <SheetHeader>
        <SheetTitle>{{ theme.name }}</SheetTitle>
        <SheetDescription class="hidden"></SheetDescription>
      </SheetHeader>
      <ScrollArea class="flex-1 min-h-0 border-y">
        <section class="w-full h-full p-4 flex flex-col gap-2 text-sm">
          <AspectRatio
            :ratio="16 / 9"
            class="bg-muted rounded-lg shadow-2xl ring-4 ring-secondary/30"
          >
            <NuxtImg
              :width="REQUIRED_WIDTH / 3"
              :height="REQUIRED_HEIGHT / 3"
              :src="theme.preview"
              alt="Photo by Drew Beamer"
              fill
              class="h-full w-full rounded-lg object-cover"
            />
          </AspectRatio>
          <div class="flex items-center gap-2 text-sm">
            <AuthorIcon :size="16" />
            <NuxtLink to="/profile/1">
              <Button variant="link" class="underline px-0 cursor-pointer">
                Username
              </Button>
            </NuxtLink>
            <Badge variant="secondary" class="ml-auto">{{ theme.type }}</Badge>
            <Badge variant="secondary"><DownloadIcon />10k</Badge>
          </div>
          <p>
            {{ theme.description }}
          </p>
        </section>
      </ScrollArea>
      <SheetFooter>
        <Button type="button" class="self-end">Install in app</Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
