<template>
  <section class="w-full flex flex-col justify-center items-center">
    <AspectRatio
      :ratio="3 / 1"
      class="bg-muted rounded-lg overflow-hidden w-full mx-auto"
    >
      <Skeleton class="w-full h-full" />
    </AspectRatio>
    <div class="w-full max-w-4xl -mt-16 md:-mt-24 lg:-mt-28 z-10 px-4">
      <div
        class="bg-card/30 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8"
      >
        <Skeleton
          class="size-32 md:size-40 lg:size-48 rounded-full border-4 border-primary/10"
        />

        <div
          class="flex-1 flex flex-col items-center md:items-start w-full gap-4 pb-2"
        >
          <div
            class="space-y-2 w-full flex flex-col items-center md:items-start"
          >
            <Skeleton class="h-10 w-3/4 max-w-64" />
            <Skeleton class="h-6 w-1/4 max-w-32" />
          </div>

          <div class="space-y-2 w-full">
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-5/6" />
          </div>

          <div class="flex items-center gap-3 pt-2">
            <Skeleton class="h-10 w-32 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Skeleton } from "~/components/ui/skeleton";
</script>
