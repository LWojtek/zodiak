<template>
  <UForm
    :state="state"
    :validate="validate"
    @submit="login"
    class="flex flex-col gap-6"
  >
    <UFormField name="email" label="Adres e-mail">
      <UInput
        type="email"
        size="xl"
        class="w-full"
        v-model="state.email"
        :ui="{
          leadingIcon: 'size-5 text-primary',
        }"
        leading-icon="i-lucide-mail"
      />
    </UFormField>
    <UFormField name="password" label="Hasło">
      <UInput
        size="xl"
        class="w-full"
        v-model="state.password"
        :ui="{
          leadingIcon: 'size-5 text-primary',
        }"
        :type="show ? 'text' : 'password'"
        leading-icon="i-lucide-lock"
      >
        <template #trailing>
          <UButton
            variant="link"
            size="md"
            :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="show ? 'Hide password' : 'Show password'"
            :aria-pressed="show"
            aria-controls="password"
            @click="show = !show"
          />
        </template>
      </UInput>
    </UFormField>

    <p v-if="state.error" class="text-error text-sm py-2 text-center">
      {{ state.error }}
    </p>

    <UButton
      color="primary"
      type="submit"
      class="justify-center"
      :loading="state.loading"
    >
      Zaloguj
    </UButton>
  </UForm>
</template>
<script setup>
definePageMeta({
  layout: "auth",
  middleware: [
    async () => {
      const user = useSupabaseUser();

      if (user.value) {
        await nextTick();
        return navigateTo("/admin");
      }
    },
  ],
});

const show = ref(false);

const state = reactive({
  email: "",
  password: "",
  error: null,
  loading: false,
});

const validate = (state) => {
  const errors = [];

  if (!state.email) {
    errors.push({ name: "email", message: "Email jest wymagany" });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errors.push({ name: "email", message: "Nieprawidłowy adres email" });
  }

  if (!state.password) {
    errors.push({ name: "password", message: "Hasło jest wymagane" });
  }

  return errors;
};

const login = async () => {
  state.loading = true;
  state.error = null;

  try {
    const supabase = useSupabaseClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: state.email,
      password: state.password,
    });

    if (error) {
      state.error = error.message;
      return;
    }
    await nextTick();
    await navigateTo("/admin");
  } catch (err) {
    state.error = "Unexpected error. Please try again.";
  } finally {
    state.loading = false;
  }
};
</script>
