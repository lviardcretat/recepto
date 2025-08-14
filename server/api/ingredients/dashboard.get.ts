import { getIngredientsDashboard } from '~~/server/data/ingredients';
import type { Ingredient } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  if (session && !session.user.isAnonymous) {
    const ingredients: Partial<Ingredient>[] = await getIngredientsDashboard(+session.user.id);
    if (!ingredients) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Recipes not found',
      });
    }
    return ingredients;
  }
});
