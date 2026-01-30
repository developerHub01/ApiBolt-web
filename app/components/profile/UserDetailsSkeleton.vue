<template>
  <section class="w-full flex flex-col justify-center items-center">
    <AspectRatio
      :ratio="3 / 1"
      class="bg-muted rounded-lg overflow-hidden w-full mx-auto"
    >
      <Skeleton class="w-full h-full" />
    </AspectRatio>
    <div
      class="w-4/5 max-w-xl shadow-2xl rounded-lg bg-background p-5 flex justify-center items-center flex-col gap-4 -mt-10 md:-mt-25 lg:-mt-30 z-10"
    >
      <Skeleton
        class="size-30 md:size-40 lg:size-45 rounded-full overflow-hidden border-3"
      />
      <div
        class="flex flex-col w-full max-w-lg text-center justify-center items-center gap-5"
      >
        <Skeleton class="h-10 w-4/5 max-w-48" />
        <Skeleton class="h-20 w-4/5" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Skeleton } from "~/components/ui/skeleton";
</script>
