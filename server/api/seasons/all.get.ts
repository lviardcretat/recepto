import { getSeasons } from '~~/server/data/seasons';
import type { Season } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
  // Cache-Control: 24 hours edge cache, 7 days stale-while-revalidate (static data)
  setHeader(event, 'Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');

  const seasons: Season[] = await getSeasons();
  if (!seasons) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Seasons not found',
    });
  }
  return seasons;
});
