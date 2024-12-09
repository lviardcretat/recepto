import { getSeasons } from '~/server/data/seasons';

export default defineEventHandler(async (_event) => {
	const seasons = await getSeasons();
	return seasons;
});
