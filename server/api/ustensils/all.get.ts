import { getUstensils } from '~~/server/data/ustensils';
import type { Ustensil } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async () => {
  const ustensils: Ustensil[] = await getUstensils();
  if (!ustensils) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Ustensils not found',
    });
  }
  return ustensils;
});
