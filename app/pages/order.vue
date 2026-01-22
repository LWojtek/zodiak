<template>
  <div class="bg-almond-50 grow">
    <div class="bg-white">
      <UContainer class="py-6">
        <UButton variant="ghost" size="sm" to="/" class="-translate-x-4">
          <template #leading>
            <UIcon name="i-lucide-arrow-left" class="size-5" />
          </template>
          Powrót do strony głównej
        </UButton>
      </UContainer>
    </div>
    <UContainer class="py-6">
      <section class="mt-12">
        <h1>Strona do zamawiania</h1>
      </section>
    </UContainer>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "page",
});
</script>
