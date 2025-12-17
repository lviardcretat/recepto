import type { IRecipesDashboard } from '~/types/recipe/dashboard';
import { getRecipesWithRecipesCategoriesDashboard } from '~~/server/data/recipes';

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  if (session && !session.user.isAnonymous) {
    const recipes: IRecipesDashboard[] = await getRecipesWithRecipesCategoriesDashboard(+session.user.id);
    if (!recipes) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Recipes not found',
      });
    }
    return recipes;
  }
});
