import { getAllergens } from '~~/server/data/allergens';
import type { Allergen } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
  // Cache-Control: 1 hour edge cache, 24 hours stale-while-revalidate
  setHeader(event, 'Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  const allergens: Allergen[] = await getAllergens();
  if (!allergens) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Allergens not found',
    });
  }
  return allergens;
});
