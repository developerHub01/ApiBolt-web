import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxtjs/supabase",
  ],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "APIBolt",
      meta: [
        {
          name: "description",
          content:
            "APIBolt is a progressive API testing platform. It provide desktop app for windows, mac and linux. It is alternative of postman but opensource and provide feature to test REST API project wise and management.",
        },
      ],
    },
  },
  supabase: {
    types: "~/types/database.types.ts",
    redirectOptions: {
      login: "/login",
      callback: "/",
      include: ["/dashboard"],
      exclude: [],
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
