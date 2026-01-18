<template>
  <div>
    <h1>Admin</h1>
    {{ user }}

    <UInput v-model="firstName" />
    <UInput v-model="lastName" />
    <UButton @click="updateUser">Submit</UButton>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "admin",
});

const { user } = useAuth();

const firstName = ref("");
const lastName = ref("");

const updateUser = async () => {
  console.log("123");

  const api = useApi();

  await api("/api/auth/update", {
    method: "POST",
    body: {
      first_name: firstName.value,
      last_name: lastName.value,
    },
    async onResponse({ response }) {
      if (response.ok) {
        console.log(response);
      } else {
        // state.error = response._data.message;
      }

      // state.loading = false;
    },
  });
};
</script>
