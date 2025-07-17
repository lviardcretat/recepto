<script lang="ts" setup>
import { getGroupedRowModel } from '@tanstack/vue-table';
import type { GroupingOptions } from '@tanstack/vue-table';
import type { RecipesDashboard } from '~/types/recipesDashboard';

const { d, t } = useI18n();
const UButton = resolveComponent('UButton');
const UDropdownMenu = resolveComponent('UDropdownMenu');

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

const columns = [
  {
    id: 'name',
    header: t('dashboard.name'),
  },
  {
    id: 'id',
    accessorKey: 'recipesCategory.id',
  },
  {
    accessorKey: 'count',
    header: '',
    cell: ({ row }) =>
      row.getIsGrouped() ? `${row.getValue('id')} ${t('dashboard.recipesTableComponent.recipes', row.getValue('id'))}` : ``,
    aggregationFn: 'count',
  },
  {
    accessorKey: 'createdAt',
    header: t('dashboard.createdAt'),
    cell: ({ row }) => {
      return d(row.getValue('createdAt'), 'short');
    },
    aggregationFn: 'max',
  },
  {
    accessorKey: 'updatedAt',
    header: t('dashboard.updatedAt'),
    cell: ({ row }) => {
      return d(row.getValue('updatedAt'), 'short');
    },
    aggregationFn: 'max',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            'content': {
              align: 'end',
            },
            'items': getRowItems(row),
            'aria-label': 'Actions dropdown',
          },
          () =>
            h(UButton, {
              'icon': 'i-lucide-ellipsis-vertical',
              'color': 'neutral',
              'variant': 'ghost',
              'class': 'ml-auto',
              'aria-label': 'Actions dropdown',
            }),
        ),
      );
    },
  },
];

function getRowItems(row) {
  return [
    {
      label: 'Editer',
      icon: 'i-lucide-square-pen',
      color: 'primary',
    },
    {
      label: 'Supprimer',
      icon: 'i-lucide-trash',
      color: 'error',
      disabled: row.subRows.length > 0,
    },
  ];
}

const grouping_options = ref<GroupingOptions>({
  groupedColumnMode: 'remove',
  getGroupedRowModel: getGroupedRowModel(),
});
</script>

<template>
  <UTable
    :data="recipesCategories"
    :columns="columns"
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
