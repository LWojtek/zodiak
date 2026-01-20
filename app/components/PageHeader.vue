<template>
  <header class="sticky top-0 z-50">
    <UContainer
      class="flex items-stretch gap-4 before:absolute before:top-0 before:left-0 before:w-full before:h-(--ui-header-height) before:bg-primary-950 before:z-5 lg:before:hidden"
    >
      <NuxtLink to="/" class="relative z-100 p-4 flex items-center">
        <img
          src="/images/logo.png"
          :class="[
            'transition-all duration-300',
            isScrolled ? 'h-4 lg:h-6' : 'h-6 lg:h-10',
          ]"
          alt="Logo Zodiak"
        />
      </NuxtLink>

      <NavigationBurger class="ml-auto lg:hidden" v-model:open="open" />

      <ClientOnly>
        <PageNavigation
          ref="pageNavigation"
          class="hidden lg:flex"
          :links="links"
          :active-section="activeSection"
          :underline-style="underlineStyle"
          :set-link-ref="setLinkRef"
        />
        <PageNavigationMobile
          class="block lg:hidden"
          :links="links"
          :active-section="activeSection"
          :open="open"
        />
      </ClientOnly>
    </UContainer>
  </header>
</template>
<script setup>
const route = useRoute();
const pageNavigation = ref();
const open = ref(false);

watch(
  () => route.fullPath,
  (newRoute) => {
    if (newRoute) {
      open.value = false;
    }
  },
);

const { links, activeSection, underlineStyle, setLinkRef, isScrolled } =
  useNavigation(pageNavigation.value?.listRef);
</script>
