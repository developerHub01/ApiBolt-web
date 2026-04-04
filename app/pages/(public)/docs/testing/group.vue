<template>
  <section
    class="flex flex-col gap-8 w-full animate-in slide-in-from-bottom-2 fade-in duration-300"
  >
    <div class="mb-4">
      <h1
        class="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-display mb-4 uppercase"
      >
        Organizing Tests
      </h1>
      <p class="text-lg text-muted-foreground leading-relaxed mt-4">
        Use
        <code
          class="px-1.5 py-0.5 rounded-md bg-muted border border-border text-foreground text-sm font-mono tracking-tight"
          >group()</code
        >
        to create logical boundaries for your tests. This is essential for large
        API suites.
      </p>
    </div>

    <div class="mt-4 flex flex-col gap-4">
      <PublicCommonCodeBlock lang="ts" :code="codeString" />
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "group() method",
});

const codeString = `// 1. Basic Grouping
ab.group("Profile Module", () => {
  ab.expect("Status is 200").toBeOK();
  ab.expect("Valid JSON Body").toBeType("object");
});

// 2. Functional Segregation
ab.group("Authentication Security", () => {
  ab.expect("HSTS Header").toHaveHeader("strict-transport-security");
  ab.expect("XSS Protection").toHaveHeaderValue(
    "x-xss-protection",
    "1; mode=block",
  );
  ab.expect("No sensitive data in body").not.toHaveProperty("user.password");
});`;
</script>
