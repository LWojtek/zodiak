<template>
  <img src="/images/logo.png" :class="classes" />
</template>
<script setup>
import { defineProps } from "vue";
defineProps({
  classes: {
    type: String,
    default: "w-96",
  },
});
</script>
