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
    <div
      class="w-4/5 max-w-xl shadow-2xl rounded-lg bg-background p-5 flex justify-center items-center flex-col gap-4 -mt-10 md:-mt-25 lg:-mt-30 z-10"
    >
      <div
        class="size-30 md:size-40 lg:size-45 rounded-full overflow-hidden border-3"
      >
        <NuxtImg
          :src="avatarUrl"
          width="300"
          height="300"
          class="size-full object-cover"
          :alt="`${profile.full_name} ${profile.user_name} profile avatar`"
        />
      </div>
      <div
        class="flex flex-col justify-center items-center w-full max-w-lg text-center gap-2"
      >
        <h1 class="text-2xl font-bold line-clamp-1">{{ profile.full_name }}</h1>
        <NuxtLink
          :to="`https://github.com/${profile.user_name}`"
          target="_blank"
        >
          <Button class="w-fit cursor-pointer">
            <GithubIcon />
            {{ profile.user_name }}
          </Button>
        </NuxtLink>
        <p v-if="profile.bio">
          {{ profile.bio }}
        </p>
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
