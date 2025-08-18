export type RecipesDashboard = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  recipesCategoryId: number;
  dishTypeId?: number;
  recipesCategory: {
    id: number;
    name: string;
    dishTypeId: number;
    createdAt: string;
    updatedAt: string;
  };
};
