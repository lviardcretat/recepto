<script lang="ts" setup>
import { getIngredientsTableConfig } from '~/config/dashboard/IngredientsTableConfig';
import type { IIngredientsDashboard } from '~/types/ingredient/dashboard';
import { LazyDashboardDeletionDeleteModalComponent, LazyEditionIngredientEditModalComponent } from '#components';
import type { FoodType } from '~~/server/utils/drizzleUtils';

const { d, t, locale } = useI18n();
const UButton = resolveComponent('UButton');
const UDropdownMenu = resolveComponent('UDropdownMenu');
const overlay = useOverlay();
const nuxtApp = useNuxtApp();

// Create modals
const editModal = overlay.create(LazyEditionIngredientEditModalComponent);
const deleteModal = overlay.create(LazyDashboardDeletionDeleteModalComponent);

const { data: ingredients, execute: executeIngredientsFetch } = await useIngredientsRequest().getDashboard<IIngredientsDashboard[], IIngredientsDashboard[]>({
  immediate: false,
  watch: false,
  default: () => [],
});

const { data: foodTypesFetch, execute: executeFoodTypesFetch } = await useFoodTypesRequest().getAll<FoodType[], FoodType[]>({
  immediate: false,
  watch: false,
  default: () => [],
});

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
    await useIngredientsRequest().delete(ingredient.id, { onResponse: async () => {
      await nuxtApp.callHook('ingredient:deleted', { id: ingredient.id });
      await executeIngredientsFetch();
    } });
  }
}

const recipeTableConfig = getIngredientsTableConfig(d, t, {
  buttonComponent: UButton,
  dropdownMenuComponent: UDropdownMenu,
  foodTypes: foodTypesFetch.value,
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
