<script lang="ts" setup>
import { getIngredientsTableConfig } from '~/config/dashboard/IngredientsTableConfig';
import type { IngredientsDashboard } from '~/types/ingredientsDashboard';
import { LazyDashboardDeletionDeleteModalComponent, LazyEditionIngredientEditModalComponent } from '#components';

const { d, t, locale } = useI18n();
const UButton = resolveComponent('UButton');
const UDropdownMenu = resolveComponent('UDropdownMenu');
const overlay = useOverlay();
const nuxtApp = useNuxtApp();

// Create modals
const editModal = overlay.create(LazyEditionIngredientEditModalComponent);
const deleteModal = overlay.create(LazyDashboardDeletionDeleteModalComponent);

const { data: ingredients, execute: executeIngredientsFetch } = await useFetch<IngredientsDashboard[]>(
  '/api/ingredients/dashboard',
  {
    method: 'GET',
    immediate: false,
    watch: false,
    onResponseError({ response }) {
      throw showError({
        statusCode: response.status,
        statusMessage: response.statusText,
      });
    },
  },
);

const { data: foodTypesFetch, execute: executeFoodTypesFetch } = await useFetch<FoodType[]>(
  '/api/foodTypes/all',
  {
    method: 'GET',
    immediate: false,
    watch: false,
    onResponseError({ response }) {
      throw showError({
        statusCode: response.status,
        statusMessage: response.statusText,
      });
    },
  },
);

await executeFoodTypesFetch();
await executeIngredientsFetch();

// Handlers for edit and delete
async function handleEditButtonOpen(ingredient: IngredientsDashboard) {
  const instance = editModal.open({ ingredientId: ingredient.id });
  const result = await instance.result;
  if (result) {
    await executeIngredientsFetch();
  }
}

async function handleDeleteButtonOpen(ingredient: IngredientsDashboard) {
  const instance = deleteModal.open({
    itemName: ingredient.name,
    itemType: t('ingredient'),
  });
  const result = await instance.result;
  if (result) {
    // Perform delete operation
    await $fetch(`/api/ingredients/${ingredient.id}`, {
      method: 'DELETE',
      async onResponse() {
        await nuxtApp.callHook('ingredient:deleted', { id: ingredient.id });
        await executeIngredientsFetch();
      },
      onResponseError({ response }) {
        throw showError({
          statusCode: response.status,
          statusMessage: response.statusText,
        });
      },
    });
  }
}

const recipeTableConfig = getIngredientsTableConfig(d, t, {
  buttonComponent: UButton,
  dropdownMenuComponent: UDropdownMenu,
  foodTypes: foodTypesFetch.value ?? [],
  onEditButtonOpen: handleEditButtonOpen,
  onDeleteButtonOpen: handleDeleteButtonOpen,
});
</script>

<template>
  <!-- @vue-ignore -->
  <UTable
    :key="locale"
    :data="ingredients"
    :columns="recipeTableConfig"
  >
    <template #name-cell="{ row }">
      <div
        class="flex items-center gap-2"
      >
        <UIcon
          name="i-lucide-carrot"
          class="size-5"
        />
        {{
          row.original.name
        }}
      </div>
    </template>
  </UTable>
</template>

<style>

</style>
