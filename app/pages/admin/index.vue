<template>
  <div class="flex flex-col grow gap-8">
    <UTabs
      :items="tabs"
      :content="false"
      v-model="tab"
      color="primary"
      default-value="orders"
      :ui="{
        list: 'bg-white border border-primary-100',
        trigger: 'cursor-pointer data-[state=inactive]:text-primary/90',
        indicator: 'bg-primary',
      }"
    />
    <component :is="component" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "auth",
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
    component: defineAsyncComponent(() => import("./partials/orders.vue")),
  },
  {
    label: "Kategorie",
    value: "categories",
    component: defineAsyncComponent(() => import("./partials/categories.vue")),
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
