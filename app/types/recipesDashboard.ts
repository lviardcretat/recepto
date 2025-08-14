export type RecipesDashboard = {
  name: string;
  createdAt: string;
  updatedAt: string;
  recipesCategoryId: number;
  recipesCategory: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
};
