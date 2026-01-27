<template>
  <footer class="py-8 bg-akaroa-950">
    <UContainer class="flex flex-col md:flex-row flex-wrap">
      <div
        class="flex flex-col items-center md:items-start text-center md:text-left gap-6 w-full md:w-4/12"
      >
        <AppLogo classes="w-40" />
        <p class="text-white/85">
          Przyjęcia okolicznościowe, catering oraz pub z kręgielnią. Tworzymy
          wyjątkowe wspomnienia od ponad 20 lat.
        </p>
        <div class="flex gap-2 md:-translate-x-3 mt-auto">
          <UButton
            label="Instagram"
            variant="link"
            class="text-sm gap-3 justify-center"
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
            class="text-sm gap-3 justify-center"
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
      <div
        class="grid grid-cols-2 gap-8 md:gap-0 w-full md:w-8/12 py-6 md:py-0 border-t md:border-none mt-6 md:mt-0 md:px-24"
      >
        <div
          class="col-span-2 xs:col-span-1 flex flex-col items-stretch md:items-start text-center gap-2 md:gap-6"
        >
          <p class="text-lg uppercase font-semibold text-secondary">Menu</p>
          <div class="flex flex-col gap-1 md:-translate-x-3">
            <UButton
              v-for="(link, index) in links"
              :key="index"
              :href="link.to"
              external
              variant="link"
              color="secondary"
              size="md"
              class="text-sm justify-center md:justify-start"
            >
              {{ link.label }}
            </UButton>
          </div>
        </div>
        <div
          class="col-span-2 xs:col-span-1 flex flex-col items-center md:items-start gap-2 md:gap-6 w-full"
        >
          <p class="text-lg uppercase font-semibold text-secondary">Kontakt</p>
          <div class="flex flex-col gap-1 md:-translate-x-3">
            <UButton
              external
              href="tel:+48607588452"
              variant="link"
              color="secondary"
              class="text-sm gap-3 justify-center md:justify-start"
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
              class="text-sm gap-3 justify-center md:justify-start"
              size="md"
            >
              <UIcon
                name="i-lucide-phone"
                class="min-w-4 size-4 xl:size-5 xl:min-w-5"
              />
              <span class="hidden xl:inline">Kręgle:</span>
              32 723 17 03
            </UButton>
          </div>
        </div>
      </div>
      <div class="gap-6 w-full flex flex-col items-center py-8 border-y my-4">
        <NuxtLink
          to="/eu-funding"
          target="blank"
          aria-label="Ten link otwiera się w nowej zakładce"
          class="text-white/85 cursor-pointer text-sm underline hover:text-secondary"
        >
          Projekt wspierany przez Unię Europejską
        </NuxtLink>
        <img
          src="/images/kpo.webp"
          class="w-full md:w-auto md:max-h-16"
          alt="Naklejka KPO"
        />
      </div>
      <div class="col-span-12 w-full">
        <div
          class="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p class="text-white/85 text-sm">
            © 2026 Zodiak. Wszelkie prawa zastrzeżone.
          </p>

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
