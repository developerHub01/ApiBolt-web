<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import { useAuth } from "~/composable/userAuth";

definePageMeta({
  middleware: ["prevent-if-auth"],
});

const { supabase, handleSignInWithGithub } = useAuth();
</script>

<template>
  <section class="p-10">
    <h1>Login</h1>
    <Button @click="handleSignInWithGithub">Login with github</Button>
  </section>
</template>
