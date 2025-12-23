<script setup lang="ts"></script>

<template>
  <UDashboardGroup>
    <DashboardSidebar />
    <section class="flex-1 flex-col">
      <DashboardNavbar />
      <main class="flex-1 min-h-0">
        <slot />
      </main>
    </section>
  </UDashboardGroup>
</template>
