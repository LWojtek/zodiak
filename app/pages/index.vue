<template>
  <SectionHero id="home" />

  <SectionParties id="przyjecia" />

  <div id="pub" class="h-screen scroll-mt-(--ui-scroll-margin)">
    <h1>Strona główna</h1>
    <UButton color="secondary">Test</UButton>
  </div>
  <div id="kontakt" class="h-screen scroll-mt-(--ui-scroll-margin)">
    <h1>Strona główna</h1>
    <UButton color="secondary">Test</UButton>
  </div>
</template>

<script setup>
import SectionHero from "../sections/Hero.vue";
import SectionParties from "../sections/Parties.vue";
definePageMeta({
  layout: "page",
});
</script>
