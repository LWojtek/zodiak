<template>
  <div class="sticky top-24 bg-almond-50 flex flex-wrap gap-3">
    <UBadge
      v-for="c in categories"
      :key="c.id"
      as="button"
      size="xl"
      class="rounded-full cursor-pointer"
      :label="c.name"
      :variant="c.slug === category ? 'solid' : 'subtle'"
      @click="category = c.slug"
    />
  </div>
</template>

<script setup>
const { category, categories } = useOrder();
</script>
