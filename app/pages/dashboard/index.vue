<script setup lang="ts">
const { data, pending } = await useFetch("/api/v1/profile", {
  key: "my-profile",
});

console.log({
  data: data.value,
});
</script>

<template>
  <section>
    <ProfileUserDetailsSkeleton v-if="pending && !data?.data" />
    <ProfileTop
      v-else-if="data && data.data && data.success"
      :profile="data.data"
    />
  </section>
</template>
