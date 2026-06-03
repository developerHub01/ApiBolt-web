"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
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
  X,
  FlaskConical,
} from "lucide-react";
import { HomeFeatureInterface } from "@/types/public.types";
import SpotlightEffectCard from "@/components/app/common/SpotlightEffectCard";
import SectionHeader from "@/components/app/common/SectionHeader";

const features: Array<HomeFeatureInterface> = [
  {
    id: 1,
    title: "Password Protection",
    description:
      "Secure your workspace with local password encryption. Your sensitive API data stays private and protected on your machine.",
    thumbnail: "/images/home/app-thumbnail/password_protection.png",
    image: "/images/home/app-preview/password_protection.png",
    Icon: Lock,
  },
  {
    id: 2,
    title: "Works Offline",
    description:
      "Experience complete freedom with a 100% offline-first architecture. No internet connection is required for any of your core workflows.",
    thumbnail: null,
    image: null,
    Icon: WifiOff,
  },
  {
    id: 3,
    title: "Project Management",
    description:
      "Seamlessly toggle between multiple projects. Keep your API environments, headers, and collections perfectly isolated and organized.",
    thumbnail: "/images/home/app-thumbnail/project_management.png",
    image: "/images/home/app-preview/project_management.png",
    Icon: FolderTree,
  },
  {
    id: 4,
    title: "Request Collections",
    description:
      "Build hierarchical structures with folders and collections. Organize thousands of requests into a workflow that makes sense for you.",
    thumbnail: "/images/home/app-thumbnail/request_collections.png",
    image: "/images/home/app-preview/request_collections.png",
    Icon: FolderTree,
  },
  {
    id: 5,
    title: "Tab Management",
    description:
      "Work on multiple requests simultaneously with a robust tab system. Effortlessly switch contexts without losing your progress.",
    thumbnail: "/images/home/app-thumbnail/tab_management.png",
    image: "/images/home/app-preview/tab_management.png",
    Icon: Layers,
  },
  {
    id: 6,
    title: "Session Persistence",
    description:
      "Never lose your place. Your entire workspace state—including open tabs and scroll positions—is automatically restored on launch.",
    thumbnail: null,
    image: null,
    Icon: HardDrive,
  },
  {
    id: 7,
    title: "HTTP Methods",
    description:
      "Comprehensive support for all standard HTTP verbs, including GET, POST, PUT, DELETE, PATCH, and more for complete API interaction.",
    thumbnail: "/images/home/app-thumbnail/http_methods.png",
    image: "/images/home/app-preview/http_methods.png",
    Icon: Code2,
  },
  {
    id: 8,
    title: "Request Editor",
    description:
      "A sophisticated multi-mode editor for crafting precise payloads. Features intelligent syntax highlighting for JSON, XML, Form-data, Binary, and URL-encoded data.",
    thumbnail: "/images/home/app-thumbnail/request_editor.png",
    image: "/images/home/app-preview/request_editor.png",
    Icon: FileText,
  },
  {
    id: 9,
    title: "Response Viewer",
    description:
      "Examine API responses with beautiful syntax highlighting and pretty-printing. Toggle between JSON, HTML, and Preview modes.",
    thumbnail: "/images/home/app-thumbnail/response_viewer.png",
    image: "/images/home/app-preview/response_viewer.png",
    Icon: Eye,
  },
  {
    id: 10,
    title: "Raw Response",
    description:
      "Dive into the raw byte-stream for deep debugging. Inspect exact server outputs without any formatting or processing.",
    thumbnail: "/images/home/app-thumbnail/raw_response.png",
    image: "/images/home/app-preview/raw_response.png",
    Icon: Code2,
  },
  {
    id: 11,
    title: "Header Management",
    description:
      "Fine-grained control over request headers. Easily toggle, bulk-edit, and manage custom headers for every request.",
    thumbnail: "/images/home/app-thumbnail/header_management.png",
    image: "/images/home/app-preview/header_management.png",
    Icon: Settings,
  },
  {
    id: 12,
    title: "Response Headers",
    description:
      "Inspect deep metadata with a dedicated header viewer. Perfect for debugging CORS issues, cache policies, and server signatures.",
    thumbnail: "/images/home/app-thumbnail/response_headers.png",
    image: "/images/home/app-preview/response_headers.png",
    Icon: Eye,
  },
  {
    id: 13,
    title: "Request History",
    description:
      "A comprehensive log of every request sent. Quickly search, filter, and replay past interactions with full state recovery.",
    thumbnail: "/images/home/app-thumbnail/request_history.png",
    image: "/images/home/app-preview/request_history.png",
    Icon: Eye,
  },
  {
    id: 14,
    title: "Cookie Management",
    description:
      "Automated cookie handling scoped to your projects. Inspect, edit, and clear cookies with an intuitive management interface.",
    thumbnail: "/images/home/app-thumbnail/cookie_management.png",
    image: "/images/home/app-preview/cookie_management.png",
    Icon: Cookie,
  },
  {
    id: 15,
    title: "Environment Variables",
    description:
      "Dynamically inject values into your requests. Use project-scoped variables for URLs, tokens, and sensitive keys.",
    thumbnail: "/images/home/app-thumbnail/environment_variables.png",
    image: "/images/home/app-preview/environment_variables.png",
    Icon: Variable,
  },
  {
    id: 16,
    title: "Variable Resolution",
    description:
      "Real-time variable resolution with hover previews. Ensure your payloads are correct before hitting the send button.",
    thumbnail: "/images/home/app-thumbnail/variable_resolution.png",
    image: "/images/home/app-preview/variable_resolution.png",
    Icon: Variable,
  },
  {
    id: 17,
    title: "Authentication",
    description:
      "Built-in support for essential authentication protocols. Effortlessly configure Basic Auth, Bearer Tokens, JWT, and API Keys for secure requests.",
    thumbnail: "/images/home/app-thumbnail/authentication.png",
    image: "/images/home/app-preview/authentication.png",
    Icon: Key,
  },
  {
    id: 18,
    title: "Code Generation",
    description:
      "Generate production-ready code snippets in 38+ languages and frameworks. Instantly export your requests for Fetch, Axios, cURL, and beyond.",
    thumbnail: "/images/home/app-thumbnail/code_generation.png",
    image: "/images/home/app-preview/code_generation.png",
    Icon: Code2,
  },
  {
    id: 19,
    title: "Documentation",
    description:
      "Rich Markdown support for every collection. Document your API's behavior, edge cases, and usage examples right where they live.",
    thumbnail: "/images/home/app-thumbnail/documentation.png",
    image: "/images/home/app-preview/documentation.png",
    Icon: FileText,
  },
  {
    id: 20,
    title: "ABTestEngine",
    description:
      "Integrated HTTP response testing engine with Jest-like scripting and comprehensive online documentation.",
    thumbnail: "/images/home/app-thumbnail/ab_test_engine.png",
    image: "/images/home/app-preview/ab_test_engine.png",
    Icon: FlaskConical,
  },
  {
    id: 21,
    title: "Import System",
    description:
      "Seamlessly migrate your workflow by importing full projects, folders, or individual requests. Sync data from other devices or shared team resources with ease.",
    thumbnail: null,
    image: null,
    Icon: Download,
  },
  {
    id: 22,
    title: "Export System",
    description:
      "Prioritize portability with deep export options. Save your projects, folders, or requests into open formats for effortless backup, sharing, and version control.",
    thumbnail: null,
    image: null,
    Icon: Upload,
  },
  {
    id: 23,
    title: "Layout Customization",
    description:
      "Tailor the workspace to your exact needs with a flexible interface. Customize your panels and sidebars with a fluid, VS Code-inspired layout.",
    thumbnail: "/images/home/app-thumbnail/layout_customization.png",
    image: "/images/home/app-preview/layout_customization.png",
    Icon: Settings,
  },
  {
    id: 24,
    title: "Font Controls",
    description:
      "Optimized for visual comfort. Take full control over typography with independent font sizes and indentation settings for the editor and viewers.",
    thumbnail: "/images/home/app-thumbnail/font_controls.png",
    image: "/images/home/app-preview/font_controls.png",
    Icon: Settings,
  },
  {
    id: 25,
    title: "Keyboard Shortcuts",
    description:
      "Become a power user with customizable keybindings. Map every action to your favorite shortcuts for a mouse-free workflow.",
    thumbnail: "/images/home/app-thumbnail/keyboard_shortcuts.png",
    image: "/images/home/app-preview/keyboard_shortcuts.png",
    Icon: Keyboard,
  },
  {
    id: 26,
    title: "Custom Wallpapers",
    description:
      "Make your workspace your own by personalizing your environment. Choose from high-quality wallpapers to create a development atmosphere that feels like home.",
    thumbnail: "/images/home/app-thumbnail/custom_wallpapers.png",
    image: "/images/home/app-preview/custom_wallpapers.png",
    Icon: ImageIcon,
  },
  {
    id: 27,
    title: "Theme Builder",
    description:
      "Design your perfect development aesthetic. Our powerful theme engine gives you the freedom to customize every color across the entire application interface.",
    thumbnail: "/images/home/app-thumbnail/theme_builder.png",
    image: "/images/home/app-preview/theme_builder.png",
    Icon: Palette,
  },
  {
    id: 28,
    title: "Theme Marketplace",
    description:
      "Explore a world of community-created styles. Browse, preview, and apply premium themes with a single click.",
    thumbnail: "/images/home/app-thumbnail/theme_marketplace.png",
    image: "/images/home/app-preview/theme_marketplace.png",
    Icon: Palette,
  },
  {
    id: 29,
    title: "Project Themes",
    description:
      "Visual separation for mental clarity. Assign unique themes to different projects to avoid sending requests to the wrong environment.",
    thumbnail: "/images/home/app-thumbnail/project_themes.png",
    image: "/images/home/app-preview/project_themes.png",
    Icon: Palette,
  },
  {
    id: 30,
    title: "Auto-Save",
    description:
      "Peace of mind by default. Every change you make is instantly committed to local storage, ensuring zero data loss.",
    thumbnail: null,
    image: null,
    Icon: HardDrive,
  },
  {
    id: 31,
    title: "No Lock-In",
    description:
      "Your data belongs to you. We believe in open standards and provide simple tools to take your data anywhere, anytime.",
    thumbnail: null,
    image: null,
    Icon: Download,
  },
];

