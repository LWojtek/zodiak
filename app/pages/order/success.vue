<template>
  <section>
    <UContainer class="py-16 max-w-2xl text-center">
      <h1 class="text-3xl font-bold mb-6">
        Dziękujemy za złożenie zamówienia! 🎉
      </h1>

      <!-- ORDER NUMBER -->
      <p class="text-base mb-6">
        Numer zamówienia:
        <strong class="block text-success text-xl mt-1">
          {{ route.query.id }}
        </strong>
      </p>

      <!-- PAYMENT INFO -->
      <p v-if="isOnsitePayment" class="text-lg font-medium">
        Płatność nastąpi na miejscu przy odbiorze lub dostawie.
      </p>

      <p v-else class="text-lg text-success font-medium">
        Zamówienie zostało opłacone.
      </p>

      <!-- INFO -->
      <p class="text-lg font-medium">
        Oczekuj na email potwierdzający przyjęcie zamówienia.
      </p>

      <p class="text-lg font-medium mb-8">
        Pytania lub wątpliwości?
        <br />
        Zadzwoń:
        <UButton size="xl" variant="link" href="tel:+48607588452">
          607 588 452
        </UButton>
      </p>

      <!-- ACTIONS -->
      <div class="flex justify-center gap-4">
        <UButton color="primary" size="xl" to="/">
          Wróć na stronę główną
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
