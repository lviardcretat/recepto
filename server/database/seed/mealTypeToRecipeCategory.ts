import type { MealTypeToRecipeCategoryInsert } from '~~/server/utils/drizzleUtils';

export const mealTypeToRecipeCategoriesSeed: MealTypeToRecipeCategoryInsert[] = [
  {
    mealTypeId: 2,
    recipeCategoryId: 1,
  },
  {
    mealTypeId: 5,
    recipeCategoryId: 1,
  },
  {
    mealTypeId: 3,
    recipeCategoryId: 2,
  },
  {
    mealTypeId: 1,
    recipeCategoryId: 2,
  },
  {
    mealTypeId: 3,
    recipeCategoryId: 3,
  },
];
