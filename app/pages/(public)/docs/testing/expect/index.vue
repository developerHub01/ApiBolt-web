<template>
  <section class="flex flex-col gap-8 w-full">
    <div class="mb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-foreground font-display mb-4"
      >
        Why
        <code
          class="px-1.5 py-0.5 rounded-md bg-muted border border-border text-foreground text-[0.8em] font-mono tracking-tight"
          >expect()</code
        >?
      </h1>
      <div
        class="my-5 flex gap-3 border-l-4 border-muted-foreground/30 pl-4 py-1 text-muted-foreground italic"
      >
        <p>
          <code
            class="px-1.5 py-0.5 bg-muted border border-border rounded-md not-italic font-mono text-sm"
            >expect()</code
          >
          is the <strong>most powerful API</strong>
        </p>
      </div>
      <p class="text-lg text-muted-foreground leading-relaxed mt-4">
        It combines:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-foreground text-base mt-4 mb-6">
        <li>Status assertions</li>
        <li>Body assertions</li>
        <li>Headers assertions</li>
        <li>Cookies assertions</li>
      </ul>
      <p class="text-foreground font-medium mb-8">
        You can test everything from a single interface.
      </p>
    </div>

    <div class="mt-4 flex flex-col gap-4">
      <h2
        class="text-xl font-semibold text-foreground border-b border-border pb-2"
      >
        Basic Usage
      </h2>
      <PublicDocsCodeBlock lang="ts" :code="codeString" />
    </div>

    <div class="mt-12 flex flex-col gap-4">
      <h2
        class="text-xl font-bold text-foreground border-b border-border pb-2 uppercase tracking-wider"
      >
        Expect API Full Documentation
      </h2>
      <p class="text-muted-foreground">
        Select a category on the sidebar to view all supported matchers.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Expect API",
});

const codeString = `// simple test
ab.expect("Status OK").toBe(200);

// get results
const results = ab.getResults();`;
</script>
