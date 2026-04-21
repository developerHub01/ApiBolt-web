<template>
  <section class="flex flex-col gap-8 w-full">
    <div class="mb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-foreground font-display mb-4"
      >
        Status Assertions (Expect API)
      </h1>
      <p class="text-base text-muted-foreground leading-relaxed">
        Validate precise HTTP response statuses directly.
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
            toBe(expected: number)
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Asserts that the HTTP status matches the exact expected number.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('Status is 200').status.toBe(200);`"
          />
        </div>

        <div>
          <h3 class="font-mono text-sm font-semibold text-primary mb-1">
            toBeOneOf(list: number[])
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Asserts that the status is contained within the allowed array.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('Valid success').status.toBeOneOf([200, 201, 204]);`"
          />
        </div>

        <div>
          <h3 class="font-mono text-sm font-semibold text-primary mb-1">
            toBeGreaterThan(num) / toBeLessThan(num)
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Numeric boundary assertions for the HTTP status.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('Less than 300').status.toBeLessThan(300);`"
          />
        </div>

        <div>
          <h3 class="font-mono text-sm font-semibold text-primary mb-1">
            toBeBetween(min, max)
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Asserts the status falls inclusively within the range.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('2xx range').status.toBeBetween(200, 299);`"
          />
        </div>

        <div>
          <h3 class="font-mono text-sm font-semibold text-primary mb-1">
            Category Matchers
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Quick semantic checks for overarching categories (2xx, 3xx, 4xx,
            5xx).
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('Success').status.toBeSuccess();\nab.expect('Client error').status.toBeClientError();\nab.expect('Server error').status.toBeServerError();\nab.expect('Redirect').status.toBeRedirect();`"
          />
        </div>

        <div>
          <h3 class="font-mono text-sm font-semibold text-primary mb-1">
            Semantic Strict Matchers
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Human-readable strict equality matchers for common codes.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('OK').status.toBeOK(); // 200\nab.expect('Created').status.toBeCreated(); // 201\nab.expect('Accepted').status.toBeAccepted(); // 202\nab.expect('No Content').status.toBeNoContent(); // 204\nab.expect('Bad Request').status.toBeBadRequest(); // 400\nab.expect('Unauthorized').status.toBeUnauthorized(); // 401\nab.expect('Forbidden').status.toBeForbidden(); // 403\nab.expect('Not Found').status.toBeNotFound(); // 404\nab.expect('Internal Server Error').status.toBeInternalServerError(); // 500\nab.expect('Bad Gateway').status.toBeBadGateway(); // 502\nab.expect('Service Unavailable').status.toBeServiceUnavailable(); // 503`"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
useSeoMeta({
  title: "Expect API - Status",
});
</script>
