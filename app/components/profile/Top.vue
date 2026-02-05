<template>
  <section class="w-full flex flex-col justify-center items-center">
    <AspectRatio
      :ratio="3 / 1"
      class="bg-muted rounded-lg overflow-hidden max-w-4xl mx-auto shadow-2xl"
    >
      <section
        class="w-full h-full"
        :style="{
          background: `url(${coverUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }"
      />
    </AspectRatio>
    <div class="w-full max-w-4xl -mt-6 md:-mt-18 lg:-mt-28 z-10 px-4">
      <div
        class="bg-card/30 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8"
      >
        <div
          class="size-32 md:size-40 lg:size-48 rounded-full overflow-hidden border-4 border-primary/20 p-1 bg-linear-to-tr from-primary/50 to-transparent shadow-xl"
        >
          <NuxtImg
            :src="avatarUrl"
            width="300"
            height="300"
            loading="lazy"
            format="webp"
            class="size-full rounded-full object-cover bg-background"
            :alt="`${profile.full_name} ${profile.user_name} profile avatar`"
          />
        </div>

        <div
          class="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-4 pb-2"
        >
          <div class="space-y-1">
            <h1 class="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              {{ profile.full_name }}
            </h1>
            <p class="text-primary font-medium text-base md:text-lg">
              @{{ profile.user_name }}
            </p>
          </div>

          <p
            v-if="profile.bio"
            class="text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed"
          >
            {{ profile.bio }}
          </p>

          <div class="flex items-center gap-3 pt-2">
            <NuxtLink
              :to="`https://github.com/${profile.user_name}`"
              target="_blank"
            >
              <Button
                class="rounded-full px-6 transition-all hover:scale-105 active:scale-95"
              >
                <GithubIcon class="mr-2 h-4 w-4" />
                View on GitHub
              </Button>
            </NuxtLink>

            <!-- Optional: Add more social links or actions here -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Github as GithubIcon } from "lucide-vue-next";
import {
  DEFAULT_PROFILE_AVATAR,
  DEFAULT_PROFILE_COVER,
} from "~/constant/profile.constant";
import type { ProfileMetaInterface } from "~/types/profile.types";

const { profile } = defineProps<{
  profile: ProfileMetaInterface;
}>();

const coverUrl = profile.cover_url ?? DEFAULT_PROFILE_COVER;
const avatarUrl = profile.avatar_url ?? DEFAULT_PROFILE_AVATAR;
</script>
