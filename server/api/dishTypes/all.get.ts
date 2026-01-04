import { getDishTypes } from '~~/server/data/dishTypes';
import type { DishType } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
  // Cache-Control: 1 hour edge cache, 24 hours stale-while-revalidate
  setHeader(event, 'Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  const dishTypes: DishType[] = await getDishTypes();
  if (!dishTypes) {
    throw createError({
      statusCode: 404,
      statusMessage: 'DishTypes not found',
    });
  }
  return dishTypes;
});
