export type IngredientsDashboard = {
  name: string;
  createdAt: string;
  updatedAt: string;
  foodTypeId: number;
  seasonalMonths: unknown;
  recipes: {
    id: number;
    recipeId: number;
    ingredientId: number;
    quantity: number;
    unitId: number | null;
  }[];
};

export type IngredientsRecipesDashboard = {
  id: number;
  recipeId: number;
  ingredientId: number;
  quantity: number;
  unitId: number | null;
};
