<template>
  <section class="flex flex-col gap-8 w-full">
    <div class="mb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-foreground font-display mb-4"
      >
        headers()
      </h1>
      <p class="text-base text-muted-foreground leading-relaxed">
        The isolated module for executing header verifications directly.
      </p>
    </div>

    <div class="mt-4 flex flex-col gap-4">
      <PublicDocsCodeBlock lang="ts" :code="codeString" />
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Classic API - Headers",
});

const codeString = `ab.headers("Headers exist").toExist();
ab.headers("Is Empty").toBeEmpty();

ab.headers("Header 'content-type' exists").toHaveProperty("content-type");
ab.headers("Header missing").not.toHaveProperty("x-custom-header");

ab.headers("Value check").toHaveHeaderValue("server", "nginx");
ab.headers("JSON check").toHaveContentType("application/json");`;
</script>
