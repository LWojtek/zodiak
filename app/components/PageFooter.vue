<template>
  <footer class="py-8 bg-akaroa-950">
    <UContainer class="grid grid-cols-4 gap-12">
      <div class="flex flex-col gap-6 col-span-4 md:col-span-2 lg:col-span-1">
        <AppLogo classes="w-40" />
        <p class="text-white/85">
          Przyjęcia okolicznościowe, catering oraz pub z kręgielnią. Tworzymy
          wyjątkowe wspomnienia od ponad 20 lat.
        </p>
        <div class="flex gap-2 -translate-x-3 mt-auto">
          <UButton
            label="Instagram"
            variant="link"
            class="text-sm gap-3"
            color="secondary"
            target="_blank"
            to="https://instagram.com/zodiakczerwionkaleszczyny"
          >
            <template #leading>
              <UIcon
                name="i-lucide-instagram"
                class="min-w-4 size-4 xl:size-5 xl:min-w-5"
              />
            </template>
          </UButton>
          <UButton
            label="Facebook"
            variant="link"
            class="text-sm gap-3"
            color="secondary"
            target="_blank"
            to="https://www.facebook.com/ZodiakCzerwionkaLeszczyny"
          >
            <template #leading>
              <UIcon
                name="i-lucide-facebook"
                class="min-w-4 size-4 xl:size-5 xl:min-w-5"
              />
            </template>
          </UButton>
        </div>
      </div>
      <div class="flex flex-col gap-6 col-span-4 md:col-span-2 lg:col-span-1">
        <p class="text-lg uppercase font-semibold text-secondary">Menu</p>
        <div class="flex flex-col gap-1 -translate-x-3">
          <UButton
            v-for="(link, index) in links"
            :key="index"
            :href="link.to"
            external
            variant="link"
            color="secondary"
            size="md"
            class="text-sm"
          >
            {{ link.label }}
          </UButton>
        </div>
      </div>
      <div class="flex flex-col gap-6 col-span-4 md:col-span-2 lg:col-span-1">
        <p class="text-lg uppercase font-semibold text-secondary">Kontakt</p>
        <div class="flex flex-col gap-1 -translate-x-3">
          <UButton
            external
            href="tel:+48607588452"
            variant="link"
            color="secondary"
            class="text-sm gap-3"
            size="md"
          >
            <UIcon
              name="i-lucide-phone"
              class="min-w-4 size-4 xl:size-5 xl:min-w-5"
            />
            <span class="hidden xl:inline">Imprezy:</span>
            607 588 452
          </UButton>
          <UButton
            external
            href="tel:+48327231703"
            variant="link"
            color="secondary"
            class="text-sm gap-3"
            size="md"
          >
            <UIcon
              name="i-lucide-phone"
              class="min-w-4 size-4 xl:size-5 xl:min-w-5"
            />
            <span class="hidden xl:inline">Kręgle:</span>
            32 723 17 03
          </UButton>
          <div class="flex px-3.5 gap-2 text-sm items-start text-white/85">
            <UIcon
              name="i-lucide-map-pin"
              class="min-w-4 size-4 xl:size-5 xl:min-w-5"
            />
            <div>
              ul. Parkowa 11B <br />
              44-230, Czerwionka-Leszczyny
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6 col-span-4 md:col-span-2 lg:col-span-1">
        <p class="text-lg uppercase font-semibold text-secondary">
          Godziny otwarcia
        </p>
        <div class="space-y-2.5 rounded-xl">
          <div class="flex items-center justify-between gap-3 text-sm">
            <span class="text-white/85">Pon - Czw</span
            ><span class="text-white/85 font-medium tabular-nums"
              >14:00 - 22:00</span
            >
          </div>
          <div class="flex items-center justify-between gap-3 text-sm">
            <span class="text-white/85">Pt - Sob</span
            ><span class="text-white/85 font-medium tabular-nums"
              >14:00 - 24:00</span
            >
          </div>
          <div class="flex items-center justify-between gap-3 text-sm">
            <span class="text-white/85">Niedziela</span
            ><span class="text-white/85 font-medium tabular-nums"
              >14:00 - 22:00</span
            >
          </div>
        </div>
      </div>
      <div class="col-span-4 pt-8 w-full border-t border-white/15">
        <div
          class="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p class="text-white/85 text-sm">
            © 2026 Zodiak. Wszelkie prawa zastrzeżone.
          </p>
          <img src="/images/kpo.webp" class="sm:h-12" alt="Naklejka KPO" />
          <div class="flex items-center gap-2">
            <span class="text-white/95 text-sm">Do góry</span>
            <UButton
              class="rounded-full self-center p-2.5"
              color="neutral"
              variant="outline"
              square
              size="md"
              external
              to="#home"
            >
              <UIcon name="i-lucide-arrow-up" class="size-6" />
            </UButton>
          </div>
        </div>
      </div>
    </UContainer>
  </footer>
</template>

<script setup>
const { links } = useNavigation();
</script>
