<template>
  <section
    class="py-32 px-6 border-t bg-linear-to-b from-muted/20 to-background relative"
  >
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50"
    />
    <div class="container mx-auto text-center">
      <SectionHeader
        title="Ready to get started?"
        description="Download ApiBolt for free. No account, no credit card, no tracking."
      />

      <!-- Download buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
        <button
          v-for="{ id, label, icon } in downloadButtons"
          :key="id"
          class="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <component
            :is="icon"
            class="w-5 h-5 group-hover:translate-y-0.5 transition-transform"
          />
          {{ label }}
        </button>
      </div>

      <!-- Quick links -->
      <div
        class="flex flex-wrap justify-center gap-8 pt-8 border-t border-border/50"
      >
        <NuxtLink
          v-for="{ id, label, url, icon } in socialLinks"
          :key="id"
          :to="url"
          target="_blank"
          class="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <component
            :is="icon"
            class="w-5 h-5 group-hover:scale-110 transition-transform"
          />
          <span class="font-medium">{{ label }}</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Download, Github, User } from "lucide-vue-next";
import SectionHeader from "@/components/public/home/SectionHeader.vue";

const downloadButtons = [
  {
    id: "windows-download",
    label: "Download for Windows",
    icon: Download,
  },
  {
    id: "linux-download",
    label: "Download for Linux",
    icon: Download,
  },
];

const socialLinks = [
  {
    id: "developer-profile",
    label: "Developer",
    url: "https://github.com/developerHub01",
    icon: User,
  },
  {
    id: "github-repo",
    label: "View on GitHub",
    url: "https://github.com/developerHub01/ApiBolt",
    icon: Github,
  },
];
</script>
