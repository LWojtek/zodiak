<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <UButton
      class="p-0 sm:p-0 relative group rounded-lg overflow-hidden"
      v-for="(image, index) in images"
      :key="index"
      @click="openModal(index)"
    >
      <NuxtImg
        :src="image.src"
        class="w-full h-full transition-all duration-300 scale-100 group-hover:scale-125 object-cover"
        :alt="image.alt"
      />
      <div
        class="absolute flex flex-col inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <UButton
          class="absolute rounded-full p-2 sm:p-2 top-2 right-2 opacity-0 transition duration-300 group-hover:opacity-100"
          variant="outline"
          color="neutral"
          square
        >
          <template #leading>
            <UIcon class="size-5" name="i-lucide-search" />
          </template>
        </UButton>
        <div
          class="mt-auto p-4 flex flex-col gap-1 text-left w-full translate-y-full transition-all duration-300 group-hover:translate-y-0"
        >
          <p class="text-lg truncate">{{ image.alt }}</p>
          <p class="text-sm text-white/75">Kliknij, aby powiększyć</p>
        </div>
      </div>
    </UButton>

    <UModal
      v-model:open="state.open"
      @before-leave="state.index = 0"
      @after:enter="focus"
      :ui="{
        header: 'hidden',
        body: 'sm:p-0 p-0 h-full w-full',
        content:
          'ring-transparent overflow-visible bg-transparent shadow-none h-full w-full max-w-full lg:max-h-[calc(100vh-8rem)]',
      }"
    >
      <template #body>
        <UButton
          variant="outline"
          color="neutral"
          @click="state.open = false"
          aria-label="Zamknij"
          class="fixed top-0 right-4 rounded-full z-10 p-4"
        >
          <UIcon name="i-lucide-x" class="size-5" />
        </UButton>
        <UCarousel
          :start-index="state.index"
          v-slot="{ item }"
          :items="images"
          loop
          :arrows="true"
          class="absolute left-0 top-0 w-full h-full"
          :ui="{
            viewport: 'h-full',
            container: 'h-full',
            next: 'absolute top-1/2 sm:end-4 right-1 md:right-4 p-4',
            prev: 'absolute top-1/2 sm:start-4 left-1 md:left-4 p-4',
            item: 'flex items-center justify-center h-full',
          }"
        >
          <NuxtImg
            :src="item.src"
            :alt="item.alt"
            class="max-w-full max-h-full h-full object-contain rounded-lg"
          />
        </UCarousel>
      </template>
    </UModal>
  </section>
</template>
<script setup>
const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
});

const state = reactive({
  open: false,
  index: 0,
});

const openModal = (index) => {
  state.index = index;
  state.open = true;
};

const focus = async () => {
  await nextTick();

  requestAnimationFrame(() => {
    const el = document.querySelector('[aria-roledescription="carousel"]');
    console.log(el);

    el?.focus();
  });
};
</script>
