<template>
  <div class="flex flex-col grow gap-4 md:gap-8">
    <UTabs
      :items="tabs"
      :content="false"
      v-model="tab"
      color="primary"
      default-value="orders"
      :ui="{
        list: 'bg-white border border-primary-100 overflow-x-auto',
        trigger:
          'cursor-pointer data-[state=inactive]:text-primary/90 text-xs md:text-sm px-2 md:px-3 py-2',
        indicator: 'bg-primary',
      }"
    />
    <div class="overflow-x-auto md:overflow-visible">
      <component :is="component" />
    </div>
  </div>
</template>

<script setup>
import { useZodiakSeoMeta } from "~/composables/useZodiakSeoMeta";
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
useZodiakSeoMeta({
  title: "Panel administracyjny – Restauracja Zodiak",
  description:
    "Panel administracyjny Restauracji Zodiak. Zarządzaj zamówieniami, produktami i kategoriami.",
});
const route = useRoute();
const tab = ref("orders");

watch(tab, (newTab) => {
  navigateTo({ query: { tab: newTab } });
});

onMounted(() => {
  if (route.query?.tab) {
    tab.value = route.query.tab;
  }
});

const tabs = [
  {
    label: "Zamówienia",
    value: "orders",
    icon: "i-lucide-shopping-cart",
    component: defineAsyncComponent(() => import("./partials/orders.vue")),
  },
  {
    label: "Kategorie",
    value: "categories",
    icon: "i-lucide-boxes",
    component: defineAsyncComponent(() => import("./partials/categories.vue")),
  },
  {
    label: "Produkty",
    value: "products",
    icon: "i-lucide-beef",
    component: defineAsyncComponent(() => import("./partials/products.vue")),
  },
  {
    label: "Ustawienia formularza zamówień",
    value: "orders-settings",
    icon: "i-lucide-settings",
    component: defineAsyncComponent(() => import("./partials/settings.vue")),
  },
];

const component = computed(
  () =>
    tabs.find((el) => el.value === tab.value).component || tabs[0].component,
);

// const updateUser = async () => {
//   console.log("123");

//   const api = useApi();

//   await api("/api/auth/update", {
//     method: "POST",
//     body: {
//       first_name: firstName.value,
//       last_name: lastName.value,
//     },
//     async onResponse({ response }) {
//       if (response.ok) {
//         console.log(response);
//         await fetchUser();
//       } else {
//         // state.error = response._data.message;
//       }

//       // state.loading = false;
//     },
//   });
// };
</script>
