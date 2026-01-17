<template>
  <section
    id="przyjecia"
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
        >
          <template #leading>
            <UIcon name="i-lucide-balloon" class="size-4.5" />
          </template>
        </UBadge>
        <h2
          class="leading-tight text-3xl md:text-4xl lg:text-6xl text-almond-950 font-bold font-display"
        >
          Przyjęcia okolicznościowe
        </h2>
        <p class="max-w-[65ch]">
          Organizujemy wesela, komunie, chrzciny, urodziny i wszelkie imprezy
          okolicznościowe. Nasze sale bankietowe pomieszczą zarówno kameralne
          spotkania, jak i duże przyjęcia.
        </p>
      </div>

      <ClientOnly>
        <PageGallery :images="partiesImages" />
      </ClientOnly>

      <div
        class="relative grid grid-cols-1 md:grid-cols-2 p-8 gap-16 rounded-lg shadow-lg overflow-hidden w-full"
      >
        <div
          aria-hidden="true"
          class="absolute inset-0 w-full h-full bg-[url('/images/catering.jpg')] bg-no-repeat bg-cover bg-center"
        />
        <div
          aria-hidden="true"
          class="absolute inset-0 bg-linear-to-r from-primary/95 via-primary/85 to-primary/50"
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
            class="text-xl md:text-3xl lg:text-4xl font-bold font-display text-white"
          >
            Oferta cateringowa
          </h3>
          <p class="text-base text-white max-w-[45ch]">
            Przygotowujemy wyśmienitą polską kuchnię z najświeższych, lokalnych
            składników. Nasze menu dostosowujemy do Twoich potrzeb i
            preferencji.
          </p>

          <div class="grid text-white grid-cols-2 w-full gap-4">
            <div class="flex items-center gap-3">
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
            <div class="flex items-center gap-3">
              <UBadge
                class="rounded-lg p-2.5"
                color="secondary"
                size="xl"
                variant="ghost"
              >
                <UIcon name="i-lucide-users" class="size-5" />
              </UBadge>
              <span class="text-sm">Do 200 gości</span>
            </div>
            <div class="flex items-center gap-3">
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
            <div class="flex items-center gap-3">
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
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:flex items-center gap-4 w-full"
          >
            <UButton
              color="secondary"
              class="justify-center"
              size="md"
              href="tel:+48731763752"
            >
              <template #leading>
                <UIcon name="i-lucide-phone" class="size-5" />
              </template>
              +48 731 763 752
            </UButton>
            <UButton
              variant="outline"
              color="neutral"
              class="justify-center"
              size="md"
              href="tel:+48731763752"
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
              class="absolute inset-0 w-[70] h-70 -m-5 rounded-full border-2 border-white/80 animate-pulse"
            ></div>
            <div
              class="w-60 h-60 rounded-full bg-white/10 backdrop-blur-md flex flex-col items-center justify-center text-white border-2 border-white/40"
            >
              <div class="text-6xl md:text-7xl font-serif font-bold text-white">
                20+
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
          >
            <div class="flex gap-2">
              <div
                class="w-8 h-8 rounded-full bg-white/10 border flex items-center justify-center"
                v-for="i in 4"
                :key="i"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-star w-4 h-4 text-white"
                >
                  <path
                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
                  ></path>
                </svg>
              </div>
            </div>
            <span class="text-sm font-medium text-white">
              Setki zadowolonych klientów
            </span>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
import { onMounted } from "vue";

import Rellax from "rellax";

onMounted(() => {
  let rellax = new Rellax(".parties");
});
const partiesImages = [
  {
    src: "/images/wedding-hall.jpg",
    alt: "Sala weselna",
  },
  {
    src: "/images/hero.jpg",
    alt: "Restauracja Zodiak z zewnątrz",
  },
  {
    src: "/images/catering.jpg",
    alt: "Wyborne menu",
  },
  {
    src: "/images/wedding-hall.jpg",
    alt: "Sala weselna",
  },
];
</script>
