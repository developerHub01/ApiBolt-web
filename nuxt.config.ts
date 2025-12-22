import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@nuxt/ui"],
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
});
