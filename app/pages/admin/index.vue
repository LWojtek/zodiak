<template>
  <div class="flex flex-col grow gap-8 bg-almond-50">
    <UTabs
      :items="tabs"
      :content="false"
      v-model="tab"
      default-value="orders"
      :ui="{
        list: 'bg-white border border-primary-100',
        trigger: 'cursor-pointer data-[state=inactive]:text-primary/90',
      }"
    />
    <div
      class="grow bg-white p-4 rounded-lg border border-primary-100 shadow-sm"
    >
      <component :is="component" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const tab = ref("orders");

watch(tab, (newTab) => {
  navigateTo({ query: { tab: newTab } });
});
const tabs = [
  {
    label: "Zamówienia",
    value: "orders",
    component: defineAsyncComponent(() => import("./partials/orders.vue")),
  },
  {
    label: "Kategorie",
    value: "categories",
    component: defineAsyncComponent(() => import("./partials/categories.vue")),
  },
  {
    label: "Zestawy",
    value: "sets",
    component: defineAsyncComponent(() => import("./partials/sets.vue")),
  },
  {
    label: "Produkty",
    value: "products",
    component: defineAsyncComponent(() => import("./partials/products.vue")),
  },
  {
    label: "Ustawienia formularza zamówień",
    value: "orders-settings",
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
