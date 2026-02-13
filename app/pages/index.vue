<template>
  <SectionHero id="home" />

  <SectionParties id="przyjecia" />

  <SectionPub id="pub" />

  <SectionContact id="kontakt" />
</template>

<script setup>
import SectionHero from "../sections/Hero.vue";
import SectionParties from "../sections/Parties.vue";
import SectionPub from "../sections/Pub.vue";
import SectionContact from "../sections/Contact.vue";
import { useZodiakSeoMeta } from "~/composables/useZodiakSeoMeta";

definePageMeta({
  layout: "page",
  middleware: false,
});
useZodiakSeoMeta({
  title: "Restauracja Zodiak – Catering, Przyjęcia, Pub, Kontakt",
  description:
    "Restauracja Zodiak – catering, organizacja przyjęć, pub i kontakt. Zamów online, poznaj naszą ofertę i skontaktuj się z nami!",
});
</script>
