<template>
  <section
    class="py-32 px-6 bg-linear-to-b from-background to-muted/20 overflow-hidden"
  >
    <div class="container mx-auto">
      <!-- Section header -->
      <SectionHeader
        title="Power-Packed Features"
        description="Every tool you need to master your API workflow"
        class="text-center"
      />

      <!-- Features grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="feature in features"
          :key="feature.id"
          class="feature-card group relative flex flex-col gap-4 rounded-xl border-2 border-white/10 bg-card/40 backdrop-blur-md overflow-hidden hover:border-primary/30 transition-colors duration-500 opacity-0 p-5"
          @mousemove="handleMouseMove"
        >
          <div
            class="absolute w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-[-50%] translate-y-[-50%] left-(--mouse-x) top-(--mouse-y) z-0"
          />
          <AspectRatio
            :ratio="16 / 9"
            class="relative w-full rounded-lg overflow-hidden bg-muted/20 border-2 border-white/5 z-10"
          >
            <template v-if="feature.image">
              <NuxtImg
                :src="feature.image"
                :alt="feature.title"
                class="w-full h-full object-cover transition-all duration-700 ease-out"
                loading="lazy"
              />
            </template>
            <div
              v-else
              class="w-full h-full flex items-center justify-center bg-muted transition-colors duration-500"
            >
              <component
                :is="feature.icon"
                class="w-12 h-12 text-muted-foreground/50 group-hover:text-primary group-hover:scale-110 transition-all duration-500"
              />
            </div>
          </AspectRatio>

          <div class="relative flex-1 flex flex-col z-10">
            <div
              class="mb-4 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
            >
              <component :is="feature.icon" class="w-5 h-5" />
            </div>
            <h3
              class="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300"
            >
              {{ feature.title }}
            </h3>
            <p class="text-muted-foreground leading-relaxed text-sm">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  Lock,
  FolderTree,
  Layers,
  Code2,
  Eye,
  FileText,
  Cookie,
  Variable,
  Key,
  Download,
  Upload,
  Palette,
  Keyboard,
  Image as ImageIcon,
  Settings,
  HardDrive,
  WifiOff,
} from "lucide-vue-next";
import SectionHeader from "@/components/public/home/SectionHeader.vue";
import type { HomeFeatureInterface } from "~/types/public.types";

const handleMouseMove = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  target.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
  target.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
};

onMounted(() => {
  const { $gsap, $ScrollTrigger } = useNuxtApp();

  if ($gsap && $ScrollTrigger) {
    // Individual Card Animations using Batch
    $ScrollTrigger.batch(".feature-card", {
      onEnter: (elements) => {
        $gsap.fromTo(
          elements,
          {
            autoAlpha: 0,
            y: 60,
            scale: 0.9,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true,
          },
        );
      },
      onLeave: (elements) => {
        $gsap.to(elements, {
          autoAlpha: 0,
          y: -60,
          scale: 0.9,
          stagger: 0.05,
          duration: 0.6,
          ease: "power2.in",
          overwrite: true,
        });
      },
      onEnterBack: (elements) => {
        $gsap.to(elements, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          overwrite: true,
        });
      },
      onLeaveBack: (elements) => {
        $gsap.to(elements, {
          autoAlpha: 0,
          y: 60,
          scale: 0.9,
          stagger: 0.05,
          duration: 0.6,
          ease: "power2.in",
          overwrite: true,
        });
      },
      start: "top 85%",
      end: "bottom 15%",
    });
  }
});

