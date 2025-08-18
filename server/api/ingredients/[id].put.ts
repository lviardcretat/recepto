import { updateIngredient, getIngredient } from '~~/server/data/ingredients';
import { idSchema } from '~/schemas/businessObjects';
import { ingredientCreationSchema } from '~/schemas/creation/ingredient';
import type { Ingredient } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const { id } = await getValidatedRouterParams(event, idSchema.parse);
  const body = await readValidatedBody(event, ingredientCreationSchema.parse);
  
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
      statusMessage: 'Forbidden: You can only edit your own ingredients',
    });
  }
  
  const updatedIngredient = await updateIngredient(id, {
    ...body,
    updatedAt: new Date().toISOString(),
  });
  
  return updatedIngredient;
});