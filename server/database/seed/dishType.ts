import type { DishTypeInsert } from '~~/server/utils/drizzleUtils';

export const dishTypesSeed: DishTypeInsert[] = [
  {
    id: 1,
    name: 'Apéritif',
    createdById: 4,
  },
  {
    id: 2,
    name: 'Entrée',
    createdById: 4,
  },
  {
    id: 3,
    name: 'Plat de résistance',
    createdById: 4,
  },
  {
    id: 4,
    name: 'Fromage',
    createdById: 4,
  },
  {
    id: 5,
    name: 'Dessert',
    createdById: 4,
  },
  {
    id: 6,
    name: 'Digestif',
    createdById: 4,
  },
];
