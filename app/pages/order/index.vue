<template>
  <div class="relative bg-almond-50 grow">
    <div v-if="loading" class="absolute top-0 left-0 w-full h-full">
      <Spinner class="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
    <template v-else>
      <div
        class="sticky z-1 bg-white transition-all"
        :class="[isScrolled ? 'lg:top-18' : 'lg:top-20']"
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
            <h1 class="text-3xl lg:text-6xl font-bold font-display">
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
                <div class="flex flex-col gap-4">
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
    </template>
  </div>
</template>

<script setup>
definePageMeta({ layout: "page" });

const { isScrolled } = useNavigation();
const { filteredProducts, categories, products } = useOrder();

const supabase = useSupabaseClient();
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  error.value = null;

  try {
    const [catRes, prodRes] = await Promise.all([
      supabase.from("categories").select("id, name, slug").order("name"),

      supabase
        .from("products")
        .select(
          `
          id,
          name,
          category_id,
          categories ( slug ),
          product_prices (
            price,
            min_people,
            max_people
          ),
          product_sections (
            id,
            title,
            product_section_items ( id, name )
          ),
          product_addons ( id, name, price )
        `,
        )
        .eq("is_active", true)
        .order("name"),
    ]);

    if (catRes.error) throw catRes.error;
    if (prodRes.error) throw prodRes.error;

    categories.value = [{ slug: "all", name: "Wszystkie" }, ...catRes.data];

    products.value = prodRes.data.map((p) => ({
      id: p.id,
      name: p.name,
      category_slug: p.categories?.slug ?? "other",
      price: p.product_prices?.[0]?.price ?? 0,
      min_people: p.product_prices?.[0]?.min_people,
      max_people: p.product_prices?.[0]?.max_people,
      sections: p.product_sections ?? [],
      addons: p.product_addons ?? [],
    }));
  } catch (e) {
    console.error(e);
    error.value = "Nie udało się załadować menu.";
  } finally {
    loading.value = false;
  }
});
</script>
