import { idSchema } from '~/schemas/businessObjects';
import { Ustensil } from '~~/server/utils/drizzleUtils';
import { getUstensil } from '~~/server/data/ustensils';

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, idSchema.parse);
  const ustensil: Ustensil | undefined = await getUstensil(id);
  if (!ustensil) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Ustensil not found',
    });
  }
  return ustensil;
});
