import type { MealTypeInsert } from '~~/server/utils/drizzleUtils';

export const mealTypesSeed: MealTypeInsert[] = [
  {
    id: 1,
    name: 'Petit-déjeuner',
    createdById: 4,
  },
  {
    id: 2,
    name: 'Déjeuner',
    createdById: 4,
  },
  {
    id: 3,
    name: 'Goûter',
    createdById: 4,
  },
  {
    id: 4,
    name: 'Apéro',
    createdById: 4,
  },
  {
    id: 5,
    name: 'Dîner',
    createdById: 4,
  },
];
