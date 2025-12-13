export type IngredientsDashboard = {
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
};

export type IngredientsRecipesDashboard = {
  id: number;
  recipeId: number;
  ingredientId: number;
  quantity: number;
  unitId: number | null;
};
