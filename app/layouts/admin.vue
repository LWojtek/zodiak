<template>
  <div>
    <UHeader class="shadow-sm bg-almond-50 text-primary-950" :toggle="false">
      <template #left>
        <NuxtLink to="/admin" class="flex items-center gap-2">
          <UIcon name="i-lucide-chef-hat" class="size-7" />
          <h1 class="text-xl font-semibold">Panel Admina</h1>
        </NuxtLink>
      </template>

      <template #right>
        <UButton
          @click="logout"
          size="sm"
          trailing-icon="i-lucide-log-out"
          variant="solid"
        >
          Wyloguj
        </UButton>
      </template>
    </UHeader>

    <UMain class="flex">
      <UContainer class="flex flex-col grow gap-8 py-8">
        <slot />
      </UContainer>
    </UMain>
  </div>
</template>
<script setup>
const supabase = useSupabaseClient();
const logout = async () => {
  const { error } = await supabase.auth.signOut();
  navigateTo("/login");
  if (error) console.log(error);
};
</script>
