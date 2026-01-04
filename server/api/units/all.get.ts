import { getUnits } from '~~/server/data/units';
import type { Unit } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
  // Cache-Control: 1 hour edge cache, 24 hours stale-while-revalidate
  setHeader(event, 'Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  const units: Unit[] = await getUnits();
  if (!units) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Units not found',
    });
  }
  return units;
});
