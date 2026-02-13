<template>
  <section class="bg-almond-50 grow py-12">
    <UContainer class="max-w-5xl">
      <UCard>
        <h1
          class="leading-tight text-3xl md:text-4xl text-center max-w-[40ch] mx-auto text-almond-950 font-bold font-display"
          v-motion-pop-bottom
          :duration="700"
        >
          Polityka cookies
        </h1>

        <div class="flex flex-col gap-6 mt-8">
          <p v-motion-pop-bottom :duration="700">
            Używamy plików cookies, aby zapewnić prawidłowe działanie strony, w
            tym obsługę funkcji takich jak logowanie, zapamiętywanie ustawień
            oraz realizacja zamówień.
          </p>

          <h2 class="font-bold" v-motion-pop-bottom :duration="700">
            Co to są pliki cookies?
          </h2>
          <p v-motion-pop-bottom :duration="700">
            Cookies to małe pliki tekstowe zapisywane na Twoim urządzeniu
            podczas korzystania ze strony.
          </p>

          <h2 class="font-bold" v-motion-pop-bottom :duration="700">
            Jak zarządzać cookies?
          </h2>
          <p v-motion-pop-bottom :duration="700">
            Możesz w każdej chwili zmienić ustawienia cookies w swojej
            przeglądarce (np. blokować lub usuwać cookies).
          </p>

          <p v-motion-pop-bottom :duration="700">
            Ta polityka może być okresowo aktualizowana.
          </p>
        </div>
      </UCard>
    </UContainer>
  </section>
</template>
<script setup>
import { useZodiakSeoMeta } from "~/composables/useZodiakSeoMeta";
definePageMeta({
  layout: "page",
});
useZodiakSeoMeta({
  title: "Polityka cookies – Restauracja Zodiak",
  description:
    "Dowiedz się, jak Restauracja Zodiak wykorzystuje pliki cookies na swojej stronie internetowej.",
});
</script>
