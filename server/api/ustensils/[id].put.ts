import { updateUstensil, getUstensil } from '~~/server/data/ustensils';
import { idSchema } from '~/schemas/businessObjects';
import { ustensilCreationSchema } from '~/schemas/creation/ustensil';
import type { Ustensil } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const { id } = await getValidatedRouterParams(event, idSchema.parse);
  const body = await readValidatedBody(event, ustensilCreationSchema.parse);

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
      statusMessage: 'Forbidden: You can only edit your own ustensils',
    });
  }

  const updatedUstensil = await updateUstensil(id, {
    ...body,
    updatedAt: new Date().toISOString(),
  });

  return updatedUstensil;
});
