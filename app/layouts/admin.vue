<template>
  <div>
    <UHeader class="shadow-sm">
      <template #left>
        <NuxtLink to="/">
          <h1 class="text-xl font-semibold">Panel Admina</h1>
        </NuxtLink>
      </template>

      <template #right>
        <UButton @click="logout">Wyloguj</UButton>
      </template>
    </UHeader>

    <UMain>
      <UContainer class="py-8">
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
