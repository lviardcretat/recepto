<script lang="ts" setup>
import type { Ustensil } from '~~/server/utils/drizzleUtils';

const { d, t } = useI18n();
const UButton = resolveComponent('UButton');
const UDropdownMenu = resolveComponent('UDropdownMenu');

const { data: ustensils, execute: executeUstensilsFetch } = await useFetch<Partial<Ustensil>[]>(
  '/api/ustensils/dashboard',
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

await executeUstensilsFetch();

const columns = [
  {
    accessorKey: 'name',
    header: t('dashboard.name'),
  },
  {
    accessorKey: 'recipesCount',
    header: t('dashboard.ustensilsTableComponent.recipesCount'),
    cell: ({ row }) => {
      return `${row.getValue('recipesCount')} ${t('dashboard.ustensilsTableComponent.recipes', row.getValue('recipesCount'))}`;
    },
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
      disabled: row.getValue('recipesCount') > 0,
    },
  ];
}
</script>

<template>
  <UTable
    :data="ustensils"
    :columns="columns"
  >
    <template #name-cell="{ row }">
      <div
        class="flex items-center gap-2"
      >
        <UIcon
          name="i-lucide-lab-whisk"
          class="size-5"
        />
        {{
          row.getValue('name')
        }}
      </div>
    </template>
  </UTable>
</template>

<style>

</style>
