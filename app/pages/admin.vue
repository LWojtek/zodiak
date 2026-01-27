<template>
  <div>
    <h1>Admin</h1>

    <UInput v-model="firstName" />
    <UInput v-model="lastName" />
    <!-- <UButton @click="updateUser">Submit</UButton> -->
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const firstName = ref("");
const lastName = ref("");

const { orders, loading, fetchOrders } = useAdminOrders();

onMounted(() => {
  fetchOrders();
});

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
