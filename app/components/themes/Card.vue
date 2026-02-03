<template>
  <div
    class="theme-card group relative flex flex-col rounded-xl border-2 border-white/10 bg-card/40 backdrop-blur-md overflow-hidden hover:border-primary/30 transition-colors duration-500 p-5 h-full"
    :data-theme-id="id"
  >
    <!-- Hover Effect - Gradient Glow -->
    <div
      class="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
    />

    <!-- Image Area -->
    <AspectRatio
      :ratio="16 / 9"
      class="relative w-full rounded-lg overflow-hidden bg-muted/20 border-2 border-white/5 z-10"
    >
      <NuxtImg
        :width="REQUIRED_WIDTH / 4"
        :height="REQUIRED_HEIGHT / 4"
        :src="thumbnail"
        alt="Theme Preview"
        class="w-full h-full object-cover transition-all duration-700 ease-out"
        loading="lazy"
      />
    </AspectRatio>

    <!-- Content Area -->
    <div class="relative pt-4 flex-1 flex flex-col z-10 gap-2">
      <div class="flex justify-between items-start gap-2">
        <h3
          class="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1"
        >
          {{ name }}
        </h3>
        <Badge variant="secondary" class="capitalize text-xs shrink-0">
          {{ type }}
        </Badge>
      </div>

      <p class="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
        {{ description }}
      </p>

      <div class="mt-auto pt-4 flex items-center justify-between gap-4">
        <Button
          v-if="showAuthor"
          variant="link"
          class="p-0 has-[>svg]:px-0 h-auto text-xs text-muted-foreground hover:text-foreground/80 no-underline hover:underline"
        >
          <User class="w-3 h-3 mr-1" />
          {{ author }}
        </Button>

        <div class="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger as-child>
              <NuxtLink v-if="showLink" :to="detailsUrl" target="_blank">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  class="h-8 w-8 hover:bg-primary/20 hover:text-primary"
                >
                  <ArrowUpRight class="w-4 h-4" />
                </Button>
              </NuxtLink>
            </TooltipTrigger>
            <TooltipContent side="bottom"> View Details </TooltipContent>
          </Tooltip>

          <template v-if="canEdit">
            <Tooltip>
              <TooltipTrigger as-child>
                <NuxtLink :to="`/dashboard/update-theme/${id}`">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    class="h-8 w-8 hover:bg-primary/20 hover:text-primary"
                  >
                    <PencilRuler class="w-4 h-4" />
                  </Button>
                </NuxtLink>
              </TooltipTrigger>
              <TooltipContent side="bottom"> Update </TooltipContent>
            </Tooltip>
          </template>

          <template v-if="canDelete">
            <Tooltip>
              <TooltipTrigger as-child>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  class="h-8 w-8 hover:bg-destructive/20 hover:text-destructive"
                  @click="emit('delete')"
                >
                  <Trash2 class="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom"> Delete </TooltipContent>
            </Tooltip>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowUpRight, PencilRuler, Trash2, User } from "lucide-vue-next";
import { THEME_PREVIEW_SIZE } from "~/constant/default-theme.constant";
import type { ThemeMetaInterface } from "~/types/theme.types";
import { userProfileLinkFromUserName } from "~/composable/userProfileLinkFromUserName";

const props = withDefaults(
  defineProps<
    ThemeMetaInterface & {
      canDelete?: boolean;
      canEdit?: boolean;
      showAuthor?: boolean;
      showLink?: boolean;
    }
  >(),
  {
    canDelete: false,
    canEdit: false,
    showAuthor: true,
    showLink: true,
  },
);

const emit = defineEmits<{
  (e: "delete"): void;
}>();

const REQUIRED_WIDTH = THEME_PREVIEW_SIZE.REQUIRED_WIDTH;
const REQUIRED_HEIGHT = THEME_PREVIEW_SIZE.REQUIRED_HEIGHT;

const detailsUrl = computed(() => `/theme/${props.id}`);
const authorUrl = computed(
  () => userProfileLinkFromUserName(props.author).value ?? undefined,
);
</script>
