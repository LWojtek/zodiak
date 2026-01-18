a
<template>
  <section
    class="relative z-1 overflow-hidden w-full h-[calc(100vh-var(--ui-header-height))] before:absolute before:bg-gradient-to-b before:w-full before:h-full before:z-1 before:pointer-events-none before:inset-0 before:from-primary/80 before:via-primary/70 before:to-primary/80"
  >
    <!-- <div
      class="absolute z-10 inset-0 flex flex-wrap justify-around bg-[radial-gradient(circle,_#fff_4%,_transparent_8%)] bg-[size:2.5px_px]"
    /> -->
    <img
      src="/images/hero.jpg"
      alt="Restauracja Zodiak"
      data-rellax-speed="-12"
      data-rellax-xs-speed="-2"
      data-rellax-mobile-speed="-2"
      data-rellax-tablet-speed="-3"
      class="absolute hero top-0 left-0 h-full w-full object-cover hero-zoom"
    />

    <UContainer class="flex items-center justify-center relative z-10 h-full">
      <div class="flex text-center items-center text-inverted flex-col gap-6">
        <h1
          class="leading-tight text-5xl md:text-6xl lg:text-8xl font-900 font-display"
          v-motion-pop-bottom
          :duration="700"
        >
          Restauracja <span class="text-secondary">Zodiak</span>
        </h1>
        <div>
          <p
            class="text-lg sm:text-xl text-shadow-lg"
            v-motion-pop-bottom
            :duration="700"
          >
            Oranizujemy wesela komunie urodziny i imprezy okolicznościowe
          </p>
          <p class="text-lg sm:text-xl" v-motion-pop-bottom :duration="700">
            Oferujemy również pub z kregielnią i bilardem.
          </p>
        </div>

        <div
          class="flex flex-col self-stretch sm:self-center sm:flex-row sm:items-center gap-4 mt-4"
          v-motion-pop-bottom
          :duration="700"
        >
          <UButton
            class="w-full justify-center sm:w-auto"
            color="secondary"
            size="lg"
            to="#przyjecia"
            external
          >
            Przyjęcia okolicznościowe
          </UButton>
          <UButton
            class="w-full justify-center sm:w-auto"
            color="neutral"
            variant="outline"
            size="lg"
            to="#pub"
            external
          >
            Pub i kręgielnia
          </UButton>
        </div>

        <div
          class="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 flex-col"
          v-motion-pop-bottom
          :duration="700"
        >
          <span class="text-base">Przewiń w dół</span>
          <UButton
            class="rounded-full self-center motion-safe:animate-bounce p-3.5"
            color="neutral"
            variant="outline"
            square
            size="md"
            external
            to="#przyjecia"
          >
            <UIcon name="i-lucide-arrow-down" class="size-6" />
          </UButton>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
import { onMounted } from "vue";

import Rellax from "rellax";

const { opacity } = useScrollOpacity({
  start: 0,
  end: 400, // tweak fade length here
});

onMounted(() => {
  let rellax = new Rellax(".hero");
});
</script>
