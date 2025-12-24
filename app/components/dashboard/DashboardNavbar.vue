<script setup lang="ts"></script>

<template>
  <UDashboardNavbar>
    <template #leading>
      <UDashboardSidebarCollapse />
    </template>

    <template #right>
      <NuxtLink href="/dashboard/profile">
        <UAvatar src="https://github.com/benjamincanac.png" />
      </NuxtLink>
    </template>
  </UDashboardNavbar>
</template>
