// Centralized SEO meta composable for Zodiak
// Usage: import { useZodiakSeoMeta } from '~/composables/useZodiakSeoMeta'
// and call useZodiakSeoMeta({ title, description, ... }) in your page/component

import { useSeoMeta } from "#imports";

const defaultOgImage = "/images/og-default.jpg";
const defaultTwitterCard = "summary_large_image";

export function useZodiakSeoMeta({
  title = "Restauracja Zodiak",
  description = "Restauracja Zodiak – catering, przyjęcia, pub. Zamów online!",
  ogImage = defaultOgImage,
  twitterCard = defaultTwitterCard,
  ...rest
} = {}) {
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    twitterCard,
    ...rest,
  });
}
