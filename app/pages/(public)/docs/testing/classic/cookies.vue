<template>
  <section class="flex flex-col gap-8 w-full">
    <div class="mb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-foreground font-display mb-4"
      >
        cookies()
      </h1>
      <p class="text-base text-muted-foreground leading-relaxed">
        The isolated module for strictly executing complete cookie-level
        assertions including secure flags, httpOnly flags, origins, and
        lifespans.
      </p>
    </div>

    <div class="mt-4 flex flex-col gap-4">
      <PublicDocsCodeBlock lang="ts" :code="codeString" />
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Classic API - Cookies",
});

const codeString = `ab.cookies("session_id").toExist();

ab.cookies("session_id").toBe("123456");

ab.cookies("session_id").toContain("123");

ab.cookies("session_id").toHaveProperty("path");

ab.cookies("session_id").toHavePath("/");
ab.cookies("session_id").toBeSecure();
ab.cookies("session_id").toBeHttpOnly();

ab.cookies("session_id").toBeSameSite("strict");

ab.cookies("session_id").toExpireAfter(1800);
ab.cookies("session_id").toExpireBefore(3600);
ab.cookies("session_id").toHaveDomain("example.com");

ab.cookies().toExist();`;
</script>
