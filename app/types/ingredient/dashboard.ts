/**
 * Ingredient dashboard model
 */
export interface IIngredientsDashboard {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  foodTypeId: number;
  seasonalMonths: number[][] | null;
  recipes: {
    id: number;
    recipeId: number;
    ingredientId: number;
    quantity: number;
    unitId: number | null;
  }[];
}

/**
 * Ingredient-recipe relation for dashboard
 */
export interface IIngredientsRecipesDashboard {
  id: number;
  recipeId: number;
  ingredientId: number;
  quantity: number;
  unitId: number | null;
}
