<template>
  <section class="flex flex-col gap-8 w-full">
    <div class="mb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-foreground font-display mb-4"
      >
        headers()
      </h1>
      <p class="text-base text-muted-foreground leading-relaxed">
        The isolated module for executing header verifications directly. All
        header keys are case-insensitive.
      </p>
    </div>

    <div class="flex flex-col gap-6">
      <div>
        <h2
          class="text-xl font-semibold text-foreground border-b border-border pb-2 mb-3"
        >
          Real API Header Tests
        </h2>
        <PublicCommonCodeBlock lang="ts" :code="realCode" />
      </div>

      <div>
        <h2
          class="text-xl font-semibold text-foreground border-b border-border pb-2 mb-3"
        >
          Negative Tests
        </h2>
        <PublicCommonCodeBlock lang="ts" :code="negativeCode" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Classic API - Headers",
});

const realCode = `ab.headers("content type").toHaveHeader("content-type");
ab.headers("server header").toHaveHeaderValue("server", "nginx");
ab.headers("json check").toHaveHeaderValue("content-type", /json/);
ab.headers("json type").toHaveContentType("application/json");`;

const negativeCode = `ab.headers("missing header").not.toHaveHeader("x-powered-by");
ab.headers("wrong server").not.toHaveHeaderValue("server", "apache");`;
</script>
