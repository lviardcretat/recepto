import type { NavigationMenuItem } from '@nuxt/ui';
import type { Composer } from 'vue-i18n';
import type { Row } from '@tanstack/vue-table';
import type { ConcreteComponent, ComputedOptions, MethodOptions } from 'vue';
import type { CustomAccordionItem } from '~/types/filter';
import type { IngredientsDashboard, IngredientsRecipesDashboard } from '~/types/ingredientsDashboard';

interface IngredientsTableConfigProps {
  buttonComponent: string | ConcreteComponent<{}, any, any, ComputedOptions, MethodOptions, {}, any>;
  dropdownMenuComponent: string | ConcreteComponent<{}, any, any, ComputedOptions, MethodOptions, {}, any>;
  foodTypes: FoodType[]
};

function getRowItems(row: Row<IngredientsDashboard>) {
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
      disabled: row.getValue<IngredientsRecipesDashboard[]>('recipes').length > 0,
    },
  ];
}

export function getIngredientsTableConfig(
  d: Composer['d'],
  t: Composer['t'],
  props: IngredientsTableConfigProps
): Ref<(NavigationMenuItem & CustomAccordionItem)[]> {
  return computed(() =>
    [
      {
        accessorKey: 'name',
        header: t('dashboard.name'),
      },
      {
        accessorKey: 'recipes',
        header: t('dashboard.ingredientsTableComponent.recipesCount'),
        cell: ({ row }: { row: Row<IngredientsDashboard> }) => {
          return `${row.getValue<IngredientsRecipesDashboard[]>('recipes').length} ${t('dashboard.ingredientsTableComponent.recipes', row.getValue<IngredientsRecipesDashboard[]>('recipes').length)}`;
        },
      },
      {
        accessorKey: 'foodTypeId',
        header: t('dashboard.ingredientsTableComponent.foodType'),
        cell: ({ row }: { row: Row<IngredientsDashboard> }) => {
          return props.foodTypes.find(foodType => foodType.id === row.getValue<number>('foodTypeId'))?.name ?? '/';
        },
      },
      {
        accessorKey: 'seasonalMonths',
        header: t('dashboard.ingredientsTableComponent.seasonalMonths'),
      },
      {
        accessorKey: 'createdAt',
        header: t('dashboard.createdAt'),
        cell: ({ row }: { row: Row<IngredientsDashboard> }) => {
          return d(row.getValue<string>('createdAt'), 'short');
        },
        aggregationFn: 'max',
      },
      {
        accessorKey: 'updatedAt',
        header: t('dashboard.updatedAt'),
        cell: ({ row }: { row: Row<IngredientsDashboard> }) => {
          return d(row.getValue<string>('updatedAt'), 'short');
        },
        aggregationFn: 'max',
      },
      {
        id: 'actions',
        cell: ({ row }: { row: Row<IngredientsDashboard> }) => {
          return h(
            'div',
            { class: 'text-right' },
            h(
              props.dropdownMenuComponent,
              {
                'content': {
                  align: 'end',
                },
                'items': getRowItems(row),
                'aria-label': 'Actions dropdown',
              },
              () =>
                h(props.buttonComponent, {
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
    ]
  )
}
