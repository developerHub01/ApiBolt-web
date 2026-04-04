<template>
  <section class="flex flex-col gap-8 w-full">
    <div class="mb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-foreground font-display mb-4"
      >
        Body Assertions
      </h1>
      <p class="text-base text-muted-foreground leading-relaxed">
        Validate JSON structures, arrays, and primitive payload types exactly.
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
            toBe(expected)
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Asserts strict equality (<code class="bg-muted px-1 py-0.5 rounded"
              >===</code
            >). Equivalent to primitive strict matches.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('Exact string').toBe('OK');`"
          />
        </div>

        <div>
          <h3 class="font-mono text-sm font-semibold text-primary mb-1">
            toEqual(expected)
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Asserts deep strict equality for full objects or complex arrays.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('Body equals').toEqual({ success: true, count: 5 });`"
          />
        </div>

        <div>
          <h3 class="font-mono text-sm font-semibold text-primary mb-1">
            toExist()
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Asserts that the body payload is strictly not
            <code class="bg-muted px-1 py-0.5 rounded">undefined</code> or
            <code class="bg-muted px-1 py-0.5 rounded">null</code>.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('Has payload').toExist();`"
          />
        </div>

        <div>
          <h3 class="font-mono text-sm font-semibold text-primary mb-1">
            toBeType(type)
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Validates the primitive runtime type. Arrays are explicitly mapped
            to <code class="bg-muted px-1 py-0.5 rounded">"array"</code>.
            Supported:
            <code class="bg-muted px-1 py-0.5 rounded text-xs"
              >"string" | "number" | "boolean" | "object" | "array"</code
            >.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('Is array').toBeType('array');`"
          />
        </div>

        <div>
          <h3 class="font-mono text-sm font-semibold text-primary mb-1">
            toContain(item)
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Checks if a substring exists in a string body, or if an item exists
            within an array body.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('Contains error token').toContain('TokenExpiredException');`"
          />
        </div>

        <div>
          <h3 class="font-mono text-sm font-semibold text-primary mb-1">
            toHaveProperty(keyPath)
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Asserts that a deep dot-notated property exists in the JSON body.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('Has user mapping').toHaveProperty('data.user.id');`"
          />
        </div>

        <div>
          <h3 class="font-mono text-sm font-semibold text-primary mb-1">
            toHaveLength(len)
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Validates the explicit numerical length of a JSON array response.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('Exactly 10 results').toHaveLength(10);`"
          />
        </div>

        <div>
          <h3 class="font-mono text-sm font-semibold text-primary mb-1">
            Numerical Boundaries
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Asserts that the body itself (if it is a raw number) conforms to
            numerical limits.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('> 10').toBeGreaterThanNumber(10);\nab.expect('< 50').toBeLessThanNumber(50);\nab.expect('In window').toBeBetweenNumber(10, 20);`"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
useSeoMeta({
  title: "Expect API - Body",
});
</script>
