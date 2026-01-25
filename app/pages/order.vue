<template>
  <div class="bg-almond-50 grow">
    <!-- HEADER -->
    <div
      class="sticky z-1 bg-white transition-all"
      :class="[isScrolled ? 'lg:top-18' : 'lg:top-22']"
    >
      <UContainer class="flex items-center justify-between py-4">
        <UButton variant="ghost" size="sm" to="/" class="-translate-x-4">
          <template #leading>
            <UIcon name="i-lucide-arrow-left" class="size-5" />
          </template>
          Powrót do strony głównej
        </UButton>

        <UBadge
          label="Catering Online"
          color="secondary"
          size="xl"
          variant="subtle"
        >
          <template #leading>
            <UIcon name="i-lucide-utensils" class="size-4.5" />
          </template>
        </UBadge>
      </UContainer>
    </div>

    <UContainer class="py-6">
      <section>
        <!-- HERO -->
        <div class="flex flex-col items-center gap-4 text-center">
          <h1 class="text-4xl lg:text-6xl font-bold font-display">
            Zamów wyśmienite dania
          </h1>
          <p>Wybierz z menu i złóż zamówienie online</p>
        </div>

        <!-- CONTENT -->
        <div class="mt-12 grid grid-cols-12 gap-6">
          <!-- LEFT -->
          <div class="col-span-12 lg:col-span-7">
            <div
              class="sticky flex transition-all flex-col gap-6"
              :class="[isScrolled ? 'top-40' : 'top-44']"
            >
              <!-- CATEGORIES -->
              <ProductFilter />

              <!-- PRODUCTS -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ProductCard
                  v-for="product in filteredProducts"
                  :key="product.id"
                  :product="product"
                />
              </div>
            </div>
          </div>

          <!-- RIGHT / CART -->
          <aside class="col-span-12 lg:col-span-5">
            <OrderForm />
          </aside>
        </div>
      </section>
    </UContainer>
  </div>
</template>

<script setup>
definePageMeta({ layout: "page" });

const { isScrolled } = useNavigation();
const { filteredProducts } = useOrder();
</script>
