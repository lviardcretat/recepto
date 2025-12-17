import type { IItemsIdsWantedOrNot } from '../filter/items';

/**
 * Filter params for recipes categories
 */
export interface IRecipesCategoriesFilterParams {
  ingredients: { wanted: number[]; notWanted: number[] };
  ustensils: { wanted: number[]; notWanted: number[] };
  mealTypes?: { wanted: number[]; notWanted: number[] };
  dishTypes?: { wanted: number[]; notWanted: number[] };
  allergens: number[];
  seasonalRecipes: boolean;
}

/**
 * Query params for fetching recipes categories
 */
export interface IFetchRecipesCategoriesQuery {
  ingredients: IItemsIdsWantedOrNot;
  ustensils: IItemsIdsWantedOrNot;
  mealTypes: IItemsIdsWantedOrNot;
  dishTypes: IItemsIdsWantedOrNot;
  allergens: number[];
  seasonalRecipes: boolean;
}
