<template>
  <div class="flex flex-1 w-full flex-col items-center justify-center py-12">
    <Card
      class="w-full max-w-100 h-full max-h-120 rounded-lg p-8 shadow-xl flex flex-col justify-center items-center"
    >
      <div class="mb-8 flex flex-col items-center text-center">
        <NuxtImg
          src="/logo.svg"
          class="size-12 object-contain mb-4 shadow-2xl"
          alt="api-bolt login"
        />
        <h1 class="text-2xl font-bold tracking-tight text-foreground">
          APIBolt
        </h1>
        <p class="mt-1 text-sm text-muted-foreground">
          Sign in to your dashboard
        </p>
      </div>
      <Button
        @click="handleSignInWithGithub"
        class="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-white font-bold text-black transition-all hover:bg-zinc-200 active:scale-[0.98]"
      >
        <NuxtImg
          src="/images/github.png"
          alt="api-bolt github login"
          :width="25"
          :height="25"
        />
        Continue with GitHub
      </Button>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import { Card } from "~/components/ui/card";
import { useAuth } from "~/composable/useUserAuth";

definePageMeta({
  middleware: ["prevent-if-auth"],
});
/* SEO ============= */
const authTitle = "Sign in to APIBolt";
const authDescription =
  "Log in to your APIBolt account to manage your themes and accelerate your workflow.";
  
useSeoMeta({
  title: authTitle,
  ogTitle: authTitle,
  description: authDescription,
  ogDescription: authDescription,
  ogImage: "/logo.svg",
  twitterCard: "summary",
});

const { handleSignInWithGithub } = useAuth();
</script>
