// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@vueuse/motion/nuxt",
  ],

  devtools: {
    enabled: true,
  },

  colorMode: {
    preference: "light",
    storageKey: "light",
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { ssr: true },
    "/admin/**": { ssr: false },
    "/login/**": { ssr: false },
  },

  googleFonts: {
    preload: true,
    families: {
      "DM Sans": {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
      "DM Serif Display": {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
    },
  },

  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_PUBLISHABLE_KEY,

    public: {
      apiUrl: process.env.NUXT_API_URL,
      motion: {
        directives: {
          "pop-bottom-once": {
            initial: {
              opacity: 0,
              y: 50,
            },
            visibleOnce: {
              opacity: 1,
              y: 0,
            },
          },
          "pop-bottom": {
            initial: {
              opacity: 0,
              y: 50,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          },
        },
      },
    },
  },

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
