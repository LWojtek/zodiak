<template>
  <section>
    <UContainer class="py-16 max-w-2xl text-center">
      <h1 class="text-3xl font-bold mb-4">Dziękujemy za zamówienie 🎉</h1>

      <!-- ONLINE PAYMENT -->
      <p v-if="!isOnsitePayment" class="text-lg text-success mb-6">
        Płatność została zakończona pomyślnie. Twoje zamówienie zostało
        opłacone.
      </p>

      <!-- ONSITE PAYMENT -->
      <p v-else class="text-lg text-warning mb-6">
        Zamówienie zostało przyjęte.
        <br />
        Płatność nastąpi na miejscu przy odbiorze lub dostawie.
      </p>

      <p class="text-sm text-gray-500 mb-8">
        Numer zamówienia:
        <strong>{{ route.query.id }}</strong>
      </p>

      <div class="flex justify-center gap-4">
        <UButton color="primary" size="lg" to="/">
          Wróć na stronę główną
        </UButton>

        <UButton variant="outline" size="lg" to="/menu">
          Złóż kolejne zamówienie
        </UButton>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
definePageMeta({ layout: "page" });

const route = useRoute();

const paymentMethod = computed(() => route.query.payment_method);
const isOnsitePayment = computed(() => paymentMethod.value === "onsite");
</script>
