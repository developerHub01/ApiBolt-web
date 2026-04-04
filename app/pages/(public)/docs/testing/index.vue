<template>
  <section class="flex flex-col gap-8 w-full">
    <div class="mb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-foreground font-display mb-4"
      >
        ApiBolt Test Engine (ABTestEngine)
      </h1>
      <p class="text-base text-muted-foreground leading-relaxed">
        A lightweight, powerful testing utility for validating API responses
        inside ApiBolt.
      </p>
    </div>

    <div class="flex flex-col gap-4">
      <h2
        class="text-xl font-semibold text-foreground border-b border-border pb-2"
      >
        Core Idea
      </h2>
      <p class="text-muted-foreground text-sm">
        <code
          class="px-1.5 py-0.5 rounded bg-muted font-mono tracking-tight text-foreground"
          >ABTestEngine</code
        >
        provides multiple assertion layers:
      </p>

      <div class="grid sm:grid-cols-2 gap-4 mt-2">
        <div class="space-y-3">
          <div class="flex items-start gap-2">
            <code
              class="px-1.5 py-0.5 text-xs rounded bg-muted font-mono text-foreground mt-0.5"
              >status()</code
            >
            <span class="text-sm text-muted-foreground leading-snug"
              >HTTP status testing</span
            >
          </div>
          <div class="flex items-start gap-2">
            <code
              class="px-1.5 py-0.5 text-xs rounded bg-muted font-mono text-foreground mt-0.5"
              >body()</code
            >
            <span class="text-sm text-muted-foreground leading-snug"
              >Response body validation</span
            >
          </div>
          <div class="flex items-start gap-2">
            <code
              class="px-1.5 py-0.5 text-xs rounded bg-muted font-mono text-foreground mt-0.5"
              >headers()</code
            >
            <span class="text-sm text-muted-foreground leading-snug"
              >Headers validation</span
            >
          </div>
          <div class="flex items-start gap-2">
            <code
              class="px-1.5 py-0.5 text-xs rounded bg-muted font-mono text-foreground mt-0.5"
              >cookies()</code
            >
            <span class="text-sm text-muted-foreground leading-snug"
              >Cookies validation</span
            >
          </div>
        </div>
        <div class="space-y-3">
          <div class="flex items-start gap-2">
            <code
              class="px-1.5 py-0.5 text-xs rounded bg-muted font-mono text-foreground mt-0.5"
              >group()</code
            >
            <span class="text-sm text-muted-foreground leading-snug"
              >Organize tests into blocks</span
            >
          </div>
          <div class="flex items-start gap-2">
            <code
              class="px-1.5 py-0.5 text-xs rounded bg-muted font-mono text-foreground mt-0.5"
              >print()</code
            >
            <span class="text-sm text-muted-foreground leading-snug"
              >Log values to console</span
            >
          </div>
          <div class="flex items-start gap-2">
            <code
              class="px-1.5 py-0.5 text-xs rounded bg-muted font-mono text-foreground mt-0.5"
              >code()</code
            >
            <span class="text-sm text-muted-foreground leading-snug"
              >Log formatted code blocks</span
            >
          </div>
          <div class="flex items-start gap-2">
            <code
              class="px-1.5 py-0.5 text-xs rounded bg-muted font-mono text-foreground mt-0.5"
              >summary()</code
            >
            <span class="text-sm text-muted-foreground leading-snug"
              >Generate visual summary</span
            >
          </div>
        </div>
      </div>

      <div
        class="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <code
            class="px-2 py-1 rounded bg-primary/10 text-primary font-mono text-sm font-semibold"
            >expect()</code
          >
          <span class="text-sm font-medium text-foreground"
            >All-In-One Unified API (Recommended)</span
          >
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4 mt-6">
      <h2
        class="text-xl font-semibold text-foreground border-b border-border pb-2"
      >
        Negation (.not)
      </h2>
      <p class="text-sm text-muted-foreground mb-2">
        Every assertion supports
        <code
          class="px-1.5 py-0.5 bg-muted rounded font-mono text-xs text-foreground"
          >.not</code
        >
        for logical inversion.
      </p>
      <PublicDocsCodeBlock lang="ts" :code="negationCode" />
    </div>

    <div class="flex flex-col gap-4 mt-6">
      <h2
        class="text-xl font-semibold text-foreground border-b border-border pb-2"
      >
        Summary Matrix
      </h2>
      <div
        class="overflow-hidden border border-border rounded shadow-sm bg-card mt-2"
      >
        <table class="w-full text-sm text-left">
          <thead class="bg-muted border-b border-border">
            <tr>
              <th
                scope="col"
                class="px-4 py-2 font-medium text-foreground w-1/2"
              >
                Category
              </th>
              <th
                scope="col"
                class="px-4 py-2 font-medium text-foreground w-1/2"
              >
                Primary Method
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr>
              <td class="px-4 py-3 text-muted-foreground">Status</td>
              <td class="px-4 py-3">
                <code
                  class="px-1.5 py-0.5 text-xs bg-muted rounded font-mono text-foreground"
                  >expect()</code
                >
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-muted-foreground">Body</td>
              <td class="px-4 py-3">
                <code
                  class="px-1.5 py-0.5 text-xs bg-muted rounded font-mono text-foreground"
                  >expect()</code
                >
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-muted-foreground">Headers</td>
              <td class="px-4 py-3">
                <code
                  class="px-1.5 py-0.5 text-xs bg-muted rounded font-mono text-foreground"
                  >expect()</code
                >
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-muted-foreground">Cookies</td>
              <td class="px-4 py-3">
                <code
                  class="px-1.5 py-0.5 text-xs bg-muted rounded font-mono text-foreground"
                  >expect()</code
                >
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-muted-foreground">Negation</td>
              <td class="px-4 py-3">
                <code
                  class="px-1.5 py-0.5 text-xs bg-muted rounded font-mono text-foreground"
                  >.not</code
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex flex-col gap-4 mt-6">
      <h2
        class="text-xl font-semibold text-foreground border-b border-border pb-2"
      >
        Final Note & Philosophy
      </h2>
      <p class="text-sm text-muted-foreground leading-relaxed">
        If you are separately calling
        <code class="text-xs font-mono">ab.status()</code>,
        <code class="text-xs font-mono">ab.body()</code>,
        <code class="text-xs font-mono">ab.headers()</code>, and
        <code class="text-xs font-mono">ab.cookies()</code>, you are doing more
        work than needed. The
        <code
          class="text-xs font-mono font-medium text-primary bg-primary/10 px-1 rounded"
          >expect()</code
        >
        method is designed to behave like a mini-Jest framework inside ApiBolt.
      </p>
      <blockquote
        class="border-l-4 border-muted-foreground/30 pl-4 py-2 mt-2 text-sm text-muted-foreground italic bg-muted/20"
      >
        "One method. Full control. Zero confusion."
      </blockquote>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Testing Overview",
});

const negationCode = `ab.expect("Not 500").not.toBe(500);
ab.expect("No error").not.toBeServerError();
ab.expect("No password field").not.toHaveProperty("password");`;
</script>
