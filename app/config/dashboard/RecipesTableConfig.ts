import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui';
import type { Row } from '@tanstack/vue-table';
import type { Composer } from 'vue-i18n';
import type { ConcreteComponent, ComputedOptions, MethodOptions } from 'vue';
import type { IICustomAccordionItem } from '~/types/filter/accordion';
import type { IIRecipesDashboard } from '~/types/recipe/dashboard';

interface RecipesTableConfigProps {
  buttonComponent: string | ConcreteComponent<{}, any, any, ComputedOptions, MethodOptions, {}, any>;
  dropdownMenuComponent: string | ConcreteComponent<{}, any, any, ComputedOptions, MethodOptions, {}, any>;
  onEditButtonOpen: (recipe: IRecipesDashboard) => void;
  onDeleteButtonOpen: (recipe: IRecipesDashboard) => void;
  onEditCategoryButtonOpen: (category: IRecipesDashboard) => void;
  onDeleteCategoryButtonOpen: (category: IRecipesDashboard) => void;
};

function getRowItems(row: Row<IRecipesDashboard>, props: RecipesTableConfigProps) {
  const isCategory = row.getIsGrouped();

  if (isCategory) {
    return [
      {
        label: 'Editer',
        icon: 'i-lucide-square-pen',
        color: 'primary',
        onClick: () => props.onEditCategoryButtonOpen(row.original),
      },
      {
        label: 'Supprimer',
        icon: 'i-lucide-trash',
        color: 'error',
        disabled: row.subRows.length > 0,
        onClick: () => props.onDeleteCategoryButtonOpen(row.original),
      },
    ] satisfies DropdownMenuItem[];
  }
  else {
    const parentRow = row.getParentRow();
    return [
      {
        label: 'Editer',
        icon: 'i-lucide-square-pen',
        color: 'primary',
        onClick: () => props.onEditButtonOpen(row.original),
      },
      {
        label: 'Supprimer',
        icon: 'i-lucide-trash',
        color: 'error',
        onClick: () => props.onDeleteButtonOpen(row.original),
      },
    ] satisfies DropdownMenuItem[];
  }
}

export function getRecipesTableConfig(
  d: Composer['d'],
  t: Composer['t'],
  props: RecipesTableConfigProps,
): Ref<(NavigationMenuItem & ICustomAccordionItem)[]> {
  return computed(() =>
    [
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
        cell: ({ row }: { row: Row<IRecipesDashboard> }) => {
          return row.getIsGrouped() ? `${row.subRows.length} ${t('dashboard.recipesTableComponent.recipes', row.subRows.length)}` : ``;
        },
        aggregationFn: 'count',
      },
      {
        accessorKey: 'createdAt',
        header: t('dashboard.createdAt'),
        cell: ({ row }: { row: Row<IRecipesDashboard> }) => {
          return d(row.getValue<string>('createdAt'), 'short');
        },
        aggregationFn: 'max',
      },
      {
        accessorKey: 'updatedAt',
        header: t('dashboard.updatedAt'),
        cell: ({ row }: { row: Row<IRecipesDashboard> }) => {
          return d(row.getValue<string>('updatedAt'), 'short');
        },
        aggregationFn: 'max',
      },
      {
        id: 'actions',
        cell: ({ row }: { row: Row<IRecipesDashboard> }) => {
          return h(
            'div',
            { class: 'text-right' },
            h(
              props.dropdownMenuComponent,
              {
                'content': {
                  align: 'end',
                },
                'items': getRowItems(row, props),
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
    ],
  );
}
