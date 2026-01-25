<template>
  <h1>Success {{ route.query.id }}</h1>
</template>
<script setup>
definePageMeta({ layout: "page" });

const route = useRoute();
</script>
