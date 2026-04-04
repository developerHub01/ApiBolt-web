<template>
  <section class="flex flex-col gap-8 w-full">
    <div class="mb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-foreground font-display mb-4"
      >
        Headers Assertions
      </h1>
      <p class="text-base text-muted-foreground leading-relaxed">
        Ensure proper metadata and security policies via HTTP Header validation.
      </p>
    </div>

    <div class="flex flex-col gap-6">
      <h2
        class="text-xl font-semibold text-foreground border-b border-border pb-2"
      >
        Available Matchers
      </h2>

      <div class="space-y-6">
        <div>
          <h3 class="font-mono text-sm font-semibold text-primary mb-1">
            toHaveHeader(key)
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Asserts that a specific case-insensitive header payload is present.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('Has API Rate Limit').toHaveHeader('x-ratelimit-remaining');`"
          />
        </div>

        <div>
          <h3 class="font-mono text-sm font-semibold text-primary mb-1">
            toHaveHeaderValue(key, expectedOrRegex)
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Asserts the header matches an exact string or passes a Regular
            Expression test.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`// Exact String Matching\nab.expect('Cors Policy').toHaveHeaderValue('access-control-allow-origin', '*');\n\n// Regex Matching\nab.expect('Valid Cache Time').toHaveHeaderValue('cache-control', /max-age/);`"
          />
        </div>

        <div>
          <h3 class="font-mono text-sm font-semibold text-primary mb-1">
            toHaveContentType(typeSubstring)
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Shorthand to ensure the
            <code class="bg-muted px-1 py-0.5 rounded text-xs text-foreground"
              >Content-Type</code
            >
            header natively includes the provided signature.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('Returns JSON').toHaveContentType('application/json');`"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
useSeoMeta({
  title: "Expect API - Headers",
});
</script>
