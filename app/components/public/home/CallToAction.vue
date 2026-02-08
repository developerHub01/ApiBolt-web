<template>
  <section
    class="py-32 px-6 border-t bg-linear-to-b from-muted/20 to-background relative"
  >
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50"
    />
    <div class="container mx-auto text-center">
      <SectionHeader class="text-center">
        <template #title>Ready to get started? </template>
        <template #description>
          Download ApiBolt for free. No account, no credit card, no tracking.
        </template>
      </SectionHeader>

      <!-- Download buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
        <NuxtLink
          v-for="{ id, label, icon, href, isDownloadable } in downloadButtons"
          :key="id"
          :to="href"
          :target="isDownloadable ? `_self` : `_blank`"
          :download="isDownloadable"
        >
          <button
            class="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <template v-if="icon">
              <component
                :is="icon"
                class="w-5 h-5 group-hover:translate-y-0.5 transition-transform"
              />
            </template>
            {{ label }}
          </button>
        </NuxtLink>
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
import SectionHeader from "@/components/public/common/SectionHeader.vue";

const downloadButtons = [
  {
    id: "windows-download",
    label: "Download for Windows",
    icon: Download,
    href: "https://github.com/developerHub01/ApiBolt/releases/latest/download/api-bolt-setup.exe",
    isDownloadable: true,
  },
  {
    id: "all-release",
    label: "View All Releases",
    href: "https://github.com/developerHub01/ApiBolt/releases",
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
