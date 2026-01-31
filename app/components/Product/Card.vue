<template>
  <UCard
    :ui="{
      header:
        'flex relative p-4 justify-between !border-b items-start sm:p-4 after:w-full after:h-px after:absolute after:bottom-0 after:left-0 after:bg-primary-100',
      footer: 'p-4 sm:p-4',
      body: 'p-0 sm:p-0',
      root: 'divide-none',
    }"
  >
    <template #header>
      <div>
        <h3 class="font-semibold text-base">{{ product.name }}</h3>

        <p class="text-sm text-muted">
          {{ suffix }}
        </p>
      </div>
      <UBadge size="lg" variant="outline">
        {{ formatPrice(product.price) }}
      </UBadge>
    </template>
    <UCollapsible
      v-model:open="open"
      class="relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-px before:bg-primary-100 origin-center before:transition"
      :class="{ 'before:scale-x-0': !open }"
    >
      <template #content>
        <ul :class="['grid gap-2 p-4 sm:p-4', dynamicGridCols]">
          <li v-for="section in product.sections" :key="section.id">
            <p class="font-bold rounded-lg mb-2">{{ section.title }}:</p>
            <ul class="text-muted text-base">
              <li v-for="item in section.product_section_items" :key="item.id">
                - {{ item.name }}
              </li>
            </ul>
          </li>
          <div v-if="product.addons && product.addons.length">
            <p class="font-bold rounded-lg mb-2">Dodatkowo płatne:</p>
            <ul>
              <li v-for="item in product.addons" :key="item.id">
                - {{ item.name }} <strong>(+{{ item.price }}zł)</strong>
              </li>
            </ul>
          </div>
        </ul>
      </template>
    </UCollapsible>

    <template #footer>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <UButton
          v-if="hasDetails"
          class="justify-center lg:col-start-3"
          variant="subtle"
          size="sm"
          @click="open = !open"
        >
          {{ open ? "Zwiń" : "Rozwiń" }} szczegóły
        </UButton>

        <div class="flex justify-between items-center lg:col-start-4">
          <!-- ADD / +/- -->
          <div
            v-if="isInCart(product.id)"
            class="flex items-center gap-2 w-full rounded-lg pl-5 pr-1 py-1 border border-primary-100"
          >
            <span class="justify-start"> Ilość </span>
            <UButton
              size="sm"
              variant="subtle"
              @click="removeFromCart(product.id)"
              class="ml-auto"
            >
              <template #leading>
                <UIcon name="i-lucide-minus" />
              </template>
            </UButton>

            <span class="min-w-6 text-center">
              {{ getCartItem(product.id).qty }}
            </span>

            <UButton size="sm" variant="subtle" @click="addToCart(product)">
              <template #leading>
                <UIcon name="i-lucide-plus" />
              </template>
            </UButton>
          </div>

          <UButton
            v-else
            size="sm"
            class="w-full justify-center"
            @click="addToCart(product)"
            leading-icon="i-lucide-plus"
          >
            Dodaj
          </UButton>
        </div>
      </div>
    </template>
  </UCard>
</template>
<script setup>
const props = defineProps({
  product: {
    type: Object,
    default: () => {},
  },
});
const { formatPrice, removeFromCart, addToCart, isInCart, getCartItem } =
  useOrder();

const open = ref(false);

const hasDetails = computed(() => {
  return (
    (props.product.sections && props.product.sections.length > 0) ||
    (props.product.addons && props.product.addons.length > 0)
  );
});

const suffix = computed(() => {
  if (props.product.min_people && props.product.max_people) {
    return `${props.product.min_people} - ${props.product.max_people} osób`;
  } else {
    return props.product.min_people
      ? `${props.product.min_people} osób`
      : `${props.product.max_people} osób`;
  }
});

const dynamicGridCols = computed(() => {
  const sectionCount = props.product.sections
    ? props.product.sections.length
    : 0;
  const hasAddons = props.product.addons && props.product.addons.length > 0;
  const totalItems = sectionCount + (hasAddons ? 1 : 0);

  // Mobile always 1 col, desktop adapts to item count
  if (totalItems === 1) return "grid-cols-1";
  if (totalItems === 2) return "grid-cols-1 sm:grid-cols-2";
  return "grid-cols-1 sm:grid-cols-3";
});
</script>
