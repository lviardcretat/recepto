import { getMealTypes } from '~~/server/data/mealTypes';
import type { MealType } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
  // Cache-Control: 1 hour edge cache, 24 hours stale-while-revalidate
  setHeader(event, 'Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  const mealTypes: MealType[] = await getMealTypes();
  if (!mealTypes) {
    throw createError({
      statusCode: 404,
      statusMessage: 'MealTypes not found',
    });
  }
  return mealTypes;
});
