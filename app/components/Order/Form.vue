<template>
  <UForm
    class="sticky top-48 p-4 rounded-xl bg-white ring ring-default shadow-xs"
    :state="state"
    :schema="schema"
    @submit="handleSubmit"
    @error="handleError"
  >
    <OrderSummary />

    <USeparator class="my-8 uppercase">Dane kontaktowe</USeparator>

    <div class="grid grid-cols-2 gap-4">
      <UFormField required label="Imię i nazwisko" name="customer_name">
        <UInput
          class="w-full"
          size="xl"
          variant="subtle"
          v-model="state.customer_name"
          placeholder="Jan Kowalski"
        />
      </UFormField>
      <UFormField required label="Numer telefonu" name="customer_phone">
        <UInput
          class="w-full"
          size="xl"
          variant="subtle"
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
          variant="subtle"
          size="xl"
          v-model="state.customer_email"
          placeholder="jan@example.com"
        />
      </UFormField>
    </div>
    <USeparator class="my-8 uppercase"> Szczegóły wydarzenia </USeparator>
    <div class="grid grid-cols-2 gap-4">
      <UFormField required label="Data dostawy" name="order_delivery_date">
        <UInputDate
          ref="inputDate"
          class="w-full"
          v-model="state.order_delivery_date"
          :min-value="todayCalendarDate()"
          size="xl"
          variant="subtle"
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
                  v-model="state.order_delivery_date"
                  class="p-2"
                  :min-value="todayCalendarDate()"
                />
              </template>
            </UPopover>
          </template>
        </UInputDate>
      </UFormField>
      <UFormField
        label="Preferowana godzina dostawy"
        name="order_delivery_time"
      >
        <UInputTime
          class="w-full"
          size="xl"
          variant="subtle"
          v-model="state.order_delivery_time"
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
          variant="subtle"
          v-model="state.order_note"
          placeholder="Dodatkowe informacje, alergie, preferencje, inne..."
        />
      </UFormField>
    </div>
    <USeparator class="my-8 uppercase">Płatność</USeparator>
    <div class="grid grid-cols-2 gap-4">
      <UFormField name="order_payment_method" class="col-span-2">
        <URadioGroup
          class="w-full"
          orientation="horizontal"
          variant="card"
          size="xl"
          :ui="{ fieldset: 'grid grid-cols-2 gap-4' }"
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
          variant="subtle"
          class="w-full"
          placeholder="Firma Sp. z o.o."
        />
      </UFormField>
      <UFormField name="company_nip" label="NIP firmy" required>
        <UInput
          v-model="state.company_nip"
          size="xl"
          variant="subtle"
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
          variant="subtle"
          class="w-full"
          placeholder="ul. Przykładowa 1, 00-000"
        />
      </UFormField>
    </div>

    <UButton size="xl" type="submit" class="w-full mt-8 justify-center">
      Złóż zamówienie
    </UButton>
  </UForm>
</template>
<script setup>
import { CalendarDate } from "@internationalized/date";
import { Time } from "@internationalized/date";
import { object, string, lazy } from "yup";

const state = reactive({
  customer_name: "",
  customer_phone: "",
  customer_email: "",
  order_delivery_date: null,
  order_delivery_time: null,
  order_note: "",
  order_payment_method: "onsite",
  order_invoice_required: false,
  company_name: "",
  company_nip: "",
  company_address: "",
});

const todayCalendarDate = () => {
  const d = new Date();
  return new CalendarDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
};

const inputDate = useTemplateRef("inputDate");

const isValidNip = (nip) => {
  if (!nip) return false;

  const normalized = nip.replace(/[\s-]/g, "");

  if (!/^\d{10}$/.test(normalized)) return false;

  const digits = normalized.split("").map(Number);
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];

  const checksum =
    weights.reduce((sum, weight, index) => sum + weight * digits[index], 0) %
    11;

  if (checksum === 10) return false;

  return checksum === digits[9];
};

const schema = object({
  customer_name: string().required("To pole jest wymagane"),
  customer_phone: string().required("To pole jest wymagane"),
  customer_email: string()
    .required("To pole jest wymagane")
    .email("Wprowadź poprawny adres email"),
  order_delivery_date: string().required("To pole jest wymagane"),
  order_delivery_time: string().required("To pole jest wymagane"),
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

const handleSubmit = () => {
  console.log(state);
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
