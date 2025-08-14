<script lang="ts" setup>
import type { Row } from '@tanstack/vue-table';
import { getIngredientsTableConfig } from '~/config/dashboard/IngredientsTableConfig';
import type { IngredientsDashboard, IngredientsRecipesDashboard } from '~/types/ingredientsDashboard';

const { d, t, locale } = useI18n();
const UButton = resolveComponent('UButton');
const UDropdownMenu = resolveComponent('UDropdownMenu');

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

const recipeTableConfig = getIngredientsTableConfig(d, t, { buttonComponent: UButton, dropdownMenuComponent: UDropdownMenu, foodTypes: foodTypesFetch.value ?? [] });
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
