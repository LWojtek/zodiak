<template>
  <div
    class="sticky z-1 top-20 lg:top-24 bg-white flex flex-wrap gap-3 p-2 rounded-lg border border-primary-100"
  >
    <!-- <UTabs
      :items="categories"
      label-key="name"
      value-key="slug"
      size="xl"
      :ui="{
        list: 'bg-white border border-primary-100',
        trigger: 'cursor-pointer data-[state=inactive]:text-primary/90',
        indicator: 'bg-primary',
      }"
      class="w-full"
      @update:model-value="category = categories[$event].slug"
    /> -->
    <UButton
      v-for="c in categories"
      :key="c.id"
      as="button"
      size="xl"
      :label="c.name"
      :variant="c.slug === category ? 'solid' : 'subtle'"
      @click="category = c.slug"
    />
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const { category, categories } = useOrder();
</script>
