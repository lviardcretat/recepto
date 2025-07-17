<script lang="ts" setup>
const { d, t } = useI18n();
const UButton = resolveComponent('UButton');
const UDropdownMenu = resolveComponent('UDropdownMenu');

const { data: ingredients, execute: executeIngredientsFetch } = await useFetch<Partial<Ingredient>[]>(
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

const columns = [
  {
    accessorKey: 'name',
    header: t('dashboard.name'),
  },
  {
    accessorKey: 'recipes',
    header: t('dashboard.ingredientsTableComponent.recipesCount'),
    cell: ({ row }) => {
      return `${row.getValue('recipes').length} ${t('dashboard.ingredientsTableComponent.recipes', row.getValue('recipes').length)}`;
    },
  },
  {
    accessorKey: 'foodTypeId',
    header: t('dashboard.ingredientsTableComponent.foodType'),
    cell: ({ row }) => {
      return foodTypesFetch.value?.find(foodType => foodType.id === row.getValue('foodTypeId'))?.name ?? '/';
    },
  },
  {
    accessorKey: 'seasonalMonths',
    header: t('dashboard.ingredientsTableComponent.seasonalMonths'),
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
      disabled: row.getValue('recipes').length > 0,
    },
  ];
}
</script>

<template>
  <UTable
    :data="ingredients"
    :columns="columns"
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
