<template>
  <section
    class="relative bg-almond-50 py-12 md:py-24 lg:py-24 scroll-mt-(--ui-scroll-margin) overflow-hidden"
  >
    <ClientOnly>
      <div
        data-rellax-speed="-2"
        class="contact absolute top-0 -left-16 md:-left-36 size-32 md:w-72 md:h-72 rounded-full bg-almond-100"
      />
      <div
        data-rellax-speed="2"
        class="contact absolute top-1/3 md:top-1/2 right-0 md:translate-y-1/2 translate-x-1/2 md:translate-x-1/3 size-32 md:w-72 md:h-72 rounded-full bg-almond-100"
      />

      <div
        data-rellax-speed="4"
        class="contact absolute top-1/2 left-3/4 translate-1/2 w-32 h-32 rounded-full bg-almond-100/50"
      />
    </ClientOnly>

    <UContainer
      class="relative z-1 flex flex-col gap-12 md:gap-24 items-center"
    >
      <div class="flex flex-col items-center gap-6 text-center">
        <UBadge color="secondary" size="xl" variant="subtle" label="Kontakt">
          <template #leading>
            <UIcon name="i-lucide-mail" class="size-4.5" />
          </template>
        </UBadge>
        <h2
          class="leading-tight text-3xl md:text-4xl lg:text-6xl text-almond-950 font-bold font-display"
        >
          Skontaktuj się z nami
        </h2>
        <p>
          Masz pytania? Skontaktuj się z nami telefonicznie lub odwiedź nas
          osobiście.
        </p>
      </div>
    </UContainer>
    <UContainer class="px-0 mt-12 md:mt-24">
      <div
        class="relative sm:rounded-3xl overflow-hidden shadow-3xl grid grid-cols-1 md:grid-cols-2 w-full bg-white"
      >
        <div
          class="absolute inset-0 bg-cover bg-center bg-[url('/images/hero.jpg')]"
          aria-hidden="true"
        />
        <div
          class="absolute inset-0 bg-linear-to-r from-primary/95 via-primary/85 to-primary/70"
          aria-hidden="true"
        />

        <div
          class="relative z-1 flex items-start flex-col gap-8 px-4 py-8 sm:px-8 sm:py-8"
        >
          <UBadge
            color="secondary"
            size="xl"
            variant="ghost"
            label="Odwiedź nas"
          >
            <template #leading>
              <UIcon name="i-lucide-navigation" class="size-4.5" />
            </template>
          </UBadge>
          <h3
            class="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-white"
          >
            Restauracja Zodiak
          </h3>
          <div class="flex flex-col text-white w-full gap-4">
            <div
              class="p-4 bg-white/10 border border-white/30 backdrop-blur-xs rounded-lg"
            >
              <div class="flex items-start gap-3">
                <UBadge
                  class="rounded-lg p-2.5"
                  color="secondary"
                  size="xl"
                  variant="ghost"
                >
                  <UIcon name="i-lucide-map-pin" class="size-7" />
                </UBadge>
                <div>
                  <span class="text-white/85">Adres:</span>
                  <p class="font-semibold">ul. Parkowa 11B</p>
                  <p class="font-semibold">44-230 Czerwionka-Leszczyny</p>
                </div>
              </div>
            </div>
            <UButton
              class="p-4 bg-white/10 border border-white/30 group text-white hover:opacity-85 hover:text-white backdrop-blur-xs rounded-lg"
              to="tel:+48731763752"
              external
              variant="link"
            >
              <div class="flex items-start gap-3">
                <UBadge
                  class="rounded-lg p-2.5 group-hover:bg-white group-hover:text-primary transition"
                  color="secondary"
                  size="xl"
                  variant="ghost"
                >
                  <UIcon name="i-lucide-phone" class="size-7" />
                </UBadge>
                <div>
                  <span class="text-white/85 font-normal">
                    Organizacja przyjęć & catering
                  </span>
                  <span class="block font-semibold"> +48 731 763 752 </span>
                </div>
              </div>
            </UButton>
            <UButton
              class="p-4 bg-white/10 border border-white/30 group text-white hover:opacity-85 hover:text-white backdrop-blur-xs rounded-lg"
              to="tel:+48731763752"
              external
              variant="link"
            >
              <div class="flex items-start gap-3">
                <UBadge
                  class="rounded-lg p-2.5 group-hover:bg-white group-hover:text-primary transition"
                  color="secondary"
                  size="xl"
                  variant="ghost"
                >
                  <UIcon name="i-lucide-phone" class="size-7" />
                </UBadge>
                <div>
                  <span class="text-white/85 font-normal">
                    Pub & kręgielnia
                  </span>
                  <span class="block font-semibold"> +48 731 763 752 </span>
                </div>
              </div>
            </UButton>
            <div class="flex items-center gap-2">
              <UButton
                size="lg"
                square
                variant="outline"
                color="neutral"
                class="text-white p-4 sm:p-4"
              >
                <template #leading>
                  <UIcon name="i-lucide-instagram" class="size-5" />
                </template>
              </UButton>
              <UButton
                size="lg"
                square
                variant="outline"
                color="neutral"
                class="text-white p-4 sm:p-4"
              >
                <template #leading>
                  <UIcon name="i-lucide-facebook" class="size-5" />
                </template>
              </UButton>
            </div>
          </div>
        </div>
        <div class="z-1 col-span-1 relative h-full pb-[56.25%] md:pb-0">
          <iframe
            title="Zodiak — Czerwionka-Leszczyny"
            src="https://www.google.com/maps?q=50.147273073747364,18.680919126408785&z=17&output=embed"
            style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border: 0;
            "
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          />
          <div
            class="absolute inset w-full h-full bg-black/20 pointer-events-none"
          ></div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
<script setup>
import { onMounted } from "vue";

import Rellax from "rellax";

onMounted(() => {
  requestAnimationFrame(() => {
    new Rellax(".contact", { center: true });
  });
});
</script>
