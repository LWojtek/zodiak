<template>
  <div>
    <ClientOnly>
      <PageHeader class="bg-primary-950" />
    </ClientOnly>

    <UMain as="main">
      <slot />
    </UMain>
    <PageFooter />
  </div>
</template>
