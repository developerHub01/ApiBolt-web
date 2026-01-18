<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Badge from "@/components/ui/badge/Badge.vue";
import {
  User as AuthorIcon,
  CloudDownload as DownloadIcon,
} from "lucide-vue-next";
import { THEME_PREVIEW_SIZE } from "~/constant/default-theme.constant";
import type { ThemeInterface } from "~/types/theme.types";
import { cn } from "~/lib/utils";

const REQUIRED_WIDTH = THEME_PREVIEW_SIZE.REQUIRED_WIDTH;
const REQUIRED_HEIGHT = THEME_PREVIEW_SIZE.REQUIRED_HEIGHT;

const { theme } = defineProps<{
  theme: ThemeInterface;
}>();

const paletteList = computed(() => Object.entries(theme.palette));
</script>

<template>
  <section
    class="w-full h-full py-10 flex flex-col gap-5 text-sm container mx-auto"
  >
    <h1 class="text-3xl font-black pb-3">{{ theme?.name }}</h1>
    <AspectRatio
      :ratio="16 / 9"
      class="bg-muted rounded-lg shadow-2xl ring-4 ring-secondary/30 mb-3"
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
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2 text-sm">
        <AuthorIcon :size="16" />
        <NuxtLink to="/profile/1">
          <Button variant="link" class="underline px-0 cursor-pointer">
            {{ theme.author }}
          </Button>
        </NuxtLink>
      </div>
      <div class="flex gap-3 font-medium">
        <div class="flex items-center gap-3">
          <p>Theme type:</p>
          <Badge variant="secondary" class="capitalize">{{ theme.type }}</Badge>
        </div>
        <div class="flex items-center gap-3">
          <p>Total install:</p>
          <Badge variant="secondary"><DownloadIcon />10k</Badge>
        </div>
      </div>
      <Button
        type="button"
        class="self-start fixed bottom-4 right-3 shadow-2xl cursor-pointer"
        >Install in app</Button
      >
    </div>
    <div class="flex flex-col gap-3">
      <h2 class="text-xl font-bold">Description:</h2>
      <p>
        {{ theme.description }}
      </p>
    </div>
    <div class="flex flex-col gap-3">
      <h2 class="text-xl font-bold">Palette:</h2>
      <div
        class="grid grid-cols-2 md:grid-cols-4 border-2 border-dashed rounded-md"
      >
        <template v-for="([key, value], index) in paletteList">
          <div
            :class="
              cn(
                'capitalize p-2.5 flex items-center text-base border-b-2 border-r-2 border-dashed',
                {
                  'border-b-0': index === paletteList.length - 1,
                },
              )
            "
          >
            {{ key }}
          </div>
          <div
            :class="
              cn('p-2.5 border-b-2 border-dashed', {
                'border-b-0': index === paletteList.length - 1,
                'md:border-r-2': !(index % 2),
              })
            "
          >
            <div
              class="min-h-11 rounded-sm ring-3 ring-accent"
              :style="{
                background: value,
              }"
            />
          </div>
        </template>
      </div>
    </div>
  </section>
</template>
