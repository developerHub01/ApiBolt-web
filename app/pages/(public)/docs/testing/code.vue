<template>
  <section
    class="flex flex-col gap-8 w-full animate-in slide-in-from-bottom-2 fade-in duration-300"
  >
    <div class="mb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-foreground font-display mb-4"
      >
        Code Block Logging
      </h1>
      <p class="text-lg text-muted-foreground leading-relaxed mt-4">
        Use
        <code
          class="px-1.5 py-0.5 rounded-md bg-muted border border-border text-foreground text-sm font-mono tracking-tight"
          >code()</code
        >
        to log complex objects, payloads, or debug variables into the ApiBolt
        console as syntax-highlighted code blocks.
      </p>
    </div>

    <div class="mt-4 flex flex-col gap-4">
      <h3
        class="text-xl font-bold text-foreground mb-2 border-b border-border pb-2"
      >
        Log Variables as Code
      </h3>
      <p class="text-muted-foreground mb-4">
        Unlike
        <code class="px-1 py-0.5 bg-muted rounded-md font-mono text-sm"
          >print()</code
        >
        which renders simple objects or strings,
        <code class="px-1 py-0.5 bg-muted rounded-md font-mono text-sm"
          >code()</code
        >
        formats the given payload explicitly as formatted javascript, json, or
        markdown directly inside your test results.
      </p>
      <PublicCommonCodeBlock lang="ts" :code="codeString" />
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "code() API",
});

const codeString = `// Render as a javascript code block
ab.code("First Item ID", ab.response.body, "javascript");

// Render as a json payload
ab.code("First Item ID", ab.response, "json");

// Example of inspecting deeply nested elements visually
ab.code("Headers Output", ab.response.headers, "json");`;
</script>
