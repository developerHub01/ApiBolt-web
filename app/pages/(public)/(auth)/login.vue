<template>
  <div
    class="relative flex flex-1 w-full flex-col items-center justify-center py-20 px-4 overflow-hidden"
  >
    <!-- Decorative Background Elements -->
    <div
      class="absolute top-1/4 -left-20 size-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none"
    ></div>
    <div
      class="absolute bottom-1/4 -right-20 size-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none"
    ></div>

    <Card
      class="w-full max-w-md bg-card/30 backdrop-blur-2xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] rounded-2xl px-6 md:p-12 flex flex-col items-center relative z-10"
    >
      <div class="mb-5 flex flex-col items-center text-center">
        <div
          class="size-16 rounded-2xl bg-linear-to-tr from-primary/20 to-transparent p-3 border border-white/10 mb-6 shadow-2xl"
        >
          <NuxtImg
            src="/logo.svg"
            class="size-full object-contain"
            alt="api-bolt logo"
          />
        </div>
        <h1
          class="text-3xl font-bold tracking-tight text-foreground"
        >
          Welcome back
        </h1>
        <p
          class="mt-3 text-muted-foreground text-base leading-relaxed max-w-[280px]"
        >
          Sign in to your account and continue your masterpiece.
        </p>
      </div>

      <Button
        @click="handleSignInWithGithub"
        class="flex h-14 w-full max-w-xs items-center justify-center gap-4 rounded-full bg-foreground text-background font-bold transition-all hover:bg-foreground/90 active:scale-[0.98] shadow-xl"
      >
        <NuxtImg
          src="/images/github.png"
          alt="github logo"
          class="size-6 invert dark:invert-0"
        />
        Continue with GitHub
      </Button>

      <div class="mt-4 pt-4 border-t border-white/5 w-full text-center">
        <NuxtLink to="/">
          <Button
            variant="link"
            class="text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            <ArrowLeft class="size-4 mr-2" />
            Back to home
          </Button>
        </NuxtLink>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import { Card } from "~/components/ui/card";
import { useAuth } from "~/composable/useUserAuth";
import { ArrowLeft } from "lucide-vue-next";

definePageMeta({
  middleware: ["prevent-if-auth"],
});

/* SEO ============= */
const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl as string;

const authTitle = "Sign in to APIBolt | Industrial API Testing Desktop App";
const authDescription =
  "Log in to your APIBolt account to manage your projects, themes, and accelerate your API development workflow with speed and privacy.";

useSeoMeta({
  title: authTitle,
  ogTitle: authTitle,
  description: authDescription,
  ogDescription: authDescription,
  ogImage: `${siteUrl}/og.png`,
  ogUrl: `${siteUrl}/login`,
  twitterTitle: authTitle,
  twitterDescription: authDescription,
  twitterImage: `${siteUrl}/og.png`,
  twitterCard: "summary_large_image",
});

const { handleSignInWithGithub } = useAuth();
</script>
