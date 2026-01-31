<template>
  <UForm
    class="sticky top-48 p-4 rounded-xl bg-white ring ring-default shadow-xs"
    :state="state"
    :schema="schema"
    @submit="handleSubmit"
    @error="handleError"
  >
    <OrderSummary />

    <USeparator class="my-4 uppercase">Dane kontaktowe</USeparator>

    <div class="grid grid-cols-2 gap-4">
      <UFormField required label="Imię i nazwisko" name="customer_name">
        <UInput
          class="w-full"
          size="xl"
          v-model="state.customer_name"
          placeholder="Jan Kowalski"
        />
      </UFormField>
      <UFormField required label="Numer telefonu" name="customer_phone">
        <UInput
          class="w-full"
          size="xl"
          v-model="state.customer_phone"
          placeholder="+48 123 456 789"
        />
      </UFormField>
      <UFormField
        class="col-span-2"
        required
        label="Adres e-mail"
        name="customer_email"
      >
        <UInput
          class="w-full"
          size="xl"
          v-model="state.customer_email"
          placeholder="jan@example.com"
        />
      </UFormField>
    </div>
    <USeparator class="my-4 uppercase"> Szczegóły zamówienia</USeparator>
    <div class="grid grid-cols-2 gap-4">
      <UFormField required label="Data dostawy/odbioru" name="service_date">
        <UInputDate
          ref="inputDate"
          class="w-full"
          v-model="state.service_date"
          :min-value="minServiceDate"
          :default-value="minServiceDate"
          size="xl"
        >
          <template #trailing>
            <UPopover :reference="inputDate?.inputsRef[3]?.$el">
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                icon="i-lucide-calendar"
                aria-label="Select a date"
                class="px-0"
              />

              <template #content>
                <UCalendar
                  v-model="state.service_date"
                  class="p-2"
                  :ui="{
                    cellTrigger:
                      'data-disabled:opacity-25 data-disabled:pointer-events-none',
                  }"
                  :default-value="minServiceDate"
                  :min-value="minServiceDate"
                />
              </template>
            </UPopover>
          </template>
        </UInputDate>
      </UFormField>
      <UFormField
        label="Preferowana godzina dostawy/odbioru"
        name="service_time"
      >
        <UInputTime
          class="w-full"
          size="xl"
          :min-value="minServiceTime"
          :max-value="maxServiceTime"
          v-model="state.service_time"
        />
      </UFormField>
      <UFormField
        class="col-span-2"
        label="Uwagi do zamówienia:"
        name="order_note"
      >
        <UTextarea
          class="w-full"
          :rows="4"
          size="xl"
          v-model="state.order_note"
          placeholder="Dodatkowe informacje, alergie, preferencje, inne..."
        />
      </UFormField>
    </div>
    <USeparator class="my-4 uppercase">
      Sposób realizacji zamówienia
    </USeparator>
    <UFormField name="order_fulfillment_method" class="col-span-2">
      <URadioGroup
        variant="card"
        size="xl"
        class="col-span-2"
        :ui="{ fieldset: 'grid grid-cols-2 gap-4', description: 'text-sm' }"
        :items="[
          {
            value: 'pickup',
            label: 'Odbiór osobisty',
          },
          {
            value: 'delivery',
            label: 'Dostawa +30 zł',
            description: 'Tylko na terenie gminy Czerwionka-Leszczyny',
          },
        ]"
        @update:model-value="
          handleDelivery($event === 'delivery' ? true : false)
        "
        v-model="state.order_fulfillment_method"
      />
    </UFormField>

    <UFormField
      v-if="state.order_fulfillment_method === 'delivery'"
      name="order_delivery_city"
      label="Adres dostawy"
      required
      class="mt-4"
    >
      <USelect
        v-model="state.order_delivery_city"
        :items="cities"
        value-key="label"
        size="xl"
        class="w-full"
        :rows="3"
        placeholder="Miejscowość"
      />
    </UFormField>
    <div
      v-if="state.order_fulfillment_method === 'delivery'"
      class="grid grid-cols-2 gap-4"
    >
      <UFormField
        name="order_delivery_street"
        label="Adres dostawy"
        required
        class="mt-4"
      >
        <UInput
          v-model="state.order_delivery_street"
          size="xl"
          class="w-full"
          :rows="3"
          placeholder="Ulica"
        />
      </UFormField>
      <UFormField
        name="order_delivery_street_number"
        label="Numer domu/lokalu"
        required
        class="mt-4"
      >
        <UInput
          v-model="state.order_delivery_street_number"
          size="xl"
          class="w-full"
          :rows="3"
          placeholder="Numer budynku / Lokalu"
        />
      </UFormField>
    </div>

    <USeparator class="my-4 uppercase">Płatność</USeparator>
    <div class="grid grid-cols-2 gap-4">
      <UFormField name="order_payment_method" class="col-span-2">
        <URadioGroup
          class="w-full"
          orientation="horizontal"
          variant="card"
          size="xl"
          :ui="{ fieldset: 'grid grid-cols-2 gap-4', description: 'text-sm' }"
          v-model="state.order_payment_method"
          :items="[
            {
              value: 'onsite',
              label: 'Płatność na miejscu',
              description: 'Gotówka lub karta',
            },
            {
              value: 'online',
              label: 'Płatność online (PayU)',
              description: 'BLIK, przelew, karta',
            },
          ]"
        />
      </UFormField>
      <UFormField name="order_invoice_required" class="col-span-2">
        <UCheckbox
          v-model="state.order_invoice_required"
          variant="card"
          label="Chcę faktuę VAT"
          :ui="{ description: 'text-sm' }"
          description="Podaj  dane firmy do wystawienia faktury"
          size="xl"
        />
      </UFormField>
    </div>
    <div
      v-if="state.order_invoice_required"
      class="grid grid-cols-2 gap-4 mt-4"
    >
      <UFormField name="company_name" label="Nazwa firmy" required>
        <UInput
          v-model="state.company_name"
          size="xl"
          class="w-full"
          placeholder="Firma Sp. z o.o."
        />
      </UFormField>
      <UFormField name="company_nip" label="NIP firmy" required>
        <UInput
          v-model="state.company_nip"
          size="xl"
          placeholder="123-456-78-90"
          class="w-full"
        />
      </UFormField>
      <UFormField
        name="company_address"
        label="Adres"
        required
        class="col-span-2"
      >
        <UInput
          v-model="state.company_address"
          size="xl"
          class="w-full"
          placeholder="ul. Przykładowa 1, 00-000"
        />
      </UFormField>
    </div>

    <p v-if="state.error" class="my-4 text-error font-semibold">
      {{ state.error }}
    </p>

    <UButton
      :loading="state.loading"
      :disabled="state.loading"
      size="xl"
      type="submit"
      class="w-full mt-8 justify-center"
    >
      Złóż zamówienie
    </UButton>
  </UForm>
