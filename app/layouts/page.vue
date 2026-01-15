<template>
  <div>
    <ClientOnly>
      <AppHeader class="bg-primary" />
    </ClientOnly>

    <UMain as="main"><slot /> </UMain>
    <AppFooter />
  </div>
</template>
