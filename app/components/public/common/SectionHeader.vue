<template>
  <div class="mb-12 text-center max-w-xl mx-auto">
    <h2
      class="text-3xl sm:text-5xl md:text-6xl font-bold font-brand pb-3 sm:pb-4 md:pb-6 from-foreground to-foreground/70"
    >
      <slot name="title" />
    </h2>
    <p
      class="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
    >
      <slot name="description" />
    </p>
  </div>
</template>
