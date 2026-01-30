<template>
  <CardHeader class="w-full text-center">
    <DashboardHeading>{{ heading }}</DashboardHeading>
    <CardDescription>{{ description }}</CardDescription>
  </CardHeader>
</template>

<script setup lang="ts">
import { CardHeader, CardDescription } from "@/components/ui/card";
const props = defineProps<{
  heading: string;
  description: string;
}>();
</script>
