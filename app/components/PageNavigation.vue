<template>
  <nav class="flex gap-3 md:gap-4 xl:gap-6 items-center ml-auto relative">
    <ul id="nav-container" class="flex gap-6 h-full items-center relative mx-2">
      <li v-for="(link, index) in links" :key="index" class="h-full">
        <NuxtLink
          :ref="(el) => setLinkRef(el, index)"
          class="flex text-sm xl:text-base items-center h-full transition-colors duration-300 text-inverted/95 focus-visible:outline-secondary hover:text-secondary whitespace-nowrap"
          :to="`#${link.id}`"
          :class="{ 'text-secondary': activeSection === link.id }"
        >
          {{ link.label }}
        </NuxtLink>
      </li>

      <!-- underline track -->
      <div class="absolute bottom-0 left-0 w-full h-0.75 pointer-events-none" />

      <!-- moving underline -->
      <div
        class="absolute bottom-0 h-0.75 rounded-t-lg bg-secondary transition-all duration-300 ease-out pointer-events-none"
        :style="underlineStyle"
      />
    </ul>
    <USeparator orientation="vertical" class="border-muted h-1/3" />
    <div class="flex self-stretch">
      <NuxtLink
        class="flex px-2 gap-2 text-sm xl:text-base items-center transition-colors duration-300 text-inverted/95 focus-visible:outline-secondary hover:text-secondary whitespace-nowrap"
        href="tel:+48607588452"
      >
        <UIcon name="i-lucide-phone" class="size-4 xl:size-5" />
        <span class="hidden xl:inline">Imprezy:</span>
        607 588 452
      </NuxtLink>
      <NuxtLink
        class="flex px-2 gap-2 text-sm xl:text-base items-center transition-colors duration-300 text-inverted/95 focus-visible:outline-secondary hover:text-secondary whitespace-nowrap"
        href="tel:+48327231703"
      >
        <UIcon name="i-lucide-phone" class="size-4 xl:size-5" />
        <span class="hidden xl:inline">Kręgle:</span>
        32 723 17 03
      </NuxtLink>
    </div>

    <USeparator orientation="vertical" class="border-muted h-1/3" />

    <div class="flex self-stretch">
      <NuxtLink
        class="flex gap-1 px-2 text-sm xl:text-base items-center transition-colors duration-300 text-inverted/95 focus-visible:outline-secondary hover:text-secondary whitespace-nowrap"
        target="_blank"
        href="https://www.facebook.com/ZodiakCzerwionkaLeszczyny"
      >
        <UIcon name="i-lucide-facebook" class="size-5" />
      </NuxtLink>
      <NuxtLink
        class="flex gap-1 px-2 text-sm xl:text-base items-center transition-colors duration-300 text-inverted/95 focus-visible:outline-secondary hover:text-secondary whitespace-nowrap"
        target="_blank"
        href="https://www.instagram.com/p/DDKWa7LoYRW/?utm_source=ig_web_copy_link"
      >
        <UIcon name="i-lucide-instagram" class="size-5" />
      </NuxtLink>
    </div>
  </nav>
</template>
<script setup>
const props = defineProps({
  links: {
    type: Array,
    default: () => [],
  },
  activeSection: {
    type: String,
    default: null,
  },
  setLinkRef: {
    type: Function,
  },
  underlineStyle: {
    type: Object,
  },
});
const listRef = ref();

defineExpose({ listRef });
</script>
