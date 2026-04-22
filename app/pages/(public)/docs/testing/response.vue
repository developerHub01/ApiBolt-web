<template>
  <section
    class="flex flex-col gap-8 w-full animate-in slide-in-from-bottom-2 fade-in duration-300"
  >
    <div class="mb-4">
      <h1
        class="text-3xl font-bold tracking-tight text-foreground font-display mb-4"
      >
        Response Object
      </h1>
      <p class="text-lg text-muted-foreground leading-relaxed mt-4">
        A read-only snapshot of the API response. Access it directly via
        <code
          class="px-1.5 py-0.5 rounded-md bg-muted border border-border text-foreground font-mono text-sm"
          >ab.response</code
        >
        to build advanced conditional tests on the raw HTTP payload.
      </p>
    </div>

    <div class="mt-4 flex flex-col gap-4">
      <h2
        class="text-2xl font-semibold text-foreground border-b border-border pb-2"
      >
        Accessing Response
      </h2>
      <ul class="list-disc pl-6 space-y-2 text-muted-foreground text-base mb-4">
        <li>
          <code
            class="px-1.5 py-0.5 rounded-md bg-muted border border-border text-foreground font-mono"
            >ab.response</code
          >
          &mdash; A read-only snapshot of the API response object.
        </li>
      </ul>
      <PublicCommonCodeBlock lang="ts" :code="responseAccessCode" />
    </div>

    <div class="mt-8 flex flex-col gap-4">
      <h2
        class="text-2xl font-semibold text-foreground border-b border-border pb-2"
      >
        The Response Interface
      </h2>
      <p class="text-muted-foreground mb-4">
        The response exposes the exact standard properties returned from the
        ApiBolt runner:
      </p>
      <PublicCommonCodeBlock lang="ts" :code="responseInterfaceCode" />
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Response Object",
});

const responseAccessCode = `const res = ab.response;

// Read the native status code
if (res.status === 201) {
  ab.expect("Created Successfully").toBeOK();
}

// Read the native body payload directly
const totalCount = res.body.metadata.total;
if (totalCount > 100) {
  ab.print("High traffic detected", totalCount);
}

// Read native headers
const isJson = res.headers["content-type"]?.includes("application/json");`;

const responseInterfaceCode = `export interface ResponseInterface {
  body: unknown;
  headers: Record<string, unknown>;
  cookies?: Array<CookieInterface>;
  status: number;
  statusText: string;
  statusDescription?: string;
  requestSize: RequestResponseSizeInterface;
  responseSize: RequestResponseSizeInterface;
}

export interface CookieInterface {
  key: string;
  value: string;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  hostOnly?: boolean;
  maxAge?: number | null;
  expires?: string | null;
  sameSite?: "lax" | "strict" | "none";
  creation?: string;
  lastAccessed?: string;
}

export interface RequestResponseSizeInterface {
  header: number;
  body: number;
}`;
</script>
