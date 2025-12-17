/**
 * RecipesCategories custom model with less data
 */
export interface IRecipesCategoriesWithLessData {
  id: number;
  name: string;
  count: number;
}

/**
 * Recipes searched type return
 */
export interface IRecipeSearched {
  id: number;
  name: string;
  recipes: { id: number; name: string }[];
}
