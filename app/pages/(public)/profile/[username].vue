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

<script setup lang="ts">
import NotFound from "~/components/ui/not-found/NotFound.vue";
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

/* SEO ====================== */
const seoTitle = computed(() => {
  if (pending.value) return "Loading profile...";
  return data.value?.data?.user_name
    ? `${data.value.data.user_name} user profile`
    : "User profile not found";
});

const seoDescription = computed(() => {
  if (pending.value) return "Loading... - APIBolt";
  return data.value?.data?.user_name
    ? `${data.value.data.user_name} user profile, with full name ${data.value.data.full_name} - APIBolt.`
    : "Following user profile not found - APIBolt.";
});
const seoImage = computed(() => data.value?.data?.avatar_url || "/logo.svg");

useHead({
  title: seoTitle,
  meta: [
    { name: "description", content: seoDescription },
    { property: "og:title", content: seoTitle },
    { property: "og:description", content: seoDescription },
    { property: "og:image", content: seoImage },
    { property: "og:type", content: "website" },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: seoTitle },
    { name: "twitter:image", content: seoImage },
  ],
});
</script>
