<script setup lang="ts">
import type { ProfileInterface } from "~/types/profile.types";
import type { ApiResponse } from "~~/server/types";

const { data, pending } = await useFetch<ApiResponse<ProfileInterface>>(
  "/api/v1/profile",
  {
    key: "my-profile",
  },
);
</script>

<template>
  <section class="max-w-4xl mx-auto">
    <ProfileUserDetailsSkeleton v-if="pending && !data?.data" />
    <template v-else-if="data && data.data && data.success">
      <ProfileTop :profile="data.data" />
      <ProfileTopThemes
        :themes="data.data.themes"
        :author="data.data.user_name"
      />
    </template>
  </section>
</template>
