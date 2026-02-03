import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["swiper/css", "swiper/css/effect-cards", "~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
  ],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "APIBolt",
      link: [
        {
          rel: "icon",
          type: "image/ico",
          href: "/favicon.ico",
        },
      ],
      meta: [
        {
          name: "description",
          content:
            "APIBolt is a progressive API testing platform. It provide desktop app for windows, mac and linux. It is alternative of postman but opensource and provide feature to test REST API project wise and management.",
        },
        // Open Graph Tags
        {
          property: "og:title",
          content: "APIBolt - Progressive API Testing Platform",
        },
        {
          property: "og:description",
          content:
            "Alternative to Postman, open-source and built for modern API management.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://api-bolt-web.vercel.app/" },
        {
          property: "og:image",
          content: "https://api-bolt-web.vercel.app/og.png",
        },

        // Twitter Tags
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "APIBolt" },
        {
          name: "twitter:description",
          content: "APIBolt is a progressive API testing platform.",
        },
        {
          name: "twitter:image",
          content: "https://api-bolt-web.vercel.app/og.png",
        },
      ],
    },
  },
  routeRules: {
    "/api/**": {
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5173",
      },
    },
  },
  supabase: {
    types: "~/types/database.types.ts",
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      include: ["/dashboard"],
      exclude: ["/", "/marketplace"],
      saveRedirectToCookie: false,
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: "@/components/ui",
  },
  components: [
    {
      path: "~/components",
    },
    {
      path: "~/components/ui",
      pathPrefix: false,
    },
  ],
});
