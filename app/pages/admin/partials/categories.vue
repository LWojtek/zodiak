<template>
  <div class="h-full flex flex-col gap-4">
    <!-- HEADER -->
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4"
    >
      <h2 class="font-semibold text-lg">Kategorie</h2>
      <UButton
        size="sm"
        icon="i-lucide-plus"
        label="Dodaj kategorię"
        variant="subtle"
        class="w-full md:w-auto"
        @click="openCreate"
      />
    </div>

    <!-- TABLE -->
    <div class="overflow-x-auto rounded-lg border border-primary-100 bg-white">
      <UTable
        :data="categories"
        :columns="columns"
        :loading="status === 'pending'"
        :ui="{
          th: 'bg-primary/10 text-xs md:text-sm',
          td: 'last:text-right text-xs md:text-sm p-2 md:p-3',
        }"
      >
        <template #actions-cell="{ row }">
          <div class="flex justify-end gap-2">
            <UButton
              size="xs"
              icon="i-lucide-pencil"
              variant="ghost"
              @click="openEdit(row.original)"
            />
            <UButton
              size="xs"
              icon="i-lucide-trash"
              color="error"
              variant="ghost"
              @click="askDelete(row.original)"
            />
          </div>
        </template>
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
    </div>

    <!-- CREATE / EDIT MODAL -->
    <UModal
      v-model:open="open"
      title="Kategoria"
      :ui="{ content: 'max-w-sm' }"
      @after:leave="resetForm"
    >
      <template #body>
        <UForm
          ref="formRef"
          :state="form"
          :schema="schema"
          @submit="saveCategory"
          class="flex flex-col gap-4"
        >
          <UFormField label="Nazwa" name="name">
            <UInput
              size="xl"
              v-model="form.name"
              class="w-full"
              @update:model-value="form.slug = slugify($event)"
            />
          </UFormField>

          <!-- <UFormField label="Slug">
            <UInput
              size="xl"
              v-model="form.slug"
              disabled
              class="w-full"
              :ui="{ base: 'disabled:opacity-50' }"
            />
          </UFormField> -->
        </UForm>
      </template>

      <template #footer>
        <div class="flex justify-between grow gap-4">
          <UButton size="sm" variant="subtle" @click="open = false">
            Anuluj
          </UButton>
          <UButton size="sm" :loading="form.loading" @click="formRef.submit()">
            Zapisz
          </UButton>
        </div>
      </template>
    </UModal>

    <!-- DELETE CONFIRM -->
    <UModal
      v-model:open="deleteOpen"
      title="Usuń kategorię"
      :ui="{ content: 'max-w-sm' }"
    >
      <template #body>
        <p class="text-sm">
          Czy na pewno chcesz usunąć kategorię
          <strong>{{ deleting?.name }}</strong
          >?
          <br />
          <span class="font-medium"> Tej operacji nie można cofnąć. </span>
        </p>
      </template>

      <template #footer>
        <div class="flex justify-between grow gap-4">
          <UButton variant="subtle" @click="deleteOpen = false" size="sm">
            Anuluj
          </UButton>
          <UButton
            color="error"
            :loading="deletingLoading"
            @click="deleteCategory"
            variant="subtle"
            size="sm"
          >
            Usuń
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup>
import { object, string } from "yup";

const supabase = useSupabaseClient();

/* ================= DATA ================= */

const { data, refresh, status } = useAsyncData("categories", async () => {
  const { data } = await supabase.from("categories").select("*").order("name");
  return data ?? [];
});

const categories = computed(() => data.value ?? []);

/* ================= TABLE ================= */

const columns = [
  { header: "Nazwa", accessorKey: "name" },
  { header: "Slug", accessorKey: "slug" },

  {
    header: "Utworzono",
    cell: ({ row }) =>
      new Intl.DateTimeFormat("pl-PL", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(row.original.created_at)),
  },
  {
    header: "Aktywna",
    cell: ({ row }) =>
      h(resolveComponent("USwitch"), {
        modelValue: row.original.is_active,
        loading: toggling.value === row.original.id,
        color: "success",
        "onUpdate:modelValue": () => toggleActive(row.original),
      }),
  },
  { id: "actions" },
];

/* ================= FORM ================= */

const open = ref(false);
const formRef = ref();

const form = reactive({
  id: null,
  name: "",
  slug: "",
  loading: false,
});

const schema = object({
  name: string().required("To pole jest wymagane"),
});

const resetForm = () => {
  form.id = null;
  form.name = "";
  form.slug = "";
  form.loading = false;
};

const openCreate = () => {
  resetForm();
  open.value = true;
};

const openEdit = (category) => {
  resetForm();
  Object.assign(form, category);
  open.value = true;
};

/* ================= SAVE ================= */

const saveCategory = async () => {
  if (!form.name || !form.slug) return;

  form.loading = true;

  if (!form.id) {
    // CREATE
    const { error } = await supabase.from("categories").insert({
      name: form.name,
      slug: form.slug,
    });

    if (error) {
      console.error(error);
      form.loading = false;
      return;
    }
  } else {
    // UPDATE
    const { error } = await supabase
      .from("categories")
      .update({
        name: form.name,
        slug: form.slug,
      })
      .eq("id", form.id);

    if (error) {
      console.error(error);
      form.loading = false;
      return;
    }
  }

  await refresh();
  open.value = false;
};

/* ================= DELETE ================= */

const deleteOpen = ref(false);
const deleting = ref(null);
const deletingLoading = ref(false);

const askDelete = (category) => {
  deleting.value = category;
  deleteOpen.value = true;
};

const deleteCategory = async () => {
  if (!deleting.value) return;

  deletingLoading.value = true;

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", deleting.value.id);

  deletingLoading.value = false;

  if (error) {
    console.error(error);
    return;
  }

  deleteOpen.value = false;
  deleting.value = null;
  await refresh();
};

const toggling = ref(null);

const toggleActive = async (category) => {
  toggling.value = category.id;

  const { error } = await supabase
    .from("categories")
    .update({ is_active: !category.is_active })
    .eq("id", category.id);

  if (error) {
    console.error("Toggle category error:", error);
    alert("Nie udało się zmienić statusu kategorii");
  } else {
    await refresh();
  }

  toggling.value = null;
};

/* ================= HELPERS ================= */

const slugify = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
</script>
