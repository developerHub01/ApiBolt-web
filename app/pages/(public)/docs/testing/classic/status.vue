<template>
  <section class="flex flex-col gap-8 w-full">
    <div class="mb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-foreground font-display mb-4"
      >
        status()
      </h1>
      <p class="text-base text-muted-foreground leading-relaxed">
        The isolated module explicitly binding execution logic directly to HTTP
        statuses without parsing overheads.
      </p>
    </div>

    <div class="flex flex-col gap-6">
      <div>
        <h2
          class="text-xl font-semibold text-foreground border-b border-border pb-2 mb-3"
        >
          Exact HTTP Validation
        </h2>
        <PublicCommonCodeBlock lang="ts" :code="exactCode" />
      </div>

      <div>
        <h2
          class="text-xl font-semibold text-foreground border-b border-border pb-2 mb-3"
        >
          Multi-Match
        </h2>
        <PublicCommonCodeBlock lang="ts" :code="multiCode" />
      </div>

      <div>
        <h2
          class="text-xl font-semibold text-foreground border-b border-border pb-2 mb-3"
        >
          Range Checks
        </h2>
        <PublicCommonCodeBlock lang="ts" :code="rangeCode" />
      </div>

      <div>
        <h2
          class="text-xl font-semibold text-foreground border-b border-border pb-2 mb-3"
        >
          Semantic Helpers
        </h2>
        <PublicCommonCodeBlock lang="ts" :code="semanticCode" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Classic API - Status",
});

const exactCode = `ab.status("login success").toBe(200);
ab.status("user created").toBe(201);
ab.status("accepted async").toBe(202);
ab.status("no content delete").toBe(204);
ab.status("bad request validation").toBe(400);
ab.status("auth required").toBe(401);
ab.status("access denied").toBe(403);
ab.status("missing resource").toBe(404);
ab.status("server crash").toBe(500);
ab.status("gateway issue").toBe(502);
ab.status("service down").toBe(503);`;

const multiCode = `ab.status("auth endpoints").toBeOneOf([200, 201, 204]);
ab.status("error group").toBeOneOf([400, 401, 403, 404]);`;

const rangeCode = `ab.status("success range").toBeBetween(200, 299);
ab.status("client error range").toBeBetween(400, 499);
ab.status("server error range").toBeBetween(500, 599);
ab.status("above check").toBeGreaterThan(199);
ab.status("below check").toBeLessThan(300);`;

const semanticCode = `ab.status("success shortcut").toBeSuccess();
ab.status("client shortcut").toBeClientError();
ab.status("server shortcut").toBeServerError();
ab.status("redirect shortcut").toBeRedirect();
ab.status("ok exact").toBeOK();
ab.status("created exact").toBeCreated();
ab.status("accepted exact").toBeAccepted();
ab.status("no content exact").toBeNoContent();`;
</script>
