<template>
  <section
    class="flex flex-col gap-6 w-full animate-in slide-in-from-bottom-2 fade-in duration-300"
  >
    <div class="mb-8">
      <h1
        class="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-display mb-4"
      >
        Documentation
      </h1>
      <p class="text-lg text-muted-foreground leading-relaxed">
        Welcome to the documentation. Navigate the sidebar to explore API
        testing, assertions, and more.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <NuxtLink
        to="/docs/testing"
        class="p-5 rounded-xl bg-card border border-border hover:bg-muted/50 transition-all group block"
      >
        <h3
          class="text-lg font-semibold text-foreground mb-2 group-hover:text-primary"
        >
          Testing Interface
        </h3>
        <p class="text-sm text-muted-foreground">
          Discover the built-in ABTestEngine and master API validation.
        </p>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Documentation Overview",
});
</script>
