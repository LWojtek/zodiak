<template>
  <section>
    <UContainer class="relative py-16 max-w-2xl min-h-96 text-center">
      <div
        v-if="status === 'pending'"
        class="absolute top-1/2 left-1/2 -translate-1/2"
      >
        <Spinner class="mt-12 mx-auto" />
      </div>
      <template v-else>
        <h1 class="text-3xl font-bold mb-6">
          Dziękujemy za złożenie zamówienia! 🎉
        </h1>

        <!-- ORDER NUMBER -->
        <p class="text-base mb-6">
          Numer zamówienia:
          <strong class="block text-success text-xl mt-1">
            #
            {{ orderNumber }}
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
      </template>
    </UContainer>
  </section>
</template>

<script setup>
definePageMeta({ layout: "page" });

const route = useRoute();
const supabase = useSupabaseClient();

const paymentMethod = computed(() => route.query.payment_method);
const isOnsitePayment = computed(() => paymentMethod.value === "onsite");

const { data, status } = useAsyncData("order-success", async () => {
  if (!route.query.id) return null;

  const { data, error } = await supabase
    .from("orders")
    .select("order_number")
    .eq("id", route.query.id)
    .single();

  if (error) throw error;
  return data;
});

/* -------------------------
   COMPUTED ORDER NUMBER
-------------------------- */
const orderNumber = computed(() => data.value?.order_number ?? null);
</script>
