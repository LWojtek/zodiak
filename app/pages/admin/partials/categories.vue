<template>
  <div class="h-full flex flex-col gap-4">
    <!-- HEADER -->
    <div
      class="flex items-center justify-between pb-4 border-b border-primary-100"
    >
      <h2 class="font-semibold text-lg">Kategorie</h2>
      <UButton
        size="sm"
        leading-icon="i-lucide-plus"
        label="Utwórz kategorię"
        variant="subtle"
        @click="open = true"
      />
    </div>

    <!-- TABLE -->
    <UTable
      :data="categories"
      :loading="status === 'pending'"
      :columns="columns"
    >
      <template #empty>
        <div
          class="flex items-center justify-center min-h-24 text-sm text-gray-500"
        >
          Brak kategorii
        </div>
      </template>

      <template #loading>
        <div class="min-h-40 flex items-center justify-center">
          <Spinner />
        </div>
      </template>
    </UTable>

    <!-- CREATE CATEGORY MODAL -->
    <UModal
      v-model:open="open"
      title="Tworzenie kategorii"
      :ui="{ content: 'max-w-xs', footer: 'flex flex-col' }"
      @after:leave="resetForm"
    >
      <template #body>
        <UForm
          ref="form"
          class="flex flex-col gap-4"
          :state="state"
          :schema="schema"
          @submit="addCategory"
        >
          <UFormField label="Nazwa kategorii" name="name">
            <UInput
              size="xl"
              v-model="state.name"
              @update:model-value="state.slug = slugify($event)"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Slug">
            <UInput
              :disabled="true"
              size="xl"
              v-model="state.slug"
              disabled
              class="w-ful"
              :ui="{ base: 'disabled:opacity-50' }"
            />
          </UFormField>
        </UForm>
      </template>

      <template #footer>
        <p v-if="state.error" class="text-error text-sm font-medium">
          {{ state.error }}
        </p>

        <div class="flex self-stretch justify-between gap-4 mt-4">
          <UButton variant="subtle" size="sm" @click="open = false">
            Anuluj
          </UButton>
          <UButton size="sm" :loading="state.loading" @click="form.submit()">
            Utwórz
          </UButton>
        </div>
      </template>
    </UModal>

    <!-- CONFIRM DELETE MODAL -->
    <UModal
      v-model:open="confirmOpen"
      title="Jesteś pewien?"
      :ui="{ content: 'max-w-xs', footer: 'flex flex-col gap-3' }"
    >
      <template #body>
        <p class="text-sm">
          Czy na pewno chcesz usunąć kategorię
          <strong>{{ categoryToDelete?.name }}</strong
          >?
        </p>

        <p class="text-sm font-medium mt-2">Tej operacji nie można cofnąć.</p>
      </template>

      <template #footer>
        <div class="flex self-stretch justify-between gap-4">
          <UButton variant="subtle" size="sm" @click="confirmOpen = false">
            Anuluj
          </UButton>
          <UButton
            color="error"
            size="sm"
            variant="subtle"
            :loading="deleting === categoryToDelete?.id"
            @click="confirmDelete"
          >
            Usuń kategorię
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup>
import { object, string } from "yup";

/* ---------- STATE ---------- */
const open = ref(false);
const confirmOpen = ref(false);
const deleting = ref(null);
const categoryToDelete = ref(null);

const state = reactive({
  name: "",
  slug: "",
  loading: false,
  error: null,
});

const form = ref();

/* ---------- VALIDATION ---------- */
const schema = object({
  name: string().required("To pole jest wymagane"),
});

/* ---------- HELPERS ---------- */
const slugify = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

/* ---------- SUPABASE ---------- */
const supabase = useSupabaseClient();

const { data, refresh, status } = await useLazyAsyncData(
  "categories",
  async () => {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("name");
    return data ?? [];
  },
);

const categories = computed(() => data.value ?? []);

/* ---------- TABLE ---------- */
const UButton = resolveComponent("UButton");

const columns = [
  {
    header: "Nazwa",
    cell: ({ row }) => row.original.name,
  },
  {
    header: "Slug",
    cell: ({ row }) => row.original.slug,
  },
  {
    header: "Utworzono",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return new Intl.DateTimeFormat("pl-PL", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    },
  },
  {
    id: "actions",
    cell: ({ row }) =>
      h(UButton, {
        icon: "i-lucide-trash",
        color: "error",
        variant: "subtle",
        square: true,
        size: "md",
        class: "p-2 rounded-full",
        ui: {
          leadingIcon: "size-4",
        },
        loading: deleting.value === row.original.id,
        onClick: () => {
          categoryToDelete.value = row.original;
          confirmOpen.value = true;
        },
      }),
  },
];

/* ---------- ACTIONS ---------- */
const resetForm = () => {
  state.name = "";
  state.slug = "";
  state.error = null;
  state.loading = false;
};

const addCategory = async () => {
  if (!state.name || !state.slug) return;

  state.loading = true;
  state.error = null;

  const { error } = await supabase.from("categories").insert({
    name: state.name,
    slug: state.slug,
  });

  if (error) {
    state.error = error.message;
    state.loading = false;
    return;
  }

  await refresh();
  open.value = false;
  resetForm();
};

const confirmDelete = async () => {
  if (!categoryToDelete.value) return;

  deleting.value = categoryToDelete.value.id;

  try {
    await supabase
      .from("categories")
      .delete()
      .eq("id", categoryToDelete.value.id);

    await refresh();
    confirmOpen.value = false;
    categoryToDelete.value = null;
  } catch (e) {
    console.error(e);
  } finally {
    deleting.value = null;
  }
};
</script>
