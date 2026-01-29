<script setup>
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [
    { rel: "icon", href: "/favicon.ico" },

    // ✅ SILKTIDE CSS
    {
      rel: "stylesheet",
      href: "/silktide/silktide-consent-manager.css",
    },
  ],
  script: [
    // ✅ SILKTIDE CORE
    {
      src: "/silktide/silktide-consent-manager.js",
      defer: true,
    },
    // ✅ SILKTIDE CONFIG (TWÓJ BANER)
    {
      src: "/silktide/config.js",
      defer: true,
    },
  ],
  htmlAttrs: {
    lang: "pl",
  },
});

const title = "Nuxt Starter Template";
const description =
  "A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: "https://ui.nuxt.com/assets/templates/nuxt/starter-light.png",
  twitterImage: "https://ui.nuxt.com/assets/templates/nuxt/starter-light.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <UApp :locale="{ code: 'pl' }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
