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

    <div class="flex flex-col gap-6">
      <div>
        <h2
          class="text-xl font-semibold text-foreground border-b border-border pb-2 mb-3"
        >
          Existence & Value
        </h2>
        <PublicCommonCodeBlock lang="ts" :code="existenceCode" />
      </div>

      <div>
        <h2
          class="text-xl font-semibold text-foreground border-b border-border pb-2 mb-3"
        >
          Structure Validation
        </h2>
        <PublicCommonCodeBlock lang="ts" :code="structureCode" />
      </div>

      <div>
        <h2
          class="text-xl font-semibold text-foreground border-b border-border pb-2 mb-3"
        >
          Expiry, Path & Domain
        </h2>
        <PublicCommonCodeBlock lang="ts" :code="metaCode" />
      </div>

      <div>
        <h2
          class="text-xl font-semibold text-foreground border-b border-border pb-2 mb-3"
        >
          Security Flags & SameSite
        </h2>
        <PublicCommonCodeBlock lang="ts" :code="securityCode" />
      </div>

      <div>
        <h2
          class="text-xl font-semibold text-foreground border-b border-border pb-2 mb-3"
        >
          Multiple Cookies
        </h2>
        <PublicCommonCodeBlock lang="ts" :code="multiCode" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Classic API - Cookies",
});

const existenceCode = `ab.cookies("session").toExist();
ab.cookies("token").not.toExist();

ab.cookies("session").toBe("abc123");
ab.cookies("session").not.toBe("wrong-value");

ab.cookies("session").toContain("abc");`;

const structureCode = `ab.cookies("session").toHaveProperty("value");
ab.cookies("session").toHaveProperty("domain");
ab.cookies("session").toHaveProperty("path");`;

const metaCode = `ab.cookies("session").toExpireAfter(3600);
ab.cookies("session").toExpireBefore(7200);

ab.cookies("session").toHavePath("/");
ab.cookies("session").toHaveDomain("example.com");`;

const securityCode = `ab.cookies("session").toBeSecure();
ab.cookies("session").toBeHttpOnly();

ab.cookies("session").toBeSameSite("strict");
ab.cookies("session").toBeSameSite("lax");
ab.cookies("session").toBeSameSite("none");`;

const multiCode = `ab.cookies().toHaveLength(2);`;
</script>
