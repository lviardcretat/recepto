import { getRecipesCategoriesAndRecipesNames } from '~~/server/data/recipesCategories';
import type { RecipeSearched } from '~/types/search';

export default defineEventHandler(async (_event) => {
  const recipesCategoriesSearched: RecipeSearched[] = await getRecipesCategoriesAndRecipesNames();
  if (!recipesCategoriesSearched) {
    throw createError({
      statusCode: 404,
      statusMessage: 'RecipesCategoriesSearched not found',
    });
  }
  return recipesCategoriesSearched;
});
