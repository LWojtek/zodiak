<template>
  <div class="flex flex-col gap-4">
    <!-- HEADER -->
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4"
    >
      <h2 class="text-lg font-semibold">Pozycje cateringowe</h2>

      <div
        class="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 w-full md:w-auto"
      >
        <USelect
          v-model="selectedCategoryId"
          :items="categoryFilterItems"
          label-key="name"
          value-key="id"
          placeholder="Wszystkie kategorie"
          size="md"
          class="w-full md:w-56"
          clearable
        />

        <UButton
          size="sm"
          icon="i-lucide-plus"
          label="Dodaj pozycję"
          variant="subtle"
          class="w-full md:w-auto"
          @click="openCreate"
        />
      </div>
    </div>

    <!-- TABLE -->
    <div class="overflow-x-auto rounded-lg border border-primary-100 bg-white">
      <UTable
        :data="status === 'pending' ? undefined : filteredProducts"
        :columns="columns"
        :loading="status === 'pending'"
        :ui="{
          th: 'bg-primary/10 text-xs md:text-sm',
          td: 'text-xs md:text-sm p-2 md:p-3',
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
              @click="confirmDelete(row.original)"
            />
          </div>
        </template>
        <template #empty>
          <div
            class="flex items-center justify-center min-h-24 text-sm text-gray-500"
          >
            Brak produktów
          </div>
        </template>

        <template #loading>
          <div class="min-h-40 flex items-center justify-center">
            <Spinner />
          </div>
        </template>
      </UTable>
    </div>

    <!-- PRODUCT MODAL -->
    <UModal
      v-model:open="open"
      title="Pozycja cateringowa"
      :ui="{ content: 'max-w-4xl' }"
      :prevent-close="saving"
      @after:leave="resetForm"
    >
      <template #body>
        <UForm class="flex flex-col gap-6" @submit.prevent="saveProduct">
          <!-- BASIC -->
          <div class="grid grid-cols-2 gap-4">
            <UInput
              v-model="form.name"
              size="xl"
              placeholder="Nazwa produktu"
              class="w-full"
            />
            <USelect
              v-model="form.category_id"
              :items="categories"
              label-key="name"
              value-key="id"
              size="xl"
              placeholder="Kategoria"
              class="w-full"
            />
          </div>

          <USwitch v-model="form.is_active" label="Aktywna pozycja" />

          <!-- PRICE -->
          <!-- PRICE -->
          <USeparator label="Cena / liczba osób" />
          <div class="grid grid-cols-3 gap-4">
            <UInputNumber
              v-model="form.min_people"
              size="xl"
              placeholder="Min. osób"
            />
            <UInputNumber
              v-model="form.max_people"
              size="xl"
              placeholder="Max. osób"
            />
            <UInputNumber
              v-model="form.price"
              size="xl"
              placeholder="Cena (zł)"
            />
          </div>

          <!-- COMPOSITION -->
          <USeparator label="Skład" />

          <div
            v-for="(section, sIndex) in form.sections"
            :key="sIndex"
            class="border border-primary-100 rounded-lg p-4 flex flex-col gap-4"
          >
            <div class="flex gap-2">
              <UInput
                v-model="section.title"
                class="grow"
                placeholder="Nazwa sekcji"
              />
              <UButton
                icon="i-lucide-trash"
                color="error"
                variant="ghost"
                @click="removeSection(sIndex)"
              />
            </div>

            <div
              v-for="(item, iIndex) in section.items"
              :key="iIndex"
              class="flex gap-2 pl-4"
            >
              <UInput v-model="item.name" placeholder="Pozycja" class="grow" />
              <UButton
                icon="i-lucide-x"
                variant="ghost"
                @click="removeItem(sIndex, iIndex)"
              />
            </div>

            <UButton
              size="sm"
              variant="subtle"
              icon="i-lucide-plus"
              @click="addItem(sIndex)"
              class="self-start"
            >
              Dodaj pozycję
            </UButton>
          </div>

          <UButton
            size="sm"
            variant="outline"
            icon="i-lucide-plus"
            @click="addSection"
            class="self-start"
          >
            Dodaj sekcję
          </UButton>

          <!-- ADDONS -->
          <USeparator label="Dodatki (opcjonalne)" />

          <div class="flex flex-col gap-4">
            <div
              v-for="(addon, aIndex) in form.addons"
              :key="aIndex"
              class="border border-primary-100 border-dashed rounded-lg p-4 grid grid-cols-3 gap-2 items-center"
            >
              <UInput v-model="addon.name" placeholder="Nazwa dodatku" />
              <UInputNumber v-model="addon.price" placeholder="Cena (zł)" />
              <UButton
                icon="i-lucide-trash"
                color="error"
                variant="ghost"
                @click="removeAddon(aIndex)"
                class="ml-auto"
              />
            </div>

            <UButton
              size="sm"
              variant="subtle"
              icon="i-lucide-plus"
              @click="addAddon"
              class="self-start"
            >
              Dodaj dodatek
            </UButton>
          </div>
        </UForm>
      </template>

      <template #footer>
        <div class="flex justify-between grow">
          <UButton variant="subtle" @click="open = false">Anuluj</UButton>
          <UButton :loading="saving" @click="saveProduct">Zapisz</UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup>
