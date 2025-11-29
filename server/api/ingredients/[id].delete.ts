import { deleteIngredient, getIngredient } from '~~/server/data/ingredients';
import { idSchema } from '~/schemas/businessObjects';
import type { Ingredient } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const { id } = await getValidatedRouterParams(event, idSchema.parse);

  // Check if ingredient exists and belongs to user
  const existingIngredient: Ingredient | undefined = await getIngredient(id);
  if (!existingIngredient) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Ingredient not found',
    });
  }

  if (existingIngredient.createdById !== user.id) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden: You can only delete your own ingredients',
    });
  }

  // Check if ingredient is used in any recipe
  const ingredientUsages = await useDrizzle()
    .select()
    .from(tables.recipeIngredient)
    .where(eq(tables.recipeIngredient.ingredientId, id))
    .limit(1)
    .get();

  if (ingredientUsages) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cannot delete ingredient: It is currently used in recipes',
    });
  }

  await deleteIngredient(id);

  return { success: true };
});