</template>
<script setup>
import { object, string, lazy, mixed } from "yup";
import { today, getLocalTimeZone, parseTime } from "@internationalized/date";

const minServiceDate = computed(() => {
  return today(getLocalTimeZone()).add({ days: 14 });
});

const minServiceTime = parseTime("14:00");
const maxServiceTime = parseTime("19:00");

const { formatDateForDb, formatTimeForDb, isValidNip, todayCalendarDate } =
  useHelpers();

const state = reactive({
  customer_name: "",
  customer_phone: "",
  customer_email: "",
  service_date: null,
  service_time: null,
  order_note: "",
  order_fulfillment_method: "pickup",
  order_delivery_address: "",
  order_payment_method: "onsite",
  order_invoice_required: false,
  company_name: "",
  company_nip: "",
  company_address: "",

  loading: false,
  error: null,
});

state.service_date = minServiceDate.value;

const cities = [
  {
    label: "Czerwionka-Leszczyny",
    value: "czerwionka-leszczyny",
  },
  {
    label: "Bełk",
    value: "belk",
  },
  {
    label: "Palowice",
    value: "palowice",
  },
  {
    label: "Szczejkowice",
    value: "szczejkowice",
  },
  {
    label: "Stanowice",
    value: "stanowice",
  },
];

const inputDate = useTemplateRef("inputDate");

