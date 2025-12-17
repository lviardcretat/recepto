import type { IItemsIdsWantedOrNot } from '../filter/items';

/**
 * Filter params for recipes
 */
export interface IRecipesFilterParams {
  ingredients: { wanted: number[]; notWanted: number[] };
  ustensils: { wanted: number[]; notWanted: number[] };
  allergens: number[];
  seasonalRecipes: boolean;
  recipeCategoryId: string | number;
}

/**
 * Query params for fetching recipes
 */
export interface IFetchRecipesQuery {
  ingredients: IItemsIdsWantedOrNot;
  ustensils: IItemsIdsWantedOrNot;
  allergens: number[];
  seasonalRecipes: boolean;
  recipeCategoryId: string | string[];
}
