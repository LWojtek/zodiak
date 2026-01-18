<template>
  <section
    class="relative py-12 md:py-24 lg:py-24 overflow-hidden scroll-mt-(--ui-scroll-margin)"
  >
    <UContainer
      class="relative z-1 flex flex-col gap-12 md:gap-24 items-center"
    >
      <div class="flex flex-col items-center gap-6 text-center">
        <UBadge
          color="secondary"
          size="xl"
          variant="subtle"
          label="Rozrywka"
          v-motion-pop-bottom
          :duration="700"
        >
          <template #leading>
            <UIcon name="i-lucide-martini" class="size-4.5" />
          </template>
        </UBadge>
        <h2
          class="leading-tight text-3xl md:text-4xl lg:text-6xl text-almond-950 font-bold font-display"
          v-motion-pop-bottom
          :duration="700"
        >
          Pub i kręgielnia
        </h2>
        <p class="max-w-[45ch]" v-motion-pop-bottom :duration="700">
          Klimatyczny pub z profesjonalną kręgielnią i stołami bilardowymi.
          Idealne miejsce na spotkania ze znajomymi.
        </p>
      </div>

      <ClientOnly>
        <PageGallery :images="pubImages" />
      </ClientOnly>
    </UContainer>

    <UContainer class="mt-12 md:mt-24 px-0">
      <div
        class="relative sm:rounded-3xl overflow-hidden shadow-3xl w-full"
        v-motion-pop-bottom
        :duration="700"
      >
        <div
          class="absolute inset-0 bg-cover bg-center bg-[url('/images/kregle.jpg')]"
          aria-hidden="true"
        />
        <div
          class="absolute inset-0 bg-linear-to-r from-primary/95 via-primary/85 to-primary/70"
          aria-hidden="true"
        />
        <div class="relative z-10 px-4 py-8 sm:px-8 sm:py-8">
          <div class="grid lg:grid-cols-2 gap-10 items-center">
            <div class="flex flex-col items-start gap-8 text-white">
              <UBadge
                color="secondary"
                size="xl"
                variant="ghost"
                label="Pub & Kręgielnia"
                v-motion-pop-bottom
                :duration="700"
              >
                <template #leading>
                  <UIcon name="i-lucide-target" class="size-4.5" />
                </template>
              </UBadge>

              <h3
                class="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-white"
                v-motion-pop-bottom
                :duration="700"
              >
                Zarezerwuj tor do kręgli
              </h3>
              <p
                class="text-white/85 text-lg mb-8 leading-relaxed max-w-lg"
                v-motion-pop-bottom
                :duration="700"
              >
                Rezerwacji dokonasz telefonicznie w godzinach otwarcia
                kręgielni. Zapraszamy na kręgle, bilard oraz pyszne przekąski i
                napoje z naszego menu.
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="size-5"
                      aria-hidden
                    >
                      <path d="M9 10h.01" />
                      <path d="M6 13h.01" />
                      <path d="M10 14h.01" />
                      <path d="M11.09 6.07a8 8 0 1 0 .32 15.81" />
                      <path d="M16 9h4" />
                      <path
                        d="M15 5c0 1.5 1 2 1 4 0 2.5-2 4.5-2 7 0 2.6 1.9 6 1.9 6H20s2-3.4 2-6c0-2.5-2-4.5-2-7 0-2 1-2.5 1-4a3 3 0 1 0-6 0"
                      />
                    </svg>
                  </UBadge>
                  <span class="text-sm">4 tory do kręgli</span>
                </div>
                <div class="flex items-center gap-3">
                  <UBadge
                    class="rounded-lg p-2.5"
                    color="secondary"
                    size="xl"
                    variant="ghost"
                  >
                    <UIcon name="i-lucide-dices" class="size-5" />
                  </UBadge>
                  <span class="text-sm">Stoły bilardowe</span>
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
                    <UIcon name="i-lucide-beer" class="size-5" />
                  </UBadge>
                  <span class="text-sm">Bogaty bar</span>
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
                    <UIcon name="i-lucide-guitar" class="size-5" />
                  </UBadge>
                  <span class="text-sm">Świetna atmosfera</span>
                </div>
              </div>

              <div
                class="flex flex-col items-start w-full gap-3"
                v-motion-pop-bottom
                :duration="700"
              >
                <UButton
                  color="secondary"
                  class="justify-center w-full md:w-auto"
                  size="md"
                  href="tel:+48731763752"
                >
                  <template #leading>
                    <UIcon name="i-lucide-phone" class="size-5" />
                  </template>
                  +48 731 763 752
                </UButton>

                <p
                  class="text-sm text-center md:text-left text-white/90"
                  v-motion-pop-bottom
                  :duration="700"
                >
                  Telefon czynny w godzinach otwartcia kręgielni
                </p>
              </div>
            </div>
            <div class="block">
              <div
                class="bg-white/5 border backdrop-blur-md rounded-2xl px-4 py-8 sm:px-8 sm:py-8"
              >
                <div class="flex items-center gap-3 mb-8">
                  <div
                    class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center"
                  >
                    <UIcon name="i-lucide-clock" class="size-6 text-white" />
                  </div>
                  <h4
                    class="font-display text-2xl font-bold text-white"
                    v-motion-pop-bottom
                    :duration="700"
                  >
                    Godziny otwarcia
                  </h4>
                </div>
                <div class="space-y-4">
                  <div
                    class="flex justify-between items-center py-3 border-b border-white/30 last:border-0"
                    v-motion-pop-bottom
                    :duration="700"
                  >
                    <span class="font-medium text-white/90">Czwartek</span>
                    <span class="text-white font-bold">17:00 - 22:00</span>
                  </div>
                  <div
                    class="flex justify-between items-center py-3 border-b border-white/30 last:border-0"
                    v-motion-pop-bottom
                    :duration="700"
                  >
                    <span class="font-medium text-white/90">Piątek</span>
                    <span class="text-white font-bold">17:00 - 01:00</span>
                  </div>
                  <div
                    class="flex justify-between items-center py-3 border-b border-white/30 last:border-0"
                    v-motion-pop-bottom
                    :duration="700"
                  >
                    <span class="font-medium text-white/90">Sobota</span>
                    <span class="text-white font-bold">17:00 - 01:00</span>
                  </div>
                  <div
                    class="flex justify-between items-center py-3 border-b border-white/30 last:border-0"
                    v-motion-pop-bottom
                    :duration="700"
                  >
                    <span class="font-medium text-white/90">Niedziela</span>
                    <span class="text-white font-bold">17:00 - 22:00</span>
                  </div>
                </div>
                <div
                  class="mt-6 pt-4 border-t border-white/30 text-sm text-white/70"
                  v-motion-pop-bottom
                  :duration="700"
                >
                  <strong>Poniedziałek - Środa:</strong> nieczynne
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
<script setup>
const pubImages = [
  {
    src: "/images/kregle.jpg",
    alt: "Profesjonalne tory do kręgli",
  },
  {
    src: "/images/bilard.jpg",
    alt: "Stoły bilardowe",
  },
  {
    src: "/images/bar.jpg",
    alt: "Klimatyczny barek",
  },
];
</script>
