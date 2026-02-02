<template>
  <section class="w-full flex flex-col gap-8 py-20 items-center">
    <div class="text-center space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">Top Creations</h2>
      <p class="text-muted-foreground text-lg">
        Most popular themes by this author.
      </p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
      <ThemesCard
        v-for="theme in themes"
        :key="theme.id"
        v-bind="theme"
        :author="author"
        :showAuthor="false"
        class="h-full"
      />
    </div>
    <NuxtLink to="/dashboard/themes">
      <Button variant="outline" class="rounded-full px-8">
        Explore All Themes
      </Button>
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
import type { ThemeMetaInterface } from "~/types/theme.types";
import { Button } from "~/components/ui/button";

const props = defineProps<{
  themes: Array<ThemeMetaInterface>;
  author: string;
}>();
</script>
