<template>
  <section
    class="relative flex-1 py-12 flex justify-center items-center overflow-hidden"
  >
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10"
    ></div>
    <div
      class="absolute top-1/4 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-[100px] -z-10"
    ></div>

    <div class="w-full max-w-2xl flex flex-col text-center px-4">
      <div class="relative inline-block mx-auto mb-8">
        <h1
          class="text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter flex justify-center items-center select-none text-foreground/90 tabular-nums"
        >
          4<span
            class="text-primary relative transform rotate-12 inline-block drop-shadow-[0_0_35px_rgba(213,194,144,0.3)]"
            >0</span
          >4
        </h1>
        <div
          class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent blur-sm"
        ></div>
      </div>

      <h2
        class="text-2xl md:text-3xl font-bold mb-4 bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-transparent"
      >
        Lost in Outer Space?
      </h2>

      <p
        class="text-base md:text-lg leading-relaxed text-muted-foreground/80 max-w-md mx-auto mb-10"
      >
        {{
          description ||
          "The page you're searching for seems to have vanished into the digital void. Let's get you back on track."
        }}
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <NuxtLink to="/">
          <Button
            size="lg"
            class="px-8 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
          >
            Return to Home
          </Button>
        </NuxtLink>
        <Button
          variant="ghost"
          size="lg"
          @click="$router.back()"
          class="text-muted-foreground hover:text-foreground"
        >
          Go Back
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  description?: string;
}

withDefaults(defineProps<Props>(), {
  description:
    "The page you're searching for seems to have vanished into the digital void. Let's get you back on track.",
});
</script>

<style scoped>
h1 {
  font-family: var(--font-display, sans-serif);
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}
</style>
