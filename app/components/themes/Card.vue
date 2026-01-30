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
      <CardDescription
        class="line-clamp-2 leading-relaxed mb-2 overflow-hidden"
      >
        {{ description }}
      </CardDescription>
      <Button
        v-if="showAuthor"
        variant="link"
        class="pl-0! text-sm text-accent-foreground underline"
      >
        <User :size="14" />
        {{ author }}
      </Button>
    </CardContent>
    <CardFooter class="flex gap-2 px-0 justify-between flex-wrap">
      <div class="flex items-center gap-1">
        <span class="text-sm text-muted-foreground"> Theme Type: </span>
        <Badge variant="secondary" class="capitalize"> {{ type }} </Badge>
      </div>
      <ButtonGroup
        class="ring ring-ring/50 rounded-md overflow-hidden divide-x"
      >
        <Tooltip>
          <TooltipTrigger as-child>
            <NuxtLink v-if="showLink" :to="detailsUrl" target="_blank">
              <Button variant="secondary" size="icon-sm" aria-label="Go Back">
                <ArrowUpRight />
              </Button>
            </NuxtLink>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>See Details</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip v-if="canEdit">
          <NuxtLink :to="`/dashboard/update-theme/${id}`">
            <TooltipTrigger as-child>
              <Button
                variant="secondary"
                size="icon-sm"
                aria-label="Go Back"
                class="cursor-pointer rounded-none"
              >
                <PencilRuler />
              </Button>
            </TooltipTrigger>
          </NuxtLink>
          <TooltipContent side="bottom">
            <p>Update Theme</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip v-if="canDelete ?? false">
          <TooltipTrigger as-child>
            <Button
              variant="secondary"
              size="icon-sm"
              aria-label="Go Back"
              @click="emit('delete')"
            >
              <Trash2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Delete Theme</p>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
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
