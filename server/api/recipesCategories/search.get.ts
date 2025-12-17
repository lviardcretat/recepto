import { getRecipesCategoriesAndRecipesNames } from '~~/server/data/recipesCategories';
import type { IRecipeSearched } from '~/types/recipesCategory/detail';

export default defineEventHandler(async (_event) => {
  const recipesCategoriesSearched: IRecipeSearched[] = await getRecipesCategoriesAndRecipesNames();
  if (!recipesCategoriesSearched) {
    throw createError({
      statusCode: 404,
      statusMessage: 'RecipesCategoriesSearched not found',
    });
  }
  return recipesCategoriesSearched;
});
