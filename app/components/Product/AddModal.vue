<template>
  <UModal
    v-model:open="open"
    :title="product?.name || 'Dodaj do koszyka'"
    :ui="{ content: 'max-w-2xl' }"
    @after:leave="reset"
  >
    <template #body>
      <div v-if="!product" class="text-sm text-muted">Brak danych produktu</div>

      <div v-else class="flex flex-col gap-4">
        <!-- SECTIONS PREVIEW -->
        <div
          v-if="hasSections"
          class="rounded-lg border border-primary-100 p-4"
        >
          <p class="font-semibold mb-2">Skład</p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="s in product.sections" :key="s.id">
              <p class="font-medium mb-1">{{ s.title }}</p>
              <ul class="text-sm text-muted">
                <li v-for="i in s.product_section_items" :key="i.id">
                  - {{ i.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- ADDONS -->
        <div
          v-if="hasAddons"
          class="rounded-lg border border-primary-100 p-4 flex flex-col gap-3"
        >
          <p class="font-semibold">Dodatki</p>

          <div class="flex flex-col gap-2">
            <UCheckbox
              v-for="a in product.addons"
              :key="a.id"
              :model-value="selectedIds.has(a.id)"
              @update:model-value="toggleAddon(a, $event)"
              :label="`${a.name} (+${formatPrice(a.price)})`"
              size="lg"
            />
          </div>
        </div>

        <!-- PRICE SUMMARY -->
        <div
          class="rounded-lg bg-primary/5 p-4 flex items-center justify-between"
        >
          <div class="text-sm text-muted">
            Cena bazowa: <strong>{{ formatPrice(basePrice) }}</strong>
            <span v-if="addonsPrice > 0">
              · Dodatki: <strong>{{ formatPrice(addonsPrice) }}</strong>
            </span>
          </div>
          <div class="text-base font-semibold">
            Razem: {{ formatPrice(totalUnitPrice) }}
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-between gap-4 grow">
        <UButton variant="subtle" size="sm" @click="open = false">
          Anuluj
        </UButton>
        <UButton size="sm" @click="confirm"> Dodaj do koszyka </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  product: { type: Object, default: null },
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const open = defineModel("open", {
  type: Boolean,
  default: false,
});

const { formatPrice } = useOrder();

const selected = ref([]);
const selectedIds = computed(() => new Set(selected.value.map((x) => x.id)));

const hasAddons = computed(() => (props.product?.addons?.length ?? 0) > 0);
const hasSections = computed(() => (props.product?.sections?.length ?? 0) > 0);

const basePrice = computed(() => Number(props.product?.price ?? 0));
const addonsPrice = computed(() =>
  selected.value.reduce((sum, a) => sum + Number(a.price ?? 0), 0),
);

const totalUnitPrice = computed(() => basePrice.value + addonsPrice.value);

const toggleAddon = (addon, checked) => {
  if (checked) {
    selected.value = [...selected.value, addon];
  } else {
    selected.value = selected.value.filter((x) => x.id !== addon.id);
  }
};

const reset = () => {
  selected.value = [];
};

const confirm = () => {
  emit("confirm", {
    product: props.product,
    addons: selected.value,
    unitPrice: totalUnitPrice.value,
  });
  open.value = false;
};
</script>
