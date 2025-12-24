<script setup lang="ts">
defineProps<{
  id: string;
  onClick: () => void;
  isSelcted?: boolean;
}>();
</script>

<template>
  <article :data-theme-id="id" @click="onClick">
    <UPageCard
      orientation="vertical"
      reverse
      spotlight
      class="shadow-2xl"
      :highlight="isSelcted"
    >
      <div class="w-full aspect-video overflow-hidden rounded-md">
        <img
          src="/images/hero-image.jpeg"
          alt="Tailwind CSS"
          class="w-full h-full object-cover select-none"
        />
      </div>
      <template #body>
        <h3 class="text-lg font-semibold">Tailwind CSS {{ id }}</h3>
        <p class="text-sm text-gray-500 font-medium line-clamp-2">
          Nuxt UI integrates with latest Tailwind CSS, bringing significant
          improvements. Nuxt UI integrates with latest Tailwind CSS, bringing
          significant improvements.
        </p>
        <div class="mt-3 flex items-center gap-2">
          <UBadge color="primary">Dark</UBadge>
          <UBadge color="secondary">Light</UBadge>
          <span class="text-xs text-gray-400"> by Shakil </span>
        </div>
      </template>
    </UPageCard>
  </article>
</template>
