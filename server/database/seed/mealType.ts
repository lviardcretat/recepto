import type { MealTypeInsert } from '~~/server/utils/drizzleUtils';

export const mealTypesSeed: MealTypeInsert[] = [
  {
    id: 1,
    name: 'Petit-déjeuner',
    createdById: 1,
  },
  {
    id: 2,
    name: 'Déjeuner',
    createdById: 1,
  },
  {
    id: 3,
    name: 'Goûter',
    createdById: 1,
  },
  {
    id: 4,
    name: 'Apéro',
    createdById: 1,
  },
  {
    id: 5,
    name: 'Dîner',
    createdById: 1,
  },
];
