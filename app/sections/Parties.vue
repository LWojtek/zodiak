<template>
  <section
    class="relative py-12 md:py-24 lg:py-24 overflow-hidden bg-almond-50 scroll-mt-(--ui-scroll-margin)"
  >
    <ClientOnly>
      <div
        data-rellax-speed="-2"
        class="parties absolute top-0 left-0 -translate-1/2 size-32 md:w-72 md:h-72 rounded-full bg-almond-100"
      />
      <div
        data-rellax-speed="3"
        class="parties absolute top-1/3 md:top-1/2 right-0 md:translate-y-1/2 translate-x-1/2 md:translate-x-1/3 size-32 md:w-72 md:h-72 rounded-full bg-almond-100"
      />

      <div
        data-rellax-speed="4"
        class="parties absolute top-1/2 left-3/4 translate-1/2 w-32 h-32 rounded-full bg-almond-100/50"
      />
    </ClientOnly>

    <UContainer
      class="relative z-1 flex flex-col gap-12 md:gap-24 items-center"
    >
      <div class="flex flex-col items-center gap-6 text-center">
        <UBadge
          color="secondary"
          size="xl"
          variant="subtle"
          label="Organizacja imprez"
          v-motion-pop-bottom
          :duration="700"
        >
          <template #leading>
            <UIcon name="i-lucide-balloon" class="size-4.5" />
          </template>
        </UBadge>
        <h2
          class="leading-tight text-3xl md:text-4xl lg:text-6xl text-almond-950 font-bold font-display"
          v-motion-pop-bottom
          :duration="700"
        >
          Przyjęcia okolicznościowe
        </h2>
        <p class="max-w-[63ch]" v-motion-pop-bottom :duration="700">
          Organizujemy wesela, komunie, chrzciny, urodziny, stypy i wszelkie
          imprezy okolicznościowe. Wynajmujemy również sale na szkolenia,
          prezentacje i spotkania biznesowe. <br />Nasze sale bankietowe
          przeznaczone są zarówno na duże przyjęcia, jak i kameralne spotkania.
        </p>
      </div>

      <ClientOnly>
        <PageGallery :images="partiesImages" />
      </ClientOnly>
    </UContainer>

    <UContainer class="mt-12 md:mt-24 px-0">
      <section
        class="relative grid grid-cols-1 md:grid-cols-2 px-4 py-8 sm:px-8 sm:py-8 gap-16 md:rounded-lg shadow-lg overflow-hidden w-full"
        v-motion-pop-bottom
        :duration="700"
      >
        <div
          aria-hidden="true"
          class="absolute inset-0 w-full h-full bg-[url('/images/catering.jpg')] bg-no-repeat bg-cover bg-center"
        />
        <div
          aria-hidden="true"
          class="absolute inset-0 bg-linear-to-r from-primary-950/95 via-primary-950/85 to-primary-950/70"
        />
        <div class="relative z-1 flex items-start flex-col gap-8">
          <UBadge
            color="secondary"
            size="xl"
            variant="ghost"
            label="Catering & Gastronomia"
          >
            <template #leading>
              <UIcon name="i-lucide-utensils" class="size-4.5" />
            </template>
          </UBadge>
          <h3
            class="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-white"
            v-motion-pop-bottom
            :duration="700"
          >
            Oferta cateringowa
          </h3>
          <p
            class="text-base text-white max-w-[48ch]"
            v-motion-pop-bottom
            :duration="700"
          >
            Sprawdź naszą ofertę menu dla 10-12 osób (to przykładowa liczba).
            Nasze menu dostosowujemy do Twoich potrzeb i preferencji.
          </p>

          <div class="grid text-white grid-cols-2 w-full gap-4">
            <div
              class="flex items-center gap-3"
              v-motion-pop-bottom
              :duration="700"
            >
              <UBadge
                class="rounded-lg p-2.5"
                color="secondary"
                size="xl"
                variant="ghost"
              >
                <UIcon name="i-lucide-utensils" class="size-5" />
              </UBadge>
              <span class="text-sm">Świeże składniki</span>
            </div>
            <div
              class="flex items-center gap-3"
              v-motion-pop-bottom
              :duration="700"
            >
              <UBadge
                class="rounded-lg p-2.5"
                color="secondary"
                size="xl"
                variant="ghost"
              >
                <UIcon name="i-lucide-clock" class="size-5" />
              </UBadge>
              <span class="text-sm">Dostawa na czas</span>
            </div>
            <div
              class="flex items-center gap-3"
              v-motion-pop-bottom
              :duration="700"
            >
              <UBadge
                class="rounded-lg p-2.5"
                color="secondary"
                size="xl"
                variant="ghost"
              >
                <UIcon name="i-lucide-hand-platter" class="size-5" />
              </UBadge>
              <span class="text-sm">Różnorodne menu</span>
            </div>
            <div
              class="flex items-center gap-3"
              v-motion-pop-bottom
              :duration="700"
            >
              <UBadge
                class="rounded-lg p-2.5"
                color="secondary"
                size="xl"
                variant="ghost"
              >
                <UIcon name="i-lucide-star" class="size-5" />
              </UBadge>
              <span class="text-sm">Premium jakość</span>
            </div>
          </div>
          <p class="text-white">
            Zadzwoń lub napisz wiadomość, a z chęcią sprawdzimy wolne terminy i
            dopasujemy ofertę skrojoną na Twoje potrzeby!
          </p>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:flex items-center gap-4 w-full"
            v-motion-pop-bottom
            :duration="700"
          >
            <UButton
              color="secondary"
              class="justify-center"
              size="md"
              href="tel:+48607588452"
            >
              <template #leading>
                <UIcon name="i-lucide-phone" class="size-5" />
              </template>
              607 588 452
            </UButton>
            <UButton
              color="secondary"
              class="justify-center"
              size="md"
              href="mailto:mwzodiak@gmail.com"
            >
              Napisz do nas
              <template #leading>
                <UIcon name="i-lucide-mail" class="size-5" />
              </template>
            </UButton>
            <UButton
              variant="outline"
              color="neutral"
              class="justify-center"
              size="md"
              to="/order"
            >
              Zamów online
              <template #trailing>
                <UIcon name="i-lucide-arrow-right" class="size-5" />
              </template>
            </UButton>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center">
          <div class="relative">
            <div
              class="absolute inset-0 w-70 h-70 -m-5 rounded-full border-2 border-white/80 animate-pulse"
            ></div>
            <div
              class="w-60 h-60 rounded-full bg-white/10 backdrop-blur-md flex flex-col items-center justify-center text-white border-2 border-white/40"
              v-motion-pop-bottom
              :duration="700"
            >
              <div class="text-6xl md:text-7xl font-serif font-bold text-white">
                15+
              </div>
              <div class="text-lg font-medium mt-1">lat doświadczenia</div>
              <div class="w-12 h-1 bg-white/10 rounded-full mt-4"></div>
              <div
                class="text-sm text-primary-foreground/70 mt-3 text-center px-4"
              >
                Profesjonalna obsługa
              </div>
            </div>
          </div>
          <div
            class="mt-8 flex flex-col sm:flex-row items-center gap-4 px-6 py-3 backdrop-blur-sm rounded-full"
            v-motion-pop-bottom
            :duration="700"
          >
            <div class="flex gap-2">
              <div
                class="w-8 h-8 rounded-full bg-white/10 border flex items-center justify-center"
                v-for="i in 4"
                :key="i"
              >
                <UIcon name="i-lucide-star" class="text-white size-4" />
              </div>
            </div>
            <span class="text-sm font-medium text-white">
              Tysiące zadowolonych klientów
            </span>
          </div>
        </div>
      </section>
    </UContainer>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import Rellax from "rellax";

onMounted(() => {
  requestAnimationFrame(() => {
    new Rellax(".parties", { center: true });
  });
});
const partiesImages = [
  {
    src: "/images/przyjecia_1.webp",
    alt: "Wyborne menu",
  },
  {
    src: "/images/przyjecia_2.webp",
    alt: "Sala weselna",
  },
  {
    src: "/images/przyjecia_3.webp",
    alt: "Sala weselna",
  },
  {
    src: "/images/przyjecia_4.webp",
    alt: "Sala weselna",
  },
  {
    src: "/images/przyjecia_5.webp",
    alt: "Wyborne menu",
  },
  {
    src: "/images/przyjecia_6.webp",
    alt: "Sala weselna",
  },
  {
    src: "/images/przyjecia_7.webp",
    alt: "Wyborne menu",
  },
  {
    src: "/images/przyjecia_8.webp",
    alt: "Sala weselna",
  },
];
</script>
