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

    <div class="flex flex-col gap-6">
      <div>
        <h2
          class="text-xl font-semibold text-foreground border-b border-border pb-2 mb-3"
        >
          Exact Matching
        </h2>
        <PublicCommonCodeBlock lang="ts" :code="exactCode" />
      </div>

      <div>
        <h2
          class="text-xl font-semibold text-foreground border-b border-border pb-2 mb-3"
        >
          Existence & Type Validation
        </h2>
        <PublicCommonCodeBlock lang="ts" :code="typeCode" />
      </div>

      <div>
        <h2
          class="text-xl font-semibold text-foreground border-b border-border pb-2 mb-3"
        >
          Contains & Property Checks
        </h2>
        <PublicCommonCodeBlock lang="ts" :code="containsCode" />
      </div>

      <div>
        <h2
          class="text-xl font-semibold text-foreground border-b border-border pb-2 mb-3"
        >
          Number Validation
        </h2>
        <PublicCommonCodeBlock lang="ts" :code="numberCode" />
      </div>

      <div>
        <h2
          class="text-xl font-semibold text-foreground border-b border-border pb-2 mb-3"
        >
          Strict Number Validation
        </h2>
        <PublicCommonCodeBlock lang="ts" :code="strictNumberCode" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Classic API - Body",
});

const exactCode = `ab.body("success response").toBe({ success: true });
ab.body("deep object").toEqual({
  user: {
    id: 1,
    profile: { name: "John" },
  },
});`;

const typeCode = `ab.body("exists check").toExist();
ab.body("missing check").not.toExist();

ab.body("string type").toBeType("string");
ab.body("number type").toBeType("number");
ab.body("boolean type").toBeType("boolean");
ab.body("object type").toBeType("object");
ab.body("array type").toBeType("array");`;

const containsCode = `ab.body("string contains").toContain("success");
ab.body("array contains").toContain(10);
ab.body("negative string").not.toContain("error");

ab.body("simple property").toHaveProperty("user");
ab.body("nested property").toHaveProperty("user.id");
ab.body("deep property").toHaveProperty("data.user.profile.name");
ab.body("missing property").not.toHaveProperty("user.password");

ab.body("exact length").toHaveLength(3);
ab.body("wrong length").not.toHaveLength(10);`;

const numberCode = `ab.body("gt simple").toBeGreaterThan(10);
ab.body("lt simple").toBeLessThan(100);
ab.body("between simple").toBeBetween(10, 100);`;

const strictNumberCode = `ab.body("strict gt").toBeGreaterThanNumber(10);
ab.body("strict lt").toBeLessThanNumber(100);
ab.body("strict range").toBeBetweenNumber(10, 100);`;
</script>
