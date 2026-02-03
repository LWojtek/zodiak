<template>
  <div>
    <!-- HEADER -->
    <div class="flex items-center gap-4">
      <div
        class="flex items-center justify-center p-2 rounded-lg text-primary bg-primary/10 ring ring-accented"
      >
        <UIcon class="size-6" name="i-lucide-shopping-bag" />
      </div>
      <div>
        <h2 class="text-xl font-semibold">Twoje zamówienie</h2>
        <p class="text-sm">{{ cart.length }} pozycji</p>
      </div>
    </div>

    <!-- CART ITEMS -->
    <div v-if="cart.length" class="mt-4 space-y-3">
      <div
        v-for="item in cart"
        :key="item.key"
        class="flex flex-col gap-1 text-sm"
      >
        <!-- PRODUCT -->
        <div class="flex justify-between font-medium">
          <span>{{ item.name }} × {{ item.qty }}</span>
          <span>
            {{ formatPrice(item.basePrice * item.qty) }}
          </span>
        </div>

        <!-- ADDONS -->
        <div
          v-if="item.addons?.length"
          class="pl-4 text-xs text-muted space-y-1"
        >
          <div
            v-for="addon in item.addons"
            :key="addon.id"
            class="flex justify-between"
          >
            <span>+ {{ addon.name }} × {{ item.qty }}</span>
            <span>
              {{ formatPrice(addon.price * item.qty) }}
            </span>
          </div>
        </div>

        <!-- ITEM TOTAL (optional, comment out if you don’t want it) -->
        <div class="flex justify-between text-xs text-muted pt-1">
          <span>Razem</span>
          <span>
            {{ formatPrice(item.unitPrice * item.qty) }}
          </span>
        </div>
      </div>

      <!-- TOTAL -->
      <div class="border-t border-default pt-3 mt-3">
        <div
          class="flex justify-between font-semibold rounded-lg border border-accented p-4 bg-primary/10"
        >
          <span>Suma</span>
          <span>{{ formatPrice(totalPrice) }}</span>
        </div>
      </div>
    </div>

    <p v-else class="text-sm text-gray-400 mt-4">Koszyk jest pusty</p>
  </div>
</template>

<script setup>
const { formatPrice, totalPrice, cart } = useOrder();
</script>
