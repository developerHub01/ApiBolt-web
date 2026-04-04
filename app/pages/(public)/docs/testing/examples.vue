<template>
  <section
    class="flex flex-col gap-8 w-full animate-in slide-in-from-bottom-2 fade-in duration-300"
  >
    <div class="mb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-foreground font-display mb-4"
      >
        Advanced Examples
      </h1>
      <p class="text-base text-muted-foreground leading-relaxed">
        Real-world combinations of tests mapping over deeply nested properties,
        iteration arrays, and complex dynamic logical flows.
      </p>
    </div>

    <div class="mt-4 flex flex-col gap-8">
      <div>
        <h3 class="text-xl font-bold text-foreground mb-4">
          Complex Pagination Check
        </h3>
        <PublicCommonCodeBlock lang="ts" :code="codeExample1" />
      </div>

      <div>
        <h3 class="text-xl font-bold text-foreground mb-4">
          Deep Cookie & Security Audit
        </h3>
        <PublicCommonCodeBlock lang="ts" :code="codeExample2" />
      </div>

      <div>
        <h3 class="text-xl font-bold text-foreground mb-4">
          Conditional Logic (Runtime)
        </h3>
        <PublicCommonCodeBlock lang="ts" :code="codeExample3" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Pro Examples",
});

const codeExample1 = `ab.group("Pagination Tests", () => {
  ab.expect("Is Array").toBeType("array");
  ab.expect("Has 10 items").toHaveLength(10);

  const firstItem = ab.response.body[0];
  ab.print("First Item ID", firstItem.id);
  ab.code("First Item ID", ab.response.body, "javascript");
  ab.code("First Item ID", ab.response, "json");

  ab.expect("Has ID").toHaveProperty("0.id");
  ab.expect("Has Metadata").toHaveHeader("x-total-count");
});`;

const codeExample2 = `ab.group("Strict Security Check", () => {
  const sid = ab.cookies("session_id");

  sid.toExist();
  sid.toBeSecure();
  sid.toBeHttpOnly();
  sid.toBeSameSite("strict");
  sid.toExpireAfter(3600); // 1 hour
  sid.toHavePath("/api");
  sid.toHaveDomain("api.production.com");
});`;

const codeExample3 = `const res = ab.response;

if (res.status === 201) {
  ab.group("Resource Created Verification", () => {
    ab.expect("Has Location Header").toHaveHeader("location");
    ab.expect("Body has ID").toHaveProperty("id");
  });
} else {
  ab.print("Warning", "Resource was not created, skipping deep checks.");
  ab.expect("Fallback Status").toBeOK();
}`;
</script>
