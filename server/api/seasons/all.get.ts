import { getSeasons } from '~/server/data/seasons';

export default defineEventHandler(async () => {
	const seasons = await getSeasons();
	if (!seasons) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Seasons not found',
		});
	}
	return seasons;
});
