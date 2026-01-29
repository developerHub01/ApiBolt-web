<template>
  <section
    class="min-h-screen flex items-center justify-center border-b border-border px-6 py-20"
  >
    <div class="max-w-4xl mx-auto text-center">
      <div class="mb-8">
        <h1
          class="text-5xl md:text-7xl font-extrabold mb-4 flex justify-center items-center gap-2"
        >
          <NuxtImg src="/logo.svg" class="size-10 md:size-14" alt="api-bolt" />
          API<span class="text-primary">Bolt</span>
        </h1>
        <p class="text-xl md:text-2xl text-muted-foreground mb-2">
          Industrial-Grade API Management Platform
        </p>
      </div>
      <p class="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        The complete toolkit for API development, testing, and debugging.
        Local-first. Zero cloud. Zero telemetry.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          class="bg-primary text-primary-foreground px-8 py-3 text-lg hover:bg-opacity-90 transition-all"
        >
          Start Building
        </button>
        <button
          class="px-8 py-3 text-lg border border-border text-foreground hover:bg-accent/10 transition-colors"
        >
          View Docs
        </button>
      </div>
      <div class="mt-12 pt-8 border-t border-border">
        <p class="text-sm text-muted-foreground mb-4">
          Enterprise-Grade Features
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <span
            v-for="badge in badges"
            :key="badge"
            class="px-4 py-2 border border-border text-sm"
          >
            {{ badge }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const badges = [
  "31 Core Features",
  "AES-256 Encryption",
  "Zero Telemetry",
  "Local-First",
];
</script>
