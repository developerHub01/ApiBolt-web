<template>
  <section class="py-20 px-6 bg-linear-to-b from-background to-muted/20">
    <div class="container mx-auto max-w-5xl">
      <div class="text-center mb-12">
        <SectionHeader class="text-center">
          <template #title>
            Free <span class="text-primary">Fake APIs</span>
          </template>
          <template #description>
            Test your workflows with our free REST API endpoints. No
            authentication required.</template
          >
        </SectionHeader>
      </div>

      <!-- CTA -->
      <div class="text-center">
        <NuxtLink
          to="/fake"
          class="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Code2 class="w-5 h-5" />
          View API Documentation
          <ArrowRight class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Code2, ArrowRight } from "lucide-vue-next";
import SectionHeader from "@/components/public/common/SectionHeader.vue";
</script>
