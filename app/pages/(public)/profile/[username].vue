<script setup lang="ts">
import type { ProfileInterface } from "~/types/profile.types";
import type { ApiResponse } from "~~/server/types";

const route = useRoute();
const userName = computed(() => route.params["username"] as string);

const { data, pending } = await useFetch<ApiResponse<ProfileInterface>>(
  `/api/v1/profile/${userName.value}`,
  {
    key: `${userName.value}-profile`,
  },
);
</script>

<template>
  <section class="w-full max-w-4xl mx-auto">
    <ProfileUserDetailsSkeleton v-if="pending && !data?.data" />
    <template v-else-if="data && data.data && data.success">
      <ProfileTop :profile="data.data" class="py-4" />
      <ProfileAllThemesByUserName />
    </template>
  </section>
</template>
