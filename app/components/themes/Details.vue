<template>
  <section class="container mx-auto py-12 px-4 flex flex-col gap-8">
    <!-- Header -->
    <div class="space-y-2">
      <h1
        class="text-4xl md:text-5xl font-black bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
      >
        {{ theme?.name }}
      </h1>
    </div>

    <!-- Preview -->
    <div
      class="relative group rounded-2xl border-2 border-white/10 bg-card/40 p-2 backdrop-blur-md shadow-2xl"
    >
      <div
        class="absolute inset-0 bg-primary/10 blur-3xl opacity-20 group-hover:opacity-80 transition-opacity pointer-events-none"
      />
      <AspectRatio
        :ratio="16 / 9"
        class="relative z-10 bg-muted/20 rounded-xl overflow-hidden border border-white/5"
      >
        <NuxtImg
          :src="theme.preview"
          :alt="theme.name"
          class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </AspectRatio>
    </div>

    <!-- Meta / Actions -->
    <div
      class="flex flex-col sm:flex-row gap-6 justify-between items-start md:items-center py-6 border-b border-white/10"
    >
      <div class="flex flex-col sm:flex-row gap-4 md:items-center">
        <!-- Author -->
        <div class="flex items-center gap-2 text-muted-foreground text-sm">
          <AuthorIcon class="w-4 h-4" />
          <NuxtLink
            v-if="authorProfileLink"
            :to="authorProfileLink"
            target="_blank"
            class="text-foreground hover:text-primary font-medium hover:underline transition-colors underline"
          >
            {{ theme.author }}
          </NuxtLink>
          <span v-else>{{ theme.author }}</span>
        </div>

        <div class="hidden md:block w-px h-4 bg-white/10" />

        <!-- Stats -->
        <div class="flex gap-3">
          <Badge
            variant="secondary"
            class="capitalize px-3 py-1 bg-white/5 hover:bg-white/10"
          >
            {{ theme.type }}
          </Badge>
          <Badge
            variant="secondary"
            class="px-3 py-1 bg-white/5 hover:bg-white/10"
          >
            <DownloadIcon class="w-3 h-3 mr-1.5" />
            {{ theme.install_count }} Install{{
              theme.install_count > 1 ? "s" : ""
            }}
          </Badge>
        </div>
      </div>

      <Button
        @click="handleIdCopy"
        size="sm"
        variant="outline"
        class="rounded-full border-white/10 hover:bg-white/5 text-xs"
      >
        <component :is="copied ? CheckIcon : CopyIcon" class="size-3.5 mr-2" />
        {{ copied ? "ID Copied" : "Copy ID" }}
      </Button>
    </div>

    <!-- Description -->
    <div class="space-y-4">
      <h2 class="text-xl font-bold flex items-center gap-2">Description</h2>
      <div
        class="prose prose-invert max-w-none text-muted-foreground leading-relaxed"
      >
        <p>{{ theme.description }}</p>
      </div>
    </div>

    <!-- Palette -->
    <div class="space-y-4">
      <h2 class="text-xl font-bold flex items-center gap-2">Palette</h2>
      <div
        class="grid grid-cols-2 lg:grid-cols-4 border border-white/10 rounded-xl overflow-hidden bg-card/20 backdrop-blur-sm"
      >
        <template v-for="([key, value], index) in paletteList" :key="key">
          <div
            :class="
              cn(
                'capitalize p-3 flex items-center text-sm font-medium border-b border-r border-white/10 text-muted-foreground bg-accent/10',
                {
                  'border-b-0': index >= paletteList.length - 1,
                },
              )
            "
          >
            {{ key.replaceAll("-", " ") }}
          </div>
          <div
            :class="
              cn(
                'p-3 border-b border-white/10 flex items-center justify-center',
                {
                  'border-b-0': index >= paletteList.length - 1,
                  'lg:border-r border-white/10': index % 2 === 0,
                },
              )
            "
          >
            <div
              class="h-8 w-full rounded shadow-sm ring-1 ring-white/10"
              :style="{ background: value }"
              :title="value"
            />
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Badge from "@/components/ui/badge/Badge.vue";
import {
  User as AuthorIcon,
  CheckIcon,
  CopyIcon,
  CloudDownload as DownloadIcon,
} from "lucide-vue-next";
import type { ThemeInterface } from "~/types/theme.types";
import { cn } from "~/lib/utils";
import { userProfileLinkFromUserName } from "~/composable/userProfileLinkFromUserName";
import { useClipboard } from "@vueuse/core";

const { theme } = defineProps<{
  theme: ThemeInterface;
}>();

const paletteList = computed(() => Object.entries(theme.palette));
const authorProfileLink = userProfileLinkFromUserName(theme.authorUsername);

const textToCopy = computed(() => theme.id);
const { copy, copied } = useClipboard({ source: textToCopy });

const handleIdCopy = () => copy(textToCopy.value.trim());
</script>