import { ref, reactive, computed, h, resolveComponent } from "vue";

const supabase = useSupabaseClient();

/* ================= DATA ================= */

const { data, status } = useAsyncData("products", async () => {
  const { data } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      is_active,
      category_id,
      categories ( name ),
      product_prices!product_prices_product_id_fkey (
        price,
        min_people,
        max_people
      )
    `,
    )
    .order("name");

  return (
    data?.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.categories?.name ?? "-",
      category_id: p.category_id,
      is_active: p.is_active,
      price: p.product_prices?.[0]?.price ?? null,
      min_people: p.product_prices?.[0]?.min_people ?? null,
      max_people: p.product_prices?.[0]?.max_people ?? null,
    })) ?? []
  );
});

const products = computed(() => data.value ?? []);

const { data: categories } = useAsyncData("categories", async () => {
  const { data } = await supabase.from("categories").select("id,name");
  return data ?? [];
});

/* ================= TABLE ================= */

const selectedCategoryId = ref(null);

const categoryFilterItems = computed(() => [
  { id: null, name: "Wszystkie" },
  ...(categories.value ?? []),
]);

const filteredProducts = computed(() =>
  selectedCategoryId.value
    ? products.value.filter((p) => p.category_id === selectedCategoryId.value)
    : products.value,
);

const toggling = ref(null);

const toggleActive = async (product) => {
  toggling.value = product.id;
  await supabase
    .from("products")
    .update({ is_active: !product.is_active })
    .eq("id", product.id);
  product.is_active = !product.is_active;
  toggling.value = null;
};

const columns = [
  { header: "Nazwa", accessorKey: "name" },
  { header: "Kategoria", accessorKey: "category" },
  { header: "Cena", accessorKey: "price" },

  { header: "Min. osób", accessorKey: "min_people" },
  { header: "Max. osób", accessorKey: "max_people" },
  {
    header: "Aktywny",
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
const saving = ref(false);

const form = reactive({
  id: null,
  name: "",
  category_id: null,
  is_active: true,
  price: null,
  min_people: null,
  max_people: null,
  sections: [],
  addons: [],
});

const resetForm = () => {
  Object.assign(form, {
    id: null,
    name: "",
    category_id: null,
    is_active: true,
    price: null,
    min_people: null,
    max_people: null,
    sections: [],
    addons: [],
  });
};

const openCreate = () => {
  resetForm();
  open.value = true;
};

const openEdit = async (product) => {
  resetForm();
  Object.assign(form, product);

  /* ===== SECTIONS + ITEMS ===== */
  const { data: sections, error } = await supabase
    .from("product_sections")
    .select(
      `
      id,
      title,
      sort_order,
      product_section_items (
        id,
        name,
        sort_order
      )
    `,
    )
    .eq("product_id", product.id)
    .order("sort_order");

  if (error) {
    console.error("Load sections failed:", error);
  }

  form.sections =
    sections?.map((section) => ({
      id: section.id,
      title: section.title,
      items:
        section.product_section_items
          ?.sort((a, b) => a.sort_order - b.sort_order)
          .map((item) => ({
            id: item.id,
            name: item.name,
          })) ?? [],
    })) ?? [];

  /* ===== ADDONS ===== */
  const { data: addons } = await supabase
    .from("product_addons")
    .select("*")
    .eq("product_id", product.id);

  form.addons = addons ?? [];

  open.value = true;
};

/* ================= HELPERS ================= */

const addSection = () => form.sections.push({ title: "", items: [] });
const removeSection = (i) => form.sections.splice(i, 1);
const addItem = (i) => form.sections[i].items.push({ name: "" });
const removeItem = (s, i) => form.sections[s].items.splice(i, 1);

const addAddon = () => form.addons.push({ name: "", price: null });
const removeAddon = (i) => form.addons.splice(i, 1);

/* ================= SAVE ================= */

const saveProduct = async () => {
  if (saving.value) return;
  saving.value = true;

  try {
    let productId = form.id;

    /* ================= PRODUCT ================= */

    if (!productId) {
      // CREATE
      const { data, error } = await supabase
        .from("products")
        .insert({
          name: form.name,
          category_id: form.category_id,
          is_active: form.is_active,
        })
        .select()
        .single();

      if (error) throw error;
      productId = data.id;
    } else {
      // UPDATE
      const { error } = await supabase
        .from("products")
        .update({
          name: form.name,
          category_id: form.category_id,
          is_active: form.is_active,
        })
        .eq("id", productId);

      if (error) throw error;
    }

    /* ================= PRICE (MIN/MAX OSÓB DLA PRODUKTU) ================= */

    await supabase.from("product_prices").delete().eq("product_id", productId);

    if (form.price !== null) {
      const { error } = await supabase.from("product_prices").insert({
        product_id: productId,
        price: form.price,
        min_people: form.min_people,
        max_people: form.max_people,
      });

      if (error) throw error;
    }

    /* ================= SECTIONS + ITEMS ================= */

    await supabase
      .from("product_sections")
      .delete()
      .eq("product_id", productId);

    for (let s = 0; s < form.sections.length; s++) {
      const section = form.sections[s];
      if (!section.title) continue;

      const { data: sec, error: secError } = await supabase
        .from("product_sections")
        .insert({
          product_id: productId,
          title: section.title,
          sort_order: s + 1,
        })
        .select()
        .single();

      if (secError) throw secError;

      for (let i = 0; i < section.items.length; i++) {
        const item = section.items[i];
        if (!item.name) continue;

        const { error: itemError } = await supabase
          .from("product_section_items")
          .insert({
            section_id: sec.id,
            name: item.name,
            sort_order: i + 1,
          });

        if (itemError) throw itemError;
      }
    }

    /* ================= ADDONS (BEZ ZAKRESU OSÓB) ================= */

    await supabase.from("product_addons").delete().eq("product_id", productId);

    for (const addon of form.addons) {
      if (!addon.name || addon.price == null) continue;

      const { error } = await supabase.from("product_addons").insert({
        product_id: productId,
        name: addon.name,
        price: addon.price,
      });

      if (error) throw error;
    }

    /* ================= DONE ================= */

    open.value = false;
    await refreshNuxtData("products");
  } catch (err) {
    console.error("Save product failed:", err);
    alert("Nie udało się zapisać produktu");
  } finally {
    saving.value = false;
  }
};
</script>
