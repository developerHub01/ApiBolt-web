<script setup>
const { data pending } = await useFetch("/api/v1/profile", {
  key: "my-profile",
});
</script>

<template>
  <ProfileUserDetailsSkeleton v-if="pending && !data?.data" />
  <ProfileTop
    v-else-if="data && data.data && data.success"
    :profile="data.data"
  />
</template>
