<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  onClose: () => void;
}>();
</script>

<template>
  <!-- <USlideover
    :open="isOpen"
    @update:open="onClose"
    side="right"
    inset
    title="Slideover with inset"
    :ui="{
      content: 'w-11/12 max-w-2xl',
      description: 'hidden',
    }"
  >
    <template #title>Theme Name</template>
    <template #description></template>
    <template #body>
      <div class="w-full aspect-video overflow-hidden rounded-md shadow mb-3">
        <img
          width="500"
          height="400"
          class="w-full h-full object-cover"
          src="/images/hero-image.jpeg"
          alt=""
        />
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe odio
        culpa officiis nesciunt at amet corporis aperiam eius fuga dolorum non,
        vel qui voluptate, cupiditate ab sequi, aut voluptas. Quam.
      </p>
    </template>
    <template #footer>
      <UButton>Install in app</UButton>
    </template>
  </USlideover> -->
</template>
