<template>
  <div class="flex flex-col">
    <ClientOnly>
      <PageHeader class="bg-primary-950" />
    </ClientOnly>

    <UMain as="main" class="flex flex-col grow">
      <slot />
    </UMain>
    <PageFooter />
  </div>
</template>
