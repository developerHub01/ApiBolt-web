<template>
  <section class="flex flex-col gap-8 w-full">
    <div class="mb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-foreground font-display mb-4"
      >
        Classic API
      </h1>
      <div
        class="my-5 flex gap-3 border-l-4 border-muted-foreground/30 pl-4 py-1 text-muted-foreground italic"
      >
        <p>
          Full low-level control if you don't want
          <code
            class="px-1.5 py-0.5 bg-muted border border-border rounded-md not-italic font-mono text-sm"
            >expect()</code
          >
        </p>
      </div>
    </div>

    <div class="mt-8 flex flex-col gap-4">
      <ul class="list-disc pl-6 space-y-2 text-muted-foreground text-base">
        <li>
          <code
            class="px-1.5 py-0.5 rounded-md bg-muted border border-border text-foreground text-sm font-mono tracking-tight"
            >status()</code
          >
          targets HTTP status codes.
        </li>
        <li>
          <code
            class="px-1.5 py-0.5 rounded-md bg-muted border border-border text-foreground text-sm font-mono tracking-tight"
            >body()</code
          >
          targets the JSON or string payload.
        </li>
        <li>
          <code
            class="px-1.5 py-0.5 rounded-md bg-muted border border-border text-foreground text-sm font-mono tracking-tight"
            >headers()</code
          >
          targets response headers.
        </li>
        <li>
          <code
            class="px-1.5 py-0.5 rounded-md bg-muted border border-border text-foreground text-sm font-mono tracking-tight"
            >cookies()</code
          >
          targets cookies.
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Classic API",
});
</script>
