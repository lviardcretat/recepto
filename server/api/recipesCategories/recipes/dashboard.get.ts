import type { RecipesDashboard } from '~/types/recipesDashboard';
import { getRecipesWithRecipesCategoriesDashboard } from '~~/server/data/recipes';

export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({
    headers: event.headers,
  });
  if (session) {
    const recipes: RecipesDashboard[] = await getRecipesWithRecipesCategoriesDashboard(+session.user.id);
    if (!recipes) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Recipes not found',
      });
    }
    return recipes;
  }
});
