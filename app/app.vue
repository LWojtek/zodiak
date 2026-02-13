<script setup>
const route = useRoute();
useHead({
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "msapplication-TileColor", content: "#000000" },
    { name: "msapplication-TileImage", content: "/ms-icon-144x144.png" },
    { name: "theme-color", content: "#000000" },
    { property: "og:title", content: "Restauracja Zodiak" },
    {
      property: "og:description",
      content:
        "Restauracja Zodiak – organizacja imprez okolicznościowych, pub, catering. Wyjątkowe przyjęcia, pub z klimatem, catering na każdą okazję.",
    },
    { property: "og:image", content: "/images/hero.jpg" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Restauracja Zodiak" },
    {
      name: "twitter:description",
      content:
        "Restauracja Zodiak – organizacja imprez okolicznościowych, pub, catering. Wyjątkowe przyjęcia, pub z klimatem, catering na każdą okazję.",
    },
    { name: "twitter:image", content: "/images/hero.jpg" },
  ],
  link: [
    { rel: "canonical", href: `https://zodiakczerwionka.pl${route.fullPath}` },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    { rel: "manifest", href: "/site.webmanifest" },
    { rel: "icon", href: "/favicon.ico" },
    // ✅ SILKTIDE CSS
    { rel: "stylesheet", href: "/silktide/silktide-consent-manager.css" },
  ],
  script: [
    // ✅ SILKTIDE CORE
    { src: "/silktide/silktide-consent-manager.js", defer: true },
    // ✅ SILKTIDE CONFIG (TWÓJ BANER)
    { src: "/silktide/config.js", defer: true },
  ],
  htmlAttrs: {
    lang: "pl",
    class: () =>
      route.fullPath.includes("admin") || route.fullPath.includes("login")
        ? "hide-cookie"
        : "",
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
<style>
.hide-cookie #silktide-wrapper {
  display: none;
}
</style>
