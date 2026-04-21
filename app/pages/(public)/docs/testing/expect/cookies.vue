<template>
  <section class="flex flex-col gap-8 w-full">
    <div class="mb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-foreground font-display mb-4"
      >
        Cookies Assertions (Expect API)
      </h1>
      <p class="text-base text-muted-foreground leading-relaxed">
        Verify Set-Cookie boundaries directly from the generic
        <code class="bg-muted px-1.5 py-0.5 rounded font-mono text-xs"
          >expect()</code
        >
        root sequence.
      </p>
    </div>

    <div class="flex flex-col gap-6">
      <h2
        class="text-xl font-semibold text-foreground border-b border-border pb-2"
      >
        Available Matchers
      </h2>

      <div class="space-y-6">
        <div>
          <h3 class="font-mono text-sm font-semibold text-primary mb-1">
            toExistCookie(key)
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Validates that a cookie with the specified name key was set during
            the response cycle.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('Session Issued').cookies.toExistCookie('session');`"
          />
        </div>

        <div>
          <h3 class="font-mono text-sm font-semibold text-primary mb-1">
            toBeCookie(key, exactValue)
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Asserts the retrieved cookie value strictly equals the provided
            literal.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('Flags match').cookies.toBeCookie('session', 'abc123');`"
          />
        </div>
        
        <div>
          <h3 class="font-mono text-sm font-semibold text-primary mb-1">
            toHaveLength(count)
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Asserts the count of cookies received.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('cookie count').cookies.toHaveLength(1);`"
          />
        </div>
        
        <div>
          <h3 class="font-mono text-sm font-semibold text-primary mb-1">
            Security Validations
          </h3>
          <p class="text-sm text-muted-foreground mb-3">
            Asserts security flags on the cookies.
          </p>
          <PublicCommonCodeBlock
            lang="ts"
            :code="`ab.expect('secure check').cookies.toBeSecure();\nab.expect('httpOnly check').cookies.toBeHttpOnly();\nab.expect('sameSite check').cookies.toBeSameSite('strict');`"
          />
        </div>

        <div class="p-4 rounded-lg bg-muted text-sm text-muted-foreground mt-4">
          Looking for deep security audits of specific cookies like
          <code class="font-mono font-medium">toHaveDomain()</code>? Drop down
          to the
          <NuxtLink
            to="/docs/testing/classic/cookies"
            class="text-primary hover:underline font-semibold"
            >Classic Cookies API</NuxtLink
          >
          which provides exhaustive attributes testing.
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
useSeoMeta({
  title: "Expect API - Cookies",
});
</script>
