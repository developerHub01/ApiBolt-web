<template>
  <section
    class="flex flex-col gap-8 w-full animate-in slide-in-from-bottom-2 fade-in duration-300"
  >
    <div class="mb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-foreground font-display mb-4"
      >
        Debugging & Logging
      </h1>
      <p class="text-lg text-muted-foreground leading-relaxed mt-4">
        Use
        <code
          class="px-1.5 py-0.5 rounded-md bg-muted border border-border text-foreground text-sm font-mono tracking-tight"
          >print()</code
        >
        to inspect the state of your response or environment variables during
        test execution.
      </p>
    </div>

    <div class="mt-4 flex flex-col gap-4">
      <PublicCommonCodeBlock lang="ts" :code="codeString" />
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "print() method",
});

const codeString = `// Log raw values
ab.print("Status Code", ab.response.status);

// Log objects (auto-stringified)
ab.print("Response Payload", ab.response.body);

// Log specific parts of the response
const user = ab.response.body.user;
if (user) {
  ab.print("User ID detected", user.id);
}`;
</script>
