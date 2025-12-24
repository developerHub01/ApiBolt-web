<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  onClose: () => void;
}>();
</script>

<template>
  <USlideover
    :open="isOpen"
    @update:open="onClose"
    side="right"
    inset
    title="Slideover with inset"
    :ui="{
      content: 'w-11/12 max-w-2xl',
    }"
  >
    <template #title>Theme Details</template>
    <template #description></template>
    <template #body>
      <p v-for="value in Array(10).fill(1)">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe odio
        culpa officiis nesciunt at amet corporis aperiam eius fuga dolorum non,
        vel qui voluptate, cupiditate ab sequi, aut voluptas. Quam.
      </p>
    </template>
    <template #footer></template>
  </USlideover>
</template>
