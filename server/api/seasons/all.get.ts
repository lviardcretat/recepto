import { getSeasons } from '~/server/data/seasons';
import type { Season } from '~/server/utils/drizzle';

export default defineEventHandler(async () => {
	const seasons: Season[] = await getSeasons();
	if (!seasons) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Seasons not found',
		});
	}
	return seasons;
});
