<template>
  <section
    class="flex flex-col gap-8 w-full animate-in slide-in-from-bottom-2 fade-in duration-300"
  >
    <div class="mb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-foreground font-display mb-4"
      >
        Test Summary
      </h1>
      <p class="text-lg text-muted-foreground leading-relaxed mt-4">
        The summary methods allow you to generate a final report at the end of
        your script.
      </p>
    </div>

    <div class="mt-4 flex flex-col gap-4">
      <PublicDocsCodeBlock lang="ts" :code="codeString" />
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Summary API",
});

const codeString = `ab.group("Final Audit", () => {
  // Perform some tests
  ab.expect("Final check").toBeOK();

  // Push summary into results
  ab.summary();

  // Print summary to debug console
  ab.printSummary();
});`;
</script>
