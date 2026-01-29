<script setup lang="ts">
import NotFound from "~/components/ui/NotFound.vue";
import type { ProfileInterface } from "~/types/profile.types";
import type { ApiResponse } from "~~/server/types";

const route = useRoute();
const userName = computed(() => route.params["username"] as string);

const { data, pending, error } = await useFetch<ApiResponse<ProfileInterface>>(
  () => `/api/v1/profile/${userName.value}`,
  {
    key: `profile-${userName.value}`,
  },
);

const isNotFound = computed(
  () => error.value || data.value?.success === false || !data.value?.data,
);
</script>

<template>
  <section class="w-full container mx-auto flex flex-col">
    <ProfileUserDetailsSkeleton v-if="pending" />
    <NotFound
      v-else-if="isNotFound"
      :description="`User ${userName} not found`"
      class="flex-1"
    />
    <template v-else>
      <ProfileTop :profile="data!.data!" class="py-4" />
      <ProfileAllThemesByUserName :username="userName" />
    </template>
  </section>
</template>
