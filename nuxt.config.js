// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@vueuse/motion/nuxt",
    "@nuxtjs/supabase",
  ],

  devtools: {
    enabled: true,
  },

  vite: {
    server: {
      allowedHosts: [".ngrok-free.app"],
    },
  },

  colorMode: {
    preference: "light",
    storageKey: "light",
  },

  supabase: {
    redirect: false,
  },

  css: ["~/assets/css/main.css"],

  nitro: {
    prerender: {
      routes: ["/"],

      ignore: ["/admin", "/admin/**", "/login"],
    },
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

  server: {
    allowedHosts: ["localhost", "6c048190fda7.ngrok-free.app"],
  },

  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
    supabaseSecretKey: process.env.SUPABASE_SECRET_KEY,
    payu: {
      api: process.env.PAYU_API,
      posId: process.env.PAYU_POS_ID,
      clientId: process.env.PAYU_CLIENT_ID,
      clientSecret: process.env.PAYU_CLIENT_SECRET,
      md5: process.env.PAYU_MD5_KEY,
    },

    public: {
      siteUrl: process.env.PUBLIC_SITE_URL,
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
