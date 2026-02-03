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
import SectionHeader from "@/components/public/common/SectionHeader.vue";
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
      "Secure your workspace with local password encryption. Your sensitive API data stays private and protected on your machine.",
    image: "/images/home/app-preview/password_protection.png",
    icon: Lock,
  },
  {
    id: 2,
    title: "Works Offline",
    description:
      "Experience complete freedom with a 100% offline-first architecture. No internet connection is required for any of your core workflows.",
    image: null,
    icon: WifiOff,
  },
  {
    id: 3,
    title: "Project Management",
    description:
      "Seamlessly toggle between multiple projects. Keep your API environments, headers, and collections perfectly isolated and organized.",
    image: "/images/home/app-preview/project_management.png",
    icon: FolderTree,
  },
  {
    id: 4,
    title: "Request Collections",
    description:
      "Build hierarchical structures with folders and collections. Organize thousands of requests into a workflow that makes sense for you.",
    image: "/images/home/app-preview/request_collections.png",
    icon: FolderTree,
  },
  {
    id: 5,
    title: "Tab Management",
    description:
      "Work on multiple requests simultaneously with a robust tab system. Effortlessly switch contexts without losing your progress.",
    image: "/images/home/app-preview/tab_management.png",
    icon: Layers,
  },
  {
    id: 6,
    title: "Session Persistence",
    description:
      "Never lose your place. Your entire workspace state—including open tabs and scroll positions—is automatically restored on launch.",
    image: null,
    icon: HardDrive,
  },
  {
    id: 7,
    title: "HTTP Methods",
    description:
      "Comprehensive support for all standard HTTP verbs, including GET, POST, PUT, DELETE, PATCH, and more for complete API interaction.",
    image: "/images/home/app-preview/http_methods.png",
    icon: Code2,
  },
  {
    id: 8,
    title: "Request Editor",
    description:
      "A sophisticated multi-mode editor for crafting precise payloads. Features intelligent syntax highlighting for JSON, XML, Form-data, Binary, and URL-encoded data.",
    image: "/images/home/app-preview/request_editor.png",
    icon: FileText,
  },
  {
    id: 9,
    title: "Response Viewer",
    description:
      "Examine API responses with beautiful syntax highlighting and pretty-printing. Toggle between JSON, HTML, and Preview modes.",
    image: "/images/home/app-preview/response_viewer.png",
    icon: Eye,
  },
  {
    id: 10,
    title: "Raw Response",
    description:
      "Dive into the raw byte-stream for deep debugging. Inspect exact server outputs without any formatting or processing.",
    image: "/images/home/app-preview/raw_response.png",
    icon: Code2,
  },
  {
    id: 11,
    title: "Header Management",
    description:
      "Fine-grained control over request headers. Easily toggle, bulk-edit, and manage custom headers for every request.",
    image: "/images/home/app-preview/header_management.png",
    icon: Settings,
  },
  {
    id: 12,
    title: "Response Headers",
    description:
      "Inspect deep metadata with a dedicated header viewer. Perfect for debugging CORS issues, cache policies, and server signatures.",
    image: "/images/home/app-preview/response_headers.png",
    icon: Eye,
  },
  {
    id: 13,
    title: "Request History",
    description:
      "A comprehensive log of every request sent. Quickly search, filter, and replay past interactions with full state recovery.",
    image: "/images/home/app-preview/request_history.png",
    icon: Eye,
  },
  {
    id: 14,
    title: "Cookie Management",
    description:
      "Automated cookie handling scoped to your projects. Inspect, edit, and clear cookies with an intuitive management interface.",
    image: "/images/home/app-preview/cookie_management.png",
    icon: Cookie,
  },
  {
    id: 15,
    title: "Environment Variables",
    description:
      "Dynamically inject values into your requests. Use project-scoped variables for URLs, tokens, and sensitive keys.",
    image: "/images/home/app-preview/environment_variables.png",
    icon: Variable,
  },
  {
    id: 16,
    title: "Variable Resolution",
    description:
      "Real-time variable resolution with hover previews. Ensure your payloads are correct before hitting the send button.",
    image: "/images/home/app-preview/variable_resolution.png",
    icon: Variable,
  },
  {
    id: 17,
    title: "Authentication",
    description:
      "Built-in support for essential authentication protocols. Effortlessly configure Basic Auth, Bearer Tokens, JWT, and API Keys for secure requests.",
    image: "/images/home/app-preview/authentication.png",
    icon: Key,
  },
  {
    id: 18,
    title: "Code Generation",
    description:
      "Generate production-ready code snippets in 38+ languages and frameworks. Instantly export your requests for Fetch, Axios, cURL, and beyond.",
    image: "/images/home/app-preview/code_generation.png",
    icon: Code2,
  },
  {
    id: 19,
    title: "Import System",
    description:
      "Seamlessly migrate your workflow by importing full projects, folders, or individual requests. Sync data from other devices or shared team resources with ease.",
    image: null,
    icon: Download,
  },
  {
    id: 20,
    title: "Export System",
    description:
      "Prioritize portability with deep export options. Save your projects, folders, or requests into open formats for effortless backup, sharing, and version control.",
    image: null,
    icon: Upload,
  },
  {
    id: 21,
    title: "Documentation",
    description:
      "Rich Markdown support for every collection. Document your API's behavior, edge cases, and usage examples right where they live.",
    image: "/images/home/app-preview/documentation.png",
    icon: FileText,
  },
  {
    id: 22,
    title: "Layout Customization",
    description:
      "Tailor the workspace to your exact needs with a flexible interface. Customize your panels and sidebars with a fluid, VS Code-inspired layout.",
    image: "/images/home/app-preview/layout_customization.png",
    icon: Settings,
  },
  {
    id: 23,
    title: "Font Controls",
    description:
      "Optimized for visual comfort. Take full control over typography with independent font sizes and indentation settings for the editor and viewers.",
    image: "/images/home/app-preview/font_controls.png",
    icon: Settings,
  },
  {
    id: 24,
    title: "Keyboard Shortcuts",
    description:
      "Become a power user with customizable keybindings. Map every action to your favorite shortcuts for a mouse-free workflow.",
    image: "/images/home/app-preview/keyboard_shortcuts.png",
    icon: Keyboard,
  },
  {
    id: 25,
    title: "Custom Wallpapers",
    description:
      "Make your workspace your own by personalizing your environment. Choose from high-quality wallpapers to create a development atmosphere that feels like home.",
    image: "/images/home/app-preview/custom_wallpapers.png",
    icon: ImageIcon,
  },
  {
    id: 26,
    title: "Theme Builder",
    description:
      "Design your perfect development aesthetic. Our powerful theme engine gives you the freedom to customize every color across the entire application interface.",
    image: "/images/home/app-preview/theme_builder.png",
    icon: Palette,
  },
  {
    id: 27,
    title: "Theme Marketplace",
    description:
      "Explore a world of community-created styles. Browse, preview, and apply premium themes with a single click.",
    image: "/images/home/app-preview/theme_marketplace.png",
    icon: Palette,
  },
  {
    id: 28,
    title: "Project Themes",
    description:
      "Visual separation for mental clarity. Assign unique themes to different projects to avoid sending requests to the wrong environment.",
    image: "/images/home/app-preview/project_themes.png",
    icon: Palette,
  },
  {
    id: 29,
    title: "Auto-Save",
    description:
      "Peace of mind by default. Every change you make is instantly committed to local storage, ensuring zero data loss.",
    image: null,
    icon: HardDrive,
  },
  {
    id: 30,
    title: "No Lock-In",
    description:
      "Your data belongs to you. We believe in open standards and provide simple tools to take your data anywhere, anytime.",
    image: null,
    icon: Download,
  },
];
</script>
