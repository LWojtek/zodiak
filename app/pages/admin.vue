<template>
  <div>
    <h1>Admin</h1>
    {{ user }}
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "admin",
});

const { user } = useAuth();
</script>
