import type { NavigationMenuItem } from '@nuxt/ui';
import type { Row } from '@tanstack/vue-table';
import type { Composer } from 'vue-i18n';
import type { ComputedOptions, ConcreteComponent, MethodOptions } from 'vue';
import type { CustomAccordionItem } from '~/types/filter';
import type { UstensilsDashboard } from '~/types/ustensilsDashboard';

interface UstensilsTableConfigProps {
  buttonComponent: string | ConcreteComponent<{}, any, any, ComputedOptions, MethodOptions, {}, any>;
  dropdownMenuComponent: string | ConcreteComponent<{}, any, any, ComputedOptions, MethodOptions, {}, any>;
  onEditButtonOpen: (ustensil: UstensilsDashboard) => void;
  onDeleteButtonOpen: (ustensil: UstensilsDashboard) => void;
};

function getRowItems(row: Row<UstensilsDashboard>, props: UstensilsTableConfigProps) {
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
      disabled: row.getValue<number>('recipesCount') > 0,
      onClick: () => props.onDeleteButtonOpen(row.original),
    },
  ];
}

export function getUstensilsTableConfig(
  d: Composer['d'],
  t: Composer['t'],
  props: UstensilsTableConfigProps,
): Ref<(NavigationMenuItem & CustomAccordionItem)[]> {
  return computed(() =>
    [
      {
        accessorKey: 'name',
        header: t('dashboard.name'),
      },
      {
        accessorKey: 'recipesCount',
        header: t('dashboard.ustensilsTableComponent.recipesCount'),
        cell: ({ row }: { row: Row<UstensilsDashboard> }) => {
          return `${row.getValue<number>('recipesCount')} ${t('dashboard.ustensilsTableComponent.recipes', row.getValue('recipesCount'))}`;
        },
      },
      {
        accessorKey: 'createdAt',
        header: t('dashboard.createdAt'),
        cell: ({ row }: { row: Row<UstensilsDashboard> }) => {
          return d(row.getValue<string>('createdAt'), 'short');
        },
        aggregationFn: 'max',
      },
      {
        accessorKey: 'updatedAt',
        header: t('dashboard.updatedAt'),
        cell: ({ row }: { row: Row<UstensilsDashboard> }) => {
          return d(row.getValue<string>('updatedAt'), 'short');
        },
        aggregationFn: 'max',
      },
      {
        id: 'actions',
        cell: ({ row }: { row: Row<UstensilsDashboard> }) => {
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
