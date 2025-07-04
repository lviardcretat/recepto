import { getIngredients } from '~~/server/data/ingredients';
import type { Ingredient } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async () => {
  const ingredients: Ingredient[] = await getIngredients();
  if (!ingredients) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Ingredients not found',
    });
  }
  return ingredients;
});