const schema = object({
  customer_name: string().required("To pole jest wymagane"),
  customer_phone: string().required("To pole jest wymagane"),
  customer_email: string()
    .required("To pole jest wymagane")
    .email("Wprowadź poprawny adres email"),
  service_date: string().required("To pole jest wymagane"),

  service_time: mixed()
    .required("To pole jest wymagane")
    .test("time-range", "Dostawy między 14:00 - 19:00", (value) => {
      if (!value) return false;
      const minutes = value.hour * 60 + value.minute;
      return minutes >= 14 * 60 && minutes <= 19 * 60;
    }),
  order_fulfillment_method: string().required("To pole jest wymagane"),

  order_delivery_city: lazy(() => {
    if (state.order_fulfillment_method === "pickup") {
      return string().nullable();
    }

    return string().required("To pole jest wymagane");
  }),
  order_delivery_street: lazy(() => {
    if (state.order_fulfillment_method === "pickup") {
      return string().nullable();
    }

    return string().required("To pole jest wymagane");
  }),
  order_delivery_street_number: lazy(() => {
    if (state.order_fulfillment_method === "pickup") {
      return string().nullable();
    }

    return string().required("To pole jest wymagane");
  }),
  company_name: lazy(() => {
    if (state.order_invoice_required) {
      return string().required("To pole jest wymagane");
    }

    return string().nullable();
  }),
  company_nip: lazy(() => {
    if (!state.order_invoice_required) {
      return string().nullable();
    }

    return string()
      .required("NIP jest wymagany")
      .test("valid-nip", "Nieprawidłowy numer NIP", (value) =>
        isValidNip(value),
      );
  }),

  company_address: lazy(() => {
    if (state.order_invoice_required) {
      return string().required("To pole jest wymagane");
    }

    return string().nullable();
  }),
});

const { cart, totalPrice, handleDelivery, delivery } = useOrder();

const handleSubmit = async () => {
  if (state.loading) return;
  state.loading = true;
  state.error = null;

  const isOnlyDeliveryInCart = cart.value.length === 1 && delivery.value;

  if (!cart.value.length || totalPrice.value <= 0 || isOnlyDeliveryInCart) {
    state.error = "Koszyk jest pusty.";
    state.loading = false;
    return;
  }

  const supabase = useSupabaseClient();

  try {
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        customer_name: state.customer_name,
        customer_email: state.customer_email,
        customer_phone: state.customer_phone,

        fulfillment_method: state.order_fulfillment_method,
        service_date: formatDateForDb(state.service_date),
        service_time: formatTimeForDb(state.service_time),
        delivery_address_city:
          state.order_fulfillment_method === "delivery"
            ? state.order_delivery_city
            : null,
        delivery_address_street:
          state.order_fulfillment_method === "delivery"
            ? state.order_delivery_street
            : null,
        delivery_address_street_number:
          state.order_fulfillment_method === "delivery"
            ? state.order_delivery_street_number
            : null,
        payment_method: state.order_payment_method,
        payment_status: "pending",
        status: "new",
        notes: state.order_note || null,
        total_price: totalPrice.value,
        currency: "PLN",
        invoice_required: state.order_invoice_required,
      })
      .select()
      .single();

    if (error) throw error;

    await supabase.from("order_items").insert(
      cart.value.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        product_name: item.name,
        unit_price: item.price,
        qty: item.qty,
        total_price: item.price * item.qty,
      })),
    );

    if (state.order_invoice_required) {
      await supabase.from("invoice_details").insert({
        order_id: order.id,
        company_name: state.company_name,
        company_nip: state.company_nip,
        company_address: state.company_address,
      });
    }

    console.log(state.order_payment_method);

    if (state.order_payment_method === "online") {
      const { redirectUrl } = await $fetch("/api/payu/create", {
        method: "POST",
        body: { orderId: order.id },
      });

      window.location.href = redirectUrl;
      return;
    }

    navigateTo(`/order/success?id=${order.id}&payment_method=onsite`);
  } catch (err) {
    state.error = "Coś poszło nie tak. Spróbuj ponownie później.";
  } finally {
    state.loading = false;
  }
};

const handleError = (payload) => {
  payload.errors.forEach((err, index) => {
    if (index) return;
    const target = document.getElementById(err.id);
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
};
</script>
