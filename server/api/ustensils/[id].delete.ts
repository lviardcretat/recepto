import { deleteUstensil, getUstensil } from '~~/server/data/ustensils';
import { idSchema } from '~/schemas/businessObjects';
import type { Ustensil } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const { id } = await getValidatedRouterParams(event, idSchema.parse);
  
  // Check if ustensil exists and belongs to user
  const existingUstensil: Ustensil | undefined = await getUstensil(id);
  if (!existingUstensil) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Ustensil not found',
    });
  }
  
  if (existingUstensil.createdById !== user.id) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden: You can only delete your own ustensils',
    });
  }
  
  // Check if ustensil is used in any recipe
  const ustensilUsages = await useDrizzle()
    .select()
    .from(tables.recipeToUstensil)
    .where(eq(tables.recipeToUstensil.ustensilId, id))
    .limit(1)
    .get();
    
  if (ustensilUsages) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cannot delete ustensil: It is currently used in recipes',
    });
  }
  
  await deleteUstensil(id);
  
  return { success: true };
});