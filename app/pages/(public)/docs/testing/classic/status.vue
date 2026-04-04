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

    <div class="mt-4 flex flex-col gap-4">
      <PublicCommonCodeBlock lang="ts" :code="codeString" />
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Classic API - Status",
});

const codeString = `ab.status("Status is 200").toBe(200);
ab.status("Status is not 500").not.toBe(500);

ab.status("Valid success").toBeOneOf([200, 201, 204]);
ab.status("Not allowed").not.toBeOneOf([400, 401, 403]);

ab.status("Greater than 199").toBeGreaterThan(199);
ab.status("Less than 300").toBeLessThan(300);

ab.status("2xx range").toBeBetween(200, 299);
ab.status("Not in 4xx range").not.toBeBetween(400, 499);

ab.status("Success response").toBeSuccess();
ab.status("Client error").toBeClientError();
ab.status("Server error").toBeServerError();
ab.status("Redirect").toBeRedirect();

ab.status("OK").toBeOK();
ab.status("Created").toBeCreated();
ab.status("Bad Request").toBeBadRequest();
ab.status("Internal Server Error").toBeInternalServerError();`;
</script>
