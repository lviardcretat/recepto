<script lang="ts" setup>
import { getGroupedRowModel } from '@tanstack/vue-table';
import type { GroupingOptions } from '@tanstack/vue-table';
import { getRecipesTableConfig } from '~/config/dashboard/RecipesTableConfig';
import type { IRecipesDashboard } from '~/types/recipe/dashboard';
import { LazyDashboardDeletionDeleteModalComponent, LazyEditionRecipeEditModalComponent, LazyEditionRecipeCategoryEditModalComponent } from '#components';

const { d, t, locale } = useI18n();
const UButton = resolveComponent('UButton');
const UDropdownMenu = resolveComponent('UDropdownMenu');
const overlay = useOverlay();
const nuxtApp = useNuxtApp();

// Create modals
const editRecipeModal = overlay.create(LazyEditionRecipeEditModalComponent);
const deleteModal = overlay.create(LazyDashboardDeletionDeleteModalComponent);
const editCategoryModal = overlay.create(LazyEditionRecipeCategoryEditModalComponent);

const { data: recipesCategories, execute: executeRecipesCategoriesFetch } = await useRecipesRequest().getDashboard<IRecipesDashboard[], IRecipesDashboard[]>({
  immediate: false,
  watch: false,
  default: () => [],
});

await executeRecipesCategoriesFetch();

// Handlers for edit and delete
async function handleEditButtonOpen(recipe: RecipesDashboard) {
  const instance = editRecipeModal.open({ recipeId: recipe.id });
  const result = await instance.result;
  if (result) {
    await executeRecipesCategoriesFetch();
  }
}

async function handleDeleteButtonOpen(recipe: RecipesDashboard) {
  const instance = deleteModal.open({
    itemName: recipe.name,
    itemType: t('recipe'),
  });
  const result = await instance.result;
  if (result) {
    await useRecipesRequest().delete(recipe.id, { onResponse: async () => {
      await nuxtApp.callHook('recipe:deleted', { id: recipe.id });
      await executeRecipesCategoriesFetch();
    } });
  }
}

async function handleEditCategoryButtonOpen(recipe: RecipesDashboard) {
  const instance = editCategoryModal.open({ recipeCategoryId: recipe.recipesCategory.id });
  const result = await instance.result;
  if (result) {
    await executeRecipesCategoriesFetch();
  }
}

async function handleDeleteCategoryButtonOpen(recipe: RecipesDashboard) {
  const instance = deleteModal.open({
    itemName: recipe.recipesCategory.name,
    itemType: t('category'),
  });
  const result = await instance.result;
  if (result) {
    await useRecipesCategoriesRequest().delete(recipe.recipesCategory.id, { onResponse: async () => {
      await nuxtApp.callHook('recipesCategory:deleted', { id: recipe.recipesCategory.id });
      await executeRecipesCategoriesFetch();
    } });
  }
}

const recipeTableConfig = getRecipesTableConfig(d, t, {
  buttonComponent: UButton,
  dropdownMenuComponent: UDropdownMenu,
  onEditButtonOpen: handleEditButtonOpen,
  onDeleteButtonOpen: handleDeleteButtonOpen,
  onEditCategoryButtonOpen: handleEditCategoryButtonOpen,
  onDeleteCategoryButtonOpen: handleDeleteCategoryButtonOpen,
});

const grouping_options = ref<GroupingOptions>({
  groupedColumnMode: 'remove',
  getGroupedRowModel: getGroupedRowModel(),
});
</script>

<template>
  <!-- @vue-ignore -->
  <UTable
    :key="locale"
    :data="recipesCategories"
    :columns="recipeTableConfig"
    :grouping="['id']"
    :grouping-options="grouping_options"
    :ui="{
      root: 'min-w-full',
      td: 'empty:p-0',
    }"
  >
    <template #name-cell="{ row }">
      <div
        v-if="row.getIsGrouped()"
        class="flex items-center"
      >
        <span
          class="inline-block"
          :style="{ width: `calc(${row.depth} * 1rem)` }"
        />

        <UButton
          variant="ghost"
          color="neutral"
          class="mr-2"
          size="xs"
          :icon="row.getIsExpanded() ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
          @click="row.toggleExpanded()"
        />
        <div
          v-if="row.groupingColumnId === 'id'"
          class="flex items-center gap-2"
        >
          <UIcon
            name="i-lucide-box"
            class="size-5"
          />
          {{
            row.original.recipesCategory.name
          }}
        </div>
      </div>
      <div
        v-else
        class="ml-[20%] flex items-center gap-2"
      >
        <UIcon
          name="i-lucide-cooking-pot"
          class="size-5"
        />
        {{ row.original.name }}
      </div>
    </template>
  </UTable>
</template>

<style>

</style>