const features: Array<HomeFeatureInterface> = [
  {
    id: 1,
    title: "Password Protection",
    description:
      "Secure your app with local password protection. All data stays encrypted on your machine.",
    image: "/images/home/app-preview/password_protection.png",
    icon: Lock,
  },
  {
    id: 2,
    title: "Works Offline",
    description:
      "No internet required. Everything runs locally on your desktop.",
    image: null,
    icon: WifiOff,
  },
  {
    id: 3,
    title: "Project Management",
    description:
      "Organize your work into separate projects. Each project is completely isolated.",
    image: "/images/home/app-preview/project_management.png",
    icon: FolderTree,
  },
  {
    id: 4,
    title: "Request Collections",
    description:
      "Group related requests into folders and collections for better organization.",
    image: "/images/home/app-preview/request_collections.png",
    icon: FolderTree,
  },
  {
    id: 5,
    title: "Tab Management",
    description:
      "Open multiple requests in tabs. Switch between them without losing your work.",
    image: "/images/home/app-preview/tab_management.png",
    icon: Layers,
  },
  {
    id: 6,
    title: "Session Persistence",
    description:
      "Your tabs and work are saved automatically. Pick up right where you left off.",
    image: null,
    icon: HardDrive,
  },
  {
    id: 7,
    title: "HTTP Methods",
    description: "Full support for GET, POST, PUT, PATCH, DELETE requests.",
    image: "/images/home/app-preview/http_methods.png",
    icon: Code2,
  },
  {
    id: 8,
    title: "Request Editor",
    description:
      "Clean editor for request bodies. Supports JSON, text, and custom payloads.",
    image: "/images/home/app-preview/request_editor.png",
    icon: FileText,
  },
  {
    id: 9,
    title: "Response Viewer",
    description:
      "View formatted or raw responses. Adjust font size for better readability.",
    image: "/images/home/app-preview/response_viewer.png",
    icon: Eye,
  },
  {
    id: 10,
    title: "Raw Response",
    description: "Inspect unformatted response data for debugging.",
    image: "/images/home/app-preview/raw_response.png",
    icon: Code2,
  },
  {
    id: 11,
    title: "Header Management",
    description: "Add, edit, or disable request headers with full control.",
    image: "/images/home/app-preview/header_management.png",
    icon: Settings,
  },
  {
    id: 12,
    title: "Response Headers",
    description:
      "View all headers returned by the server including cookies and metadata.",
    image: "/images/home/app-preview/response_headers.png",
    icon: Eye,
  },
  {
    id: 13,
    title: "Request History",
    description:
      "View all headers returned by the server including cookies and metadata.",
    image: "/images/home/app-preview/request_history.png",
    icon: Eye,
  },
  {
    id: 14,
    title: "Cookie Management",
    description: "Automatically captures and manages cookies per project.",
    image: "/images/home/app-preview/cookie_management.png",
    icon: Cookie,
  },
  {
    id: 15,
    title: "Environment Variables",
    description: "Use variables in your requests. Scoped per project.",
    image: "/images/home/app-preview/environment_variables.png",
    icon: Variable,
  },
  {
    id: 16,
    title: "Variable Resolution",
    description:
      "Variables resolve when you send the request for predictable behavior.",
    image: "/images/home/app-preview/variable_resolution.png",
    icon: Variable,
  },
  {
    id: 17,
    title: "Authentication",
    description: "Supports API Key, Bearer, Basic, JWT, and no-auth modes.",
    image: "/images/home/app-preview/authentication.png",
    icon: Key,
  },
  {
    id: 18,
    title: "Code Generation",
    description:
      "Generate code snippets in multiple languages from your requests.",
    image: "/images/home/app-preview/code_generation.png",
    icon: Code2,
  },
  {
    id: 19,
    title: "Import System",
    description:
      "Import requests, folders, or entire projects without overwriting data.",
    image: null,
    icon: Download,
  },
  {
    id: 20,
    title: "Export System",
    description: "Export your work as files for backup or sharing.",
    image: null,
    icon: Upload,
  },
  {
    id: 21,
    title: "Documentation",
    description: "Write markdown notes for each folder to document your APIs.",
    image: "/images/home/app-preview/documentation.png",
    icon: FileText,
  },
  {
    id: 22,
    title: "Layout Customization",
    description: "Resize panels and adjust UI density to match your workflow.",
    image: "/images/home/app-preview/layout_customization.png",
    icon: Settings,
  },
  {
    id: 23,
    title: "Font Controls",
    description: "Adjust font size separately for editors and viewers.",
    image: "/images/home/app-preview/font_controls.png",
    icon: Settings,
  },
  {
    id: 24,
    title: "Keyboard Shortcuts",
    description: "Customize shortcuts for every action to work faster.",
    image: "/images/home/app-preview/keyboard_shortcuts.png",
    icon: Keyboard,
  },
  {
    id: 25,
    title: "Custom Wallpapers",
    description: "Set background images to personalize your workspace.",
    image: "/images/home/app-preview/custom_wallpapers.png",
    icon: ImageIcon,
  },
  {
    id: 26,
    title: "Theme Builder",
    description: "Customize colors for every UI element.",
    image: "/images/home/app-preview/theme_builder.png",
    icon: Palette,
  },
  {
    id: 27,
    title: "Theme Marketplace",
    description: "Download and share color themes with other users.",
    image: "/images/home/app-preview/theme_marketplace.png",
    icon: Palette,
  },
  {
    id: 28,
    title: "Project Themes",
    description: "Different themes for different projects.",
    image: "/images/home/app-preview/project_themes.png",
    icon: Palette,
  },
  {
    id: 29,
    title: "Auto-Save",
    description: "All settings and states are saved automatically.",
    image: null,
    icon: HardDrive,
  },
  {
    id: 30,
    title: "No Lock-In",
    description: "Your data is yours. Export everything anytime.",
    image: null,
    icon: Download,
  },
];
</script>
