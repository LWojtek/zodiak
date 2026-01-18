<template>
  <SectionHero id="home" />

  <SectionParties id="przyjecia" />

  <SectionPub id="pub" />

  <SectionContact id="pub" />
</template>

<script setup>
import SectionHero from "../sections/Hero.vue";
import SectionParties from "../sections/Parties.vue";
import SectionPub from "../sections/Pub.vue";
import SectionContact from "../sections/Contact.vue";

definePageMeta({
  layout: "page",
});
</script>
