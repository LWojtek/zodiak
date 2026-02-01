<template>
  <UTable
    v-model:expanded="expanded"
    :data="orders"
    :columns="columns"
    :loading="status === 'pending'"
    :ui="{ tr: 'data-[expanded=true]:bg-muted/30' }"
  >
    <!-- EXPANDED ROW -->
    <template #expanded="{ row }">
      <div class="p-4 space-y-3 text-sm">
        <div
          v-for="item in row.original.order_items"
          :key="item.id"
          class="border rounded-lg p-3"
        >
          <div class="flex justify-between font-medium">
            <span> {{ item.product_name }} × {{ item.qty }} </span>
            <span>
              {{
                new Intl.NumberFormat("pl-PL", {
                  style: "currency",
                  currency: "PLN",
                }).format(item.total_price)
              }}
            </span>
          </div>

          <!-- ADDONS -->
          <div
            v-if="item.order_item_addons?.length"
            class="mt-2 pl-4 text-xs text-muted space-y-1"
          >
            <div
              v-for="addon in item.order_item_addons"
              :key="addon.id"
              class="flex justify-between"
            >
              <span>+ {{ addon.name }}</span>
              <span>
                {{
                  new Intl.NumberFormat("pl-PL", {
                    style: "currency",
                    currency: "PLN",
                  }).format(addon.price * item.qty)
                }}
              </span>
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
</template>

<script setup>
import { h, resolveComponent } from "vue";

const supabase = useSupabaseClient();

const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");
const USelect = resolveComponent("USelect");

/* ===================== DATA ===================== */

const { data, refresh, status } = await useAsyncData(
  "admin-orders",
  async () => {
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
        fulfillment_method,
        total_price,
        currency,
        invoice_required,

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
  },
);

const orders = computed(() => data.value ?? []);

/* ===================== TABLE ===================== */

const expanded = ref({});

const updateOrder = async (id, payload) => {
  const { error } = await supabase.from("orders").update(payload).eq("id", id);

  const { data } = await supabase
    .from("orders")
    .update(payload)
    .eq("id", id)
    .select();

  console.log("UPDATED ROWS:", data);

  if (error) {
    console.error("ORDER UPDATE ERROR:", error);
    alert("Nie udało się zaktualizować zamówienia");
    return;
  }

  await refresh();
};

const { dictionary, getStatusLabel, getStatusColor } = useDictionary();

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
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => `#${row.getValue("id").slice(0, 8)}`,
  },
  {
    accessorKey: "created_at",
    header: "Data",
    cell: ({ row }) =>
      new Date(row.getValue("created_at")).toLocaleString("pl-PL"),
  },
  {
    accessorKey: "customer_name",
    header: "Klient",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      h(USelect, {
        size: "xs",
        modelValue: row.original.status,

        items: Object.values(dictionary.orderStatuses),
        valueKey: "value",
        labelKey: "label",

        color: getStatusColor(row.original.status, "orderStatuses"),

        "onUpdate:modelValue": (v) => {
          console.log("STATUS UPDATE:", v, typeof v);
          updateOrder(row.original.id, { status: v });
        },
      }),
  },

  {
    accessorKey: "payment_status",
    header: "Płatność",
    cell: ({ row }) =>
      h(USelect, {
        size: "xs",
        modelValue: row.original.payment_status,

        items: Object.values(dictionary.paymentStatuses),
        valueKey: "value",
        labelKey: "label",

        color: getStatusColor(row.original.payment_status, "paymentStatuses"),

        "onUpdate:modelValue": async (v) => {
          await updateOrder(row.original.id, { payment_status: v });
        },
      }),
  },

  {
    accessorKey: "total_price",
    header: "Suma",
    meta: {
      class: {
        th: "text-right",
        td: "text-right font-semibold",
      },
    },
    cell: ({ row }) =>
      new Intl.NumberFormat("pl-PL", {
        style: "currency",
        currency: "PLN",
      }).format(row.getValue("total_price")),
  },
];
</script>
