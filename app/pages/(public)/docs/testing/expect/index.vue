<template>
  <section class="flex flex-col gap-8 w-full">
    <div class="mb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-foreground font-display mb-4"
      >
        Why
        <code
          class="px-1.5 py-0.5 rounded-md bg-muted border border-border text-foreground text-[0.8em] font-mono tracking-tight"
          >expect()</code
        >?
      </h1>
      <div
        class="my-5 flex gap-3 border-l-4 border-muted-foreground/30 pl-4 py-1 text-muted-foreground italic"
      >
        <p>
          <code
            class="px-1.5 py-0.5 bg-muted border border-border rounded-md not-italic font-mono text-sm"
            >expect()</code
          >
          is the <strong>most powerful API</strong> in ABTestEngine
        </p>
      </div>
      <p class="text-lg text-muted-foreground leading-relaxed mt-4">
        It operates in two modes:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-foreground text-base mt-4 mb-6">
        <li>
          <strong>Value Mode</strong> — pass a second argument to assert against
          a specific value
        </li>
        <li>
          <strong>Response Mode</strong> — omit the second argument to test
          status, body, headers, and cookies
        </li>
      </ul>
      <p class="text-foreground font-medium mb-8">
        You can test everything from a single interface.
      </p>
    </div>

    <div class="mt-4 flex flex-col gap-4">
      <h2
        class="text-xl font-semibold text-foreground border-b border-border pb-2"
      >
        Value Mode
      </h2>
      <p class="text-sm text-muted-foreground mb-2">
        Pass a second argument to assert against a specific value directly.
      </p>
      <PublicCommonCodeBlock lang="ts" :code="valueModeCode" />
    </div>

    <div class="mt-4 flex flex-col gap-4">
      <h2
        class="text-xl font-semibold text-foreground border-b border-border pb-2"
      >
        Response Mode
      </h2>
      <p class="text-sm text-muted-foreground mb-2">
        Omit the second argument to access
        <code class="bg-muted px-1 py-0.5 rounded font-mono text-xs"
          >.status</code
        >,
        <code class="bg-muted px-1 py-0.5 rounded font-mono text-xs">.body</code
        >,
        <code class="bg-muted px-1 py-0.5 rounded font-mono text-xs"
          >.headers</code
        >, and
        <code class="bg-muted px-1 py-0.5 rounded font-mono text-xs"
          >.cookies</code
        >
        sub-chains.
      </p>
      <PublicCommonCodeBlock lang="ts" :code="responseModeCode" />
    </div>

    <div class="mt-12 flex flex-col gap-4">
      <h2
        class="text-xl font-bold text-foreground border-b border-border pb-2 uppercase tracking-wider"
      >
        Expect API Full Documentation
      </h2>
      <p class="text-muted-foreground">
        Select a category on the sidebar to view all supported matchers.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Expect API",
});

const valueModeCode = `ab.expect("user id", user.id).toBe(1);
ab.expect("username", user.name).toBe("john");
ab.expect("array check", [1, 2, 3]).toContain(2);
ab.expect("object check", user).toHaveProperty("id");
ab.expect("length check", [1, 2, 3]).toHaveLength(3);
ab.expect("type check", user.id).toBeType("number");
ab.expect("exists check", user.id).toExist();
ab.expect("gt check", 20).toBeGreaterThan(10);
ab.expect("lt check", 10).toBeLessThan(50);
ab.expect("range check", 15).toBeBetween(10, 20);`;

const responseModeCode = `// Status
ab.expect("status check").status.toBe(200);
ab.expect("status ok").status.toBeOK();

// Body
ab.expect("body exact").body.toBe({ 
  success: true 
});
ab.expect("body prop").body.toHaveProperty("user.id");

// Headers
ab.expect("headers exists").headers.toHaveHeader("content-type");
ab.expect("headers type").headers.toHaveContentType("application/json");

// Cookies
ab.expect("cookie exists").cookies.toExistCookie("session");
ab.expect("cookie value").cookies.toBeCookie("session", "abc123");`;
</script>
