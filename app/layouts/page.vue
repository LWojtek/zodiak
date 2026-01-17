<template>
  <div>
    <ClientOnly>
      <PageHeader class="bg-primary" />
    </ClientOnly>

    <UMain as="main">
      <slot />
    </UMain>
    <PageFooter />
  </div>
</template>
