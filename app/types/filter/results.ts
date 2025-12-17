import type { IRecipesCategoriesWithLessData } from '../recipesCategory/detail';
import type { IRecipeWithLessData } from '../recipe/detail';

/**
 * Filter results containing recipes and categories
 */
export interface IFilterResults {
  recipesCategories: IRecipesCategoriesWithLessData[];
  recipes: IRecipeWithLessData[];
}
