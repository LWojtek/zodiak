<template>
  <nav
    class="fixed top-0 pt-(--ui-header-height) transition duration-500 left-0 w-full h-auto bg-primary-950"
    :class="[open ? 'translate-y-0' : '-translate-y-full']"
  >
    <ul class="flex flex-col gap-4 relative mx-2 py-2">
      <li v-for="(link, index) in links" :key="index" class="h-full">
        <NuxtLink
          class="flex text-base px-2 py-4 items-center rounded-lg transition-colors duration-300 text-inverted/95 focus-visible:outline-secondary hover:text-secondary whitespace-nowrap"
          :to="`/#${link.id}`"
          :class="{ 'text-secondary bg-white/5': activeSection === link.id }"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>

    <div class="flex flex-col mx-4 py-6 border-y border-white/20">
      <NuxtLink
        class="flex px-2 py-3 gap-2 text-base items-center transition-colors duration-300 text-inverted/95 focus-visible:outline-secondary hover:text-secondary whitespace-nowrap"
        href="tel:+48607588452"
      >
        <UIcon name="i-lucide-phone" class="size-5" />
        <span>Imprezy:</span>
        607 588 452
      </NuxtLink>
      <NuxtLink
        class="flex px-2 py-3 gap-2 text-base items-center transition-colors duration-300 text-inverted/95 focus-visible:outline-secondary hover:text-secondary whitespace-nowrap"
        href="tel:+48327231703"
      >
        <UIcon name="i-lucide-phone" class="size-5" />
        <span>Kręgle:</span>
        32 723 17 03
      </NuxtLink>
    </div>

    <div class="flex mx-4 py-6">
      <NuxtLink
        class="flex gap-1 px-2 text-base items-center transition-colors duration-300 text-inverted/95 focus-visible:outline-secondary hover:text-secondary whitespace-nowrap"
        href="https://www.facebook.com/ZodiakCzerwionkaLeszczyny"
      >
        <UIcon name="i-lucide-facebook" class="size-6" />
      </NuxtLink>
      <NuxtLink
        class="flex gap-1 px-2 text-base items-center transition-colors duration-300 text-inverted/95 focus-visible:outline-secondary hover:text-secondary whitespace-nowrap"
        href="https://instagram.com/zodiakczerwionkaleszczyny"
      >
        <UIcon name="i-lucide-instagram" class="size-6" />
      </NuxtLink>
    </div>
  </nav>
</template>
<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  links: {
    type: Array,
    default: () => [],
  },
  activeSection: {
    type: String,
    default: "",
  },
});
</script>
