<template>
  <div class="sticky top-24 bg-almond-50 flex flex-wrap gap-3">
    <UTabs
      :items="categories"
      label-key="name"
      value-key="slug"
      size="xl"
      :ui="{
        list: 'bg-white border border-primary-100',
        trigger: 'cursor-pointer data-[state=inactive]:text-primary/90',
        indicator: 'bg-primary',
      }"
      @update:model-value="category = categories[$event].slug"
    />
  </div>
</template>

<script setup>
const { category, categories } = useOrder();
</script>
