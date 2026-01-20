<template>
  <div>
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <AppLogo class="w-auto h-6 shrink-0" />
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />
        <UButton @click="logout">Wyloguj</UButton>
      </template>
    </UHeader>

    <UMain>
      <slot />
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
