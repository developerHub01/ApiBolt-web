<template>
  <section
    v-for="(feature, index) in features"
    :key="feature.id"
    :class="[
      'min-h-screen flex items-center border-b border-border px-6 py-20',
      !(index % 2) ? 'bg-background' : 'bg-card/30',
    ]"
  >
    <div class="max-w-6xl mx-auto w-full">
      <div
        :class="[
          'grid grid-cols-1 md:grid-cols-2 gap-15 items-center',
          'md:grid-cols-2',
        ]"
      >
        <!-- Content -->
        <div :class="index % 2 ? 'md:order-2' : 'md:order-1'">
          <div class="mb-4">
            <span class="text-primary text-sm font-mono">
              [{{ String(feature.id).padStart(2, "0") }}]
            </span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            {{ feature.title }}
          </h2>
          <p class="text-lg text-muted-foreground mb-8 leading-relaxed">
            {{ feature.description }}
          </p>
        </div>

        <!-- Image Placeholder -->
        <div
          :class="[
            'aspect-video flex items-center justify-center px-3',
            index % 2 ? 'md:order-1' : 'md:order-2',
          ]"
        >
          <PublicHomePreviewSliders :images="feature.images" />
          <div class="text-center" v-if="false" v-for="image in feature.images">
            <div class="text-4xl text-primary mb-4 font-mono">
              {{ index % 2 ? "◀" : "▶" }}
            </div>
            <p class="text-muted-foreground text-sm">
              {{ image.alt }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Feature {
  id: number;
  title: string;
  description: string;
  images: Array<{
    alt: string;
    src: string;
  }>;
}

const features: Array<Feature> = [
  {
    id: 1,
    title: "Local Password Protection",
    description:
      "ApiBolt provides an optional local password lock that secures the entire application. All projects, requests, tokens, cookies, and configurations are blocked until the correct password is entered. Fully offline and self-contained.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 2,
    title: "Offline-First Architecture",
    description:
      "Every feature of ApiBolt works offline without requiring an account or cloud sync. Projects, requests, themes, and exports function entirely locally with zero telemetry.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 3,
    title: "Isolated Multi-Project System",
    description:
      "Each project operates in complete isolation. Cookies, environments, requests, and themes from one project never affect another, allowing parallel work safely.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 4,
    title: "Multiple Project Windows",
    description:
      "Open multiple projects simultaneously, each with its own independent window and workspace context, without shared state.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 5,
    title: "Request Collections & Folder Structure",
    description:
      "Organize API requests into folders and collections for clean, scalable project organization, ideal for large APIs or enterprise projects.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 6,
    title: "Advanced Tab Management",
    description:
      "Open each request in a tab. Switch between multiple requests without losing state, making testing fast and efficient.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 7,
    title: "Tab Session Persistence",
    description:
      "All open tabs and their states are restored after app restart. No context or work is lost between sessions.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 8,
    title: "HTTP Method Support",
    description:
      "Full support for GET, POST, PUT, PATCH, DELETE, OPTIONS, and HEAD requests for complete API testing.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 9,
    title: "Request Body Editor",
    description:
      "Raw request editor with adjustable font size and layout density. Handles JSON, text, and custom payloads comfortably.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 10,
    title: "Response Viewer",
    description:
      "Displays formatted responses with optional raw view. Font size and layout adjustable for readability.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 11,
    title: "Raw Response Inspection",
    description:
      "Inspect unformatted raw response data for debugging and protocol-level analysis.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 12,
    title: "Request Header Management",
    description:
      "Add, edit, enable, or disable individual request headers for precise control over API calls.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 13,
    title: "Response Header Viewer",
    description:
      "View all response headers returned by the server, including cookies, auth, caching, and transport metadata.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 14,
    title: "Cookie Management System",
    description:
      "Automatically captures and manages cookies per project. Manual editing and full CRUD operations are supported.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 15,
    title: "Environment Variables",
    description:
      "Supports variables that can only be injected into request parameters. Scoped per project and resolved at execution time.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 16,
    title: "Execution-Time Variable Resolution",
    description:
      "Variables and request data resolve during request execution, ensuring predictable and debuggable behavior.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 17,
    title: "Authentication Handling",
    description:
      "Supports API Key, Bearer, Basic, JWT, and no-auth modes, with project-level configuration and inheritance.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 18,
    title: "Automatic Code Snippet Generation",
    description:
      "Generates client code snippets in multiple languages based on the current request, including headers, parameters, and body.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 19,
    title: "Client Code Generator",
    description:
      "Generates full client request templates for different languages and frameworks based on request configuration.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 20,
    title: "Import System",
    description:
      "Import individual requests, folders, collections, or entire projects into the workspace without overwriting existing data.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 21,
    title: "Export System",
    description:
      "Export requests, folders, collections, or entire projects as local files for backup, sharing, or migration.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 22,
    title: "Folder Documentation Editor",
    description:
      "Write markdown-based notes for each folder to document API endpoints, workflows, or instructions.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 23,
    title: "Deep Layout Customization",
    description:
      "Resize and rearrange panels, adjust UI density, and configure panel visibility for a personalized workflow.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 24,
    title: "Independent Font Size Controls",
    description:
      "Adjust font size for request body editors and response viewers separately to enhance readability.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 25,
    title: "Custom Keyboard Shortcuts",
    description:
      "Every major action can have a custom keyboard shortcut, allowing personalized high-speed workflows.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 26,
    title: "Background Wallpaper Support",
    description:
      "Set custom wallpapers behind panels to personalize the workspace, similar to advanced code editor extensions.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 27,
    title: "Color-Based Theme Builder",
    description:
      "Strictly color customization for UI elements, request types, response states, and environment indicators. Typography and layout are unaffected.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 28,
    title: "Theme Marketplace",
    description:
      "Publish and download color themes from the integrated marketplace. Share visual styles across machines or teams.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 29,
    title: "Theme Isolation Per Project",
    description:
      "Themes applied in one project do not affect other projects, keeping visual separation intact.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 30,
    title: "Session Persistence",
    description:
      "All user settings, open tabs, layout, and project states are saved and restored across restarts.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
  {
    id: 31,
    title: "No Vendor Lock-In",
    description:
      "All project data is stored locally. Users have full export and backup options with zero cloud dependency.",
    images: [
      {
        alt: "api-bolt set local password",
        src: "/images/home/password/local-password-1.png",
      },
      {
        alt: "api-bolt change or disable local passowrd",
        src: "/images/home/password/local-password-2.png",
      },
      {
        alt: "api-bolt disable local password",
        src: "/images/home/password/local-password-3.png",
      },
      {
        alt: "api-bolt protection to modify or access local password",
        src: "/images/home/password/local-password-4.png",
      },
      {
        alt: "api-bolt local password to open the app",
        src: "/images/home/password/local-password-5.png",
      },
    ],
  },
];
</script>
