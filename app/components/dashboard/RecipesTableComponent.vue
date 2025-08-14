<script lang="ts" setup>
import { ModalDelete } from '#components';
import { getGroupedRowModel } from '@tanstack/vue-table';
import type { GroupingOptions, Row } from '@tanstack/vue-table';
import { getRecipesTableConfig } from '~/config/dashboard/RecipesTableConfig';
import type { RecipesDashboard } from '~/types/recipesDashboard';

const { d, t, locale } = useI18n();
const overlay = useOverlay();
const UButton = resolveComponent('UButton');
const UDropdownMenu = resolveComponent('UDropdownMenu');
const deleteModal = overlay.create(ModalDelete, { props: { itemName: 'blabla', onCancel: () => {}, onConfirm: () => {} } });
const recipeTableConfig = getRecipesTableConfig(d, t, { buttonComponent: UButton, dropdownMenuComponent: UDropdownMenu, onDeleteButtonOpen: deleteModal.open });

const { data: recipesCategories, execute: executeRecipesCategoriesFetch } = await useFetch<RecipesDashboard[]>(
  '/api/recipesCategories/recipes/dashboard',
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

await executeRecipesCategoriesFetch();

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
