import { getFoodTypes } from '~~/server/data/foodTypes';
import type { FoodType } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
  // Cache-Control: 1 hour edge cache, 24 hours stale-while-revalidate
  setHeader(event, 'Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  const foodTypes: FoodType[] = await getFoodTypes();
  if (!foodTypes) {
    throw createError({
      statusCode: 404,
      statusMessage: 'FoodTypes not found',
    });
  }
  return foodTypes;
});
