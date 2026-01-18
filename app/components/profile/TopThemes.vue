<script setup lang="ts">
import type { ThemeMetaInterface } from "~/types/theme.types";
import { Button } from "~/components/ui/button";

const props = defineProps<{
  themes: Array<ThemeMetaInterface>;
  author: string;
}>();
</script>

<template>
  <section class="w-full flex flex-col gap-5 py-15 items-center">
    <h2 class="text-2xl font-bold">My top themes:</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      <ThemesCard
        v-for="theme in themes"
        v-bind="theme"
        :author="author"
        :showAuthor="false"
      />
    </div>
    <NuxtLink to="/dashboard/themes">
      <Button class="self-center cursor-pointer">See All Themes</Button>
    </NuxtLink>
  </section>
</template>
