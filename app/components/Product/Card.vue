<template>
  <UCard>
    <div class="flex justify-between items-center">
      <div>
        <h3 class="font-semibold">{{ product.name }}</h3>
        <p class="text-sm text-gray-500">
          {{ formatPrice(product.price) }}
        </p>
      </div>

      <!-- ADD / +/- -->
      <div v-if="isInCart(product.id)" class="flex items-center gap-2">
        <UButton
          size="sm"
          variant="outline"
          @click="removeFromCart(product.id)"
        >
          <template #leading>
            <UIcon name="i-lucide-minus" />
          </template>
        </UButton>

        <span class="min-w-6 text-center">
          {{ getCartItem(product.id).qty }}
        </span>

        <UButton size="sm" variant="outline" @click="addToCart(product)">
          <template #leading>
            <UIcon name="i-lucide-plus" />
          </template>
        </UButton>
      </div>

      <UButton v-else size="sm" @click="addToCart(product)"> Dodaj </UButton>
    </div>
  </UCard>
</template>
<script setup>
defineProps({
  product: {
    type: Object,
    default: () => {},
  },
});
const { formatPrice, removeFromCart, addToCart, isInCart, getCartItem } =
  useOrder();
</script>
