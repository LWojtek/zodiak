<template>
  <!-- FILTERS -->
  <div
    class="grid justify-end grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-4"
  >
    <UFormField label="Status zamówienia">
      <USelect
        v-model="filterStatus"
        :items="statusFilterOptions"
        nullable
        clearable
        class="w-full"
      />
    </UFormField>
    <UFormField label="Status płatności">
      <USelect
        v-model="filterPaymentStatus"
        :items="paymentStatusFilterOptions"
        nullable
        clearable
        class="w-full"
      />
    </UFormField>
    <UFormField label="Sposób realizacji">
      <USelect
        v-model="filterFulfillmentMethod"
        :items="fulfillmentMethodFilterOptions"
        nullable
        clearable
        class="w-full"
      />
    </UFormField>
    <UFormField label="Typ dokumentu">
      <USelect
        v-model="filterInvoiceRequired"
        :items="invoiceFilterOptions"
        nullable
        clearable
        class="w-full"
      />
    </UFormField>
  </div>

  <div class="overflow-x-auto rounded-lg border border-primary-100 bg-white">
    <UTable
      v-model:expanded="expanded"
      v-model:row-selection="rowSelection"
      :data="filteredOrders"
      :columns="columns"
      :loading="status === 'pending'"
      :ui="{
        tr: 'data-[selected=true]:bg-success/10',
        th: 'bg-primary/10 md:text-sm',
        td: 'text-xs md:text-sm p-2 md:p-3',
      }"
    >
      <!-- EXPANDED ROW -->
      <template #expanded="{ row }">
        <div class="p-2">
          <div
            :class="[
              'grid gap-6',
              'grid-cols-1',
              row.original.invoice_required && row.original.invoice_details
                ? 'md:grid-cols-2 lg:grid-cols-3'
                : 'md:grid-cols-2',
            ]"
          >
            <!-- COLUMN 1: ORDER ITEMS -->
            <div
              class="space-y-3 bg-primary/10 p-4 rounded-lg border border-primary-300"
            >
              <h4 class="text-sm font-semibold text-primary mb-2">
                Pozycje zamówienia
              </h4>
              <div class="space-y-2">
                <div
                  v-for="item in row.original.order_items"
                  :key="item.id"
                  class="text-sm"
                >
                  <div class="flex justify-between">
                    <span>{{ item.product_name }} × {{ item.qty }}</span>
                    <span class="font-semibold">
                      {{
                        new Intl.NumberFormat("pl-PL", {
                          style: "currency",
                          currency: "PLN",
                        }).format(item.total_price)
                      }}
                    </span>
                  </div>
                  <div v-if="item.order_item_addons?.length" class="pl-3 mt-2">
                    <div
                      v-for="addon in item.order_item_addons"
                      :key="addon.id"
                      class="flex gap-4"
                    >
                      <span>+ {{ addon.addon_name }}</span>
                      <span>{{
                        new Intl.NumberFormat("pl-PL", {
                          style: "currency",
                          currency: "PLN",
                        }).format(addon.addon_price * item.qty)
                      }}</span>
                    </div>
                  </div>
                </div>

                <div
                  v-if="row.original.fulfillment_method === 'delivery'"
                  class="text-sm pt-2 border-t border-primary-300"
                >
                  <div class="flex justify-between">
                    <span>Dostawa</span>
                    <span class="font-semibold">
                      {{
                        new Intl.NumberFormat("pl-PL", {
                          style: "currency",
                          currency: "PLN",
                        }).format(calculateDeliveryPrice(row.original))
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- COLUMN 2: SERVICE & CUSTOMER INFO -->
            <div
              class="space-y-3 bg-primary/10 p-4 rounded-lg border border-primary-300"
            >
              <h4 class="text-sm font-semibold text-primary mb-2">
                Dane realizacji
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>Data:</span>
                  <span class="font-medium text-sm">{{
                    new Date(row.original.service_date).toLocaleDateString(
                      "pl-PL",
                    )
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Godzina:</span>
                  <span class="font-medium text-sm">
                    {{ row.original.service_time }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span>Metoda:</span>
                  <span class="font-medium text-sm">{{
                    row.original.fulfillment_method === "delivery"
                      ? "Dostawa"
                      : "Odbiór osobisty"
                  }}</span>
                </div>
              </div>

              <template v-if="row.original.fulfillment_method === 'delivery'">
                <h4 class="text-sm font-semibold text-primary my-3">
                  Adres dostawy
                </h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span>Miejscowość:</span>
                    <span class="font-medium text-sm">{{
                      row.original.delivery_address_city
                    }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Ulica:</span>
                    <span class="font-medium text-sm"
                      >{{ row.original.delivery_address_street }}
                      {{ row.original.delivery_address_street_number }}</span
                    >
                  </div>
                </div>
              </template>

              <h4 class="text-sm font-semibold text-primary my-3">
                Dane kontaktowe
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>Telefon:</span>
                  <span class="font-medium text-sm">{{
                    row.original.customer_phone
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Email:</span>
                  <span class="font-medium break-all">{{
                    row.original.customer_email
                  }}</span>
                </div>
              </div>
            </div>

            <!-- COLUMN 3: INVOICE (conditional) -->
            <div
              v-if="
                row.original.invoice_required && row.original.invoice_details
              "
              class="space-y-3 bg-primary/10 p-4 rounded-lg border border-primary-300"
            >
              <h4 class="text-sm font-semibold text-primary mb-2">
                Dane do faktury
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>Firma:</span>
                  <span class="font-medium text-sm">{{
                    row.original.invoice_details.company_name
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span>NIP:</span>
                  <span class="font-medium text-sm">{{
                    row.original.invoice_details.company_nip
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Adres:</span>
                  <span class="font-medium text-right">{{
                    row.original.invoice_details.company_address
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        <div
          class="flex items-center justify-center min-h-24 text-sm text-gray-500"
        >
          Brak zamówień
        </div>
      </template>

      <template #loading>
        <div class="min-h-40 flex items-center justify-center">
          <Spinner />
        </div>
      </template>
    </UTable>
  </div>
</template>

<script setup>
import { h, resolveComponent } from "vue";

const supabase = useSupabaseClient();

const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");
const USelect = resolveComponent("USelect");

const selectedRows = ref({});

/* ===================== DATA ===================== */

const { data, refresh, status } = useAsyncData("admin-orders", async () => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
        id,
        created_at,
        customer_name,
        customer_email,
        customer_phone,
        status,
        payment_status,
        payment_method,
        fulfillment_method,
        total_price,
        currency,
        invoice_required,

				service_date,
				service_time,

				delivery_address_city,
				delivery_address_street,
				delivery_address_street_number,

        invoice_details (
          company_name,
          company_nip,
          company_address
        ),

        order_items (
          id,
          product_id,
          product_name,
          unit_price,
          qty,
          total_price,

          order_item_addons (
            id,
            addon_id,
            addon_name,
            addon_price,
            qty
          )
        )
      `,
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
});

const orders = computed(() => data.value ?? []);

const filterStatus = ref(null);
const filterPaymentStatus = ref(null);
const filterFulfillmentMethod = ref(null);
const filterInvoiceRequired = ref(null);

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const statusMatch =
      !filterStatus.value || order.status === filterStatus.value;
    const paymentMatch =
      !filterPaymentStatus.value ||
      order.payment_status === filterPaymentStatus.value;
    const fulfillmentMatch =
      !filterFulfillmentMethod.value ||
      order.fulfillment_method === filterFulfillmentMethod.value;
    const invoiceMatch =
      filterInvoiceRequired.value === null ||
      order.invoice_required === filterInvoiceRequired.value;
    return statusMatch && paymentMatch && fulfillmentMatch && invoiceMatch;
  });
});

const rowSelection = computed({
  get() {
    return selectedRows.value;
  },
  set(value) {
    selectedRows.value = value;
  },
});

watch(
  orders,
  (newOrders) => {
    newOrders.forEach((order, index) => {
      if (order.payment_status === "paid" && order.status === "completed") {
        selectedRows.value[index] = true;
      }
    });
  },
  { deep: true, immediate: true },
);

/* ===================== TABLE ===================== */

const expanded = ref({});

const updateOrder = async (id, payload) => {
  const { error } = await supabase.from("orders").update(payload).eq("id", id);

  const { data } = await supabase
    .from("orders")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) {
    console.error("ORDER UPDATE ERROR:", error);
    alert("Nie udało się zaktualizować zamówienia");
    return;
  }

  await refresh();
};

const calculateDeliveryPrice = (order) => {
  const itemsTotal = order.order_items.reduce(
    (sum, item) => sum + item.total_price,
    0,
  );
  return order.total_price - itemsTotal;
};

const { dictionary } = useDictionary();

const statusFilterOptions = computed(() => [
  { value: null, label: "Wszystkie" },
  ...Object.values(dictionary.orderStatuses),
]);

const paymentStatusFilterOptions = computed(() => [
  { value: null, label: "Wszystkie" },
  ...Object.values(dictionary.paymentStatuses),
]);

const fulfillmentMethodFilterOptions = [
  { value: null, label: "Wszystkie" },
  { value: "pickup", label: "Odbiór osobisty" },
  { value: "delivery", label: "Dostawa" },
];

const invoiceFilterOptions = [
  { value: null, label: "Wszystkie" },
  { value: true, label: "Faktura VAT" },
  { value: false, label: "Paragon" },
];

const columns = [
  {
    id: "expand",
    cell: ({ row }) =>
      h(UButton, {
        variant: "ghost",
        icon: "i-lucide-chevron-down",
        square: true,
        ui: {
          leadingIcon: [
            "transition-transform",
            row.getIsExpanded() ? "rotate-180" : "",
          ],
        },
        onClick: () => row.toggleExpanded(),
      }),
  },
  {
    accessorKey: "customer_name",
    header: "Klient",
  },
  // {
  //   accessorKey: "id",
  //   header: "#",
  //   cell: ({ row }) => `#${row.getValue("id").slice(0, 8)}`,
  // },
  {
    accessorKey: "invoice_required",
    header: "Paragon/Faktura",
    cell: ({ row }) =>
      row.original.invoice_required ? "Faktura VAT" : "Paragon",
  },
  {
    accessorKey: "status",
    header: "Status zamówienia",
    cell: ({ row }) =>
      h(USelect, {
        size: "md",
        modelValue: row.original.status,

        items: Object.values(dictionary.orderStatuses),
        valueKey: "value",
        labelKey: "label",
        class: "min-w-32",

        "onUpdate:modelValue": (v) => {
          console.log("STATUS UPDATE:", v, typeof v);
          updateOrder(row.original.id, { status: v });
        },
      }),
  },

  {
    accessorKey: "payment_status",
    header: "Status płatności",
    cell: ({ row }) =>
      row.original.payment_method === "online"
        ? dictionary.paymentStatuses[row.original.payment_status].label
        : h(USelect, {
            size: "md",
            modelValue: row.original.payment_status,
            items: Object.values(dictionary.paymentStatuses),
            valueKey: "value",
            labelKey: "label",
            class: "min-w-32",
            disabled: row.original.payment_method === "online",

            "onUpdate:modelValue": async (v) => {
              await updateOrder(row.original.id, { payment_status: v });
            },
          }),
  },

  {
    accessorKey: "total_price",
    header: "Wartość zamówienia",

    cell: ({ row }) =>
      new Intl.NumberFormat("pl-PL", {
        style: "currency",
        currency: "PLN",
      }).format(row.getValue("total_price")),
  },
  // {
  //   accessorKey: "created_at",
  //   header: "Data złożenia zamówienia",
  //   cell: ({ row }) =>
  //     new Date(row.getValue("created_at")).toLocaleString("pl-PL"),
  // },
  {
    accessorKey: "service_date",
    header: "Data realizacji",
    cell: ({ row }) =>
      new Date(row.getValue("service_date")).toLocaleDateString("pl-PL") +
      " " +
      row.original.service_time,
  },
  {
    accessorKey: "fulfillment_method",
    header: "Typ",
    cell: ({ row }) => {
      const type = row.original.fulfillment_method;

      return h(
        UBadge,
        {
          variant: "subtle",
          size: "lg",
          leadingIcon:
            type === "delivery" ? "i-lucide-car" : "i-lucide-hand-platter",
        },
        () => (type === "delivery" ? "Dostawa" : "Odbiór osobisty"),
      );
    },
  },
  {
    id: "actions",
  },
];
</script>
