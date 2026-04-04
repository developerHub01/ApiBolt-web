<template>
  <section class="flex flex-col gap-8 w-full">
    <div class="mb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-foreground font-display mb-4"
      >
        body()
      </h1>
      <p class="text-base text-muted-foreground leading-relaxed">
        The isolated module for strictly executing payload body verifications.
      </p>
    </div>

    <div class="mt-4 flex flex-col gap-4">
      <PublicDocsCodeBlock lang="ts" :code="codeString" />
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Classic API - Body",
});

const codeString = `ab.body("Primitive match").toBe("OK");
ab.body("Value is 10").toBe(10);
ab.body("Deep equality").toEqual({ key: "value" });

ab.body("Value exists").toExist();

ab.body("Check string").toBeType("string");
ab.body("Check array").toBeType("array");

ab.body("Array contains item").toContain("apple");

ab.body("Has property").toHaveProperty("user.name");

ab.body("Array has length 3").toHaveLength(3);

ab.body("Greater than 10").toBeGreaterThan(10);
ab.body("Between 10 and 20").toBeBetween(10, 20);`;
</script>
