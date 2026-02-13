import tailwindcss from "@tailwindcss/vite";

const SITE_URL = "https://apibolt.vercel.app";

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
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxtjs/google-fonts",
  ],
  runtimeConfig: {
    public: {
      siteUrl: SITE_URL,
    },
  },
  googleFonts: {
    display: "swap",
    families: {
      Inter: "100..700",
      "Zen Dots": [400],
    },
    download: true,
    inject: true,
    useStylesheet: true,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "ApiBolt - Industrial API Testing Desktop App",
      link: [
        {
          rel: "canonical",
          href: SITE_URL,
        },
        {
          rel: "icon",
          type: "image/ico",
          href: "/favicon.ico",
        },
      ],
      meta: [
        {
          charset: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "title",
          content:
            "APIBolt - API Testing Open Source Desktop App | Postman Alternative",
        },
        {
          name: "description",
          content:
            "APIBolt is a powerful desktop application for API development, testing, and debugging. Local-first, zero cloud, and zero telemetry. The best open-source alternative to Postman for Windows, macOS, and Linux.",
        },

        // --- Open Graph (Facebook / WhatsApp / Messenger) ---
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: SITE_URL,
        },
        {
          property: "og:title",
          content:
            "APIBolt - Industrial API Testing Desktop App | Open Source Postman Alternative",
        },
        {
          property: "og:description",
          content:
            "APIBolt is a powerful desktop application for API development, testing, and debugging. Local-first, zero cloud, and zero telemetry. Optimized for speed and privacy.",
        },
        {
          property: "og:image",
          content: `${SITE_URL}/og.png`,
        },
        {
          property: "og:image:secure_url",
          content: `${SITE_URL}/og.png`,
        },
        {
          property: "og:image:type",
          content: "image/png",
        },
        {
          property: "og:image:width",
          content: "1200",
        },
        {
          property: "og:image:height",
          content: "630",
        },
        {
          property: "og:image:alt",
          content: "APIBolt Desktop App Interface",
        },
        // --- Twitter / X ---
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:site",
          content: "@apibolt",
        },
        {
          name: "twitter:url",
          content: SITE_URL,
        },
        {
          name: "twitter:title",
          content:
            "APIBolt - Industrial API Testing Desktop App | Open Source Postman Alternative",
        },
        {
          name: "twitter:description",
          content:
            "APIBolt is a powerful desktop application for API development, testing, and debugging. Local-first, zero cloud, and zero telemetry. Optimized for speed and privacy.",
        },
        {
          name: "twitter:image",
          content: `${SITE_URL}/og.png`,
        },
      ],
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-3YN6EV9VD9",
          async: true,
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-3YN6EV9VD9');
          `,
          type: "text/javascript",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  routeRules: {
    "/api/**": {
      cors: true,
      headers: {
        // "Access-Control-Allow-Origin": "http://localhost:5173",
      },
    },
    "/": {
      isr: true,
    },
    "/login": {
      isr: true,
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
  site: {
    url: "https://apibolt.vercel.app",
    sitemap: true,
  },
  sitemap: {
    exclude: ["/confirm", "/dashboard/**", "/not-found"],
    urls: async () => ["/marketplace", "/profile/developerHub01", "/fake"],
  },
  robots: {
    disallow: ["/confirm", "/dashboard/**", "/not-found"],
  },
});
