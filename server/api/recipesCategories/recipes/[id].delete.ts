import { deleteRecipe, getRecipeBasic } from '~~/server/data/recipes';
import { idSchema } from '~/schemas/businessObjects';
import type { Recipe } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const { id } = await getValidatedRouterParams(event, idSchema.parse);

  // Check if recipe exists and belongs to user
  const existingRecipe: Recipe | undefined = await getRecipeBasic(id);
  if (!existingRecipe) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Recipe not found',
    });
  }

  if (existingRecipe.createdById !== user.id) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden: You can only delete your own recipes',
    });
  }

  await deleteRecipe(id);

  return { success: true };
});