export default function FeaturesSection() {
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    target.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const openPreview = (image: string) => {
    setSelectedImage(image);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setSelectedImage("");
  };

  return (
    <section className="py-32 px-6 bg-linear-to-b from-background to-muted/20 overflow-hidden">
      <div className="container mx-auto">
        {/* Section header */}
        <SectionHeader
          title={
            <>
              Power-Packed <span className="text-primary">Features</span>
            </>
          }
          description={<>Every tool you need to master your API workflow</>}
        />

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(
            ({ id, title, description, thumbnail, image, Icon }, index) => (
              <SpotlightEffectCard
                key={id}
                className="feature-card group relative flex flex-col gap-4 rounded-xl border-2 border-white/10 bg-card/40 backdrop-blur-md shadow-xl overflow-hidden hover:border-primary/30 transition-colors duration-500 p-5"
                onMouseMove={handleMouseMove}
                initial={{
                  opacity: 0,
                  y: 60,
                  scale: 0.9,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: false,
                  amount: 0.1,
                  margin: "0px 0px -10% 0px",
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.33, 0, 0.2, 1],
                  delay: (index % 3) * 0.1,
                }}
              >
                {/* Thumbnail */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted/20 border border-white/10 z-20">
                  {thumbnail && image ? (
                    <>
                      <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 bg-primary/10 rounded-lg backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer"
                        onClick={() => openPreview(image)}
                      >
                        <div className="p-3 rounded-full bg-white/10 border border-white/20 scale-50 group-hover:scale-100 transition-transform duration-500">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted transition-colors duration-500 z-10">
                      <Icon className="w-12 h-12 text-muted-foreground/50 group-hover:text-primary group-hover:scale-110 transition-all duration-500" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col z-20">
                  <div className="mb-4 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {description}
                  </p>
                </div>
              </SpotlightEffectCard>
            ),
          )}
        </div>
      </div>

      {/* Image Preview Popup */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            onClick={closePreview}
          >
            <button
              type="button"
              title="close"
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors z-50 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                closePreview();
              }}
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              className="block select-none"
              initial={{
                scale: 0.7,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              transition={{
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Feature Preview"
                width={1040}
                height={1040}
                className="block w-[85vw] md:w-auto md:max-w-[85vw] h-auto max-h-[85vh] rounded-lg border-2 md:border-8 border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] bg-black/50 select-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
