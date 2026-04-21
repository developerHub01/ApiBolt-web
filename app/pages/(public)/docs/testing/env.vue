<template>
  <section
    class="flex flex-col gap-8 w-full animate-in slide-in-from-bottom-2 fade-in duration-300"
  >
    <div class="mb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-foreground font-display mb-4"
      >
        Environment Access
      </h1>
      <p class="text-lg text-muted-foreground leading-relaxed mt-4">
        Access your environment variables directly inside test scripts via
        <code
          class="px-1.5 py-0.5 rounded-md bg-muted border border-border text-foreground font-mono text-sm"
          >ab.env</code
        >.
      </p>
    </div>

    <div class="mt-4 flex flex-col gap-4">
      <h2
        class="text-2xl font-semibold text-foreground border-b border-border pb-2"
      >
        Accessing Environment
      </h2>
      <ul class="list-disc pl-6 space-y-2 text-muted-foreground text-base mb-4">
        <li>
          <code
            class="px-1.5 py-0.5 rounded-md bg-muted border border-border text-foreground font-mono"
            >ab.env</code
          >
          &mdash; A
          <code
            class="px-1.5 py-0.5 rounded-md bg-muted border border-border text-foreground font-mono text-sm"
            >Record&lt;string, string&gt;</code
          >
          of all environment variables available in the current context.
        </li>
      </ul>
      <PublicCommonCodeBlock lang="ts" :code="envAccessCode" />
    </div>

    <div class="mt-8 flex flex-col gap-4">
      <h2
        class="text-2xl font-semibold text-foreground border-b border-border pb-2"
      >
        Real-World Usage Examples
      </h2>
      <p class="text-muted-foreground mb-4">
        Combine environment access with the
        <code class="bg-muted px-1 py-0.5 rounded font-mono text-xs"
          >expect()</code
        >
        API for powerful runtime validation:
      </p>
      <PublicCommonCodeBlock lang="ts" :code="envExamplesCode" />
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Environment Access",
});

const envAccessCode = `// Access the full env object
const env = ab.env;

// Read individual variables
const nodeEnv = ab.env.NODE_ENV;
const apiKey = ab.env.API_KEY;
const port = ab.env.PORT;`;

const envExamplesCode = `ab.expect("env production", ab.env.NODE_ENV).toBe("production");
ab.expect("env not debug", ab.env.MODE).not.toBe("debug");
ab.expect("env exists", ab.env.API_KEY).toExist();
ab.expect("env valid mode", ab.env.NODE_ENV).toBeOneOf([
  "development",
  "staging",
  "production",
]);
ab.expect("env port range", ab.env.PORT).toBeBetweenNumber(1000, 9999);`;
</script>
