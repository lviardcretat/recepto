import { getUstensils } from '~/server/data/ustensils';

export default defineEventHandler(async (_event) => {
	const ustensils = await getUstensils();
	if (!ustensils) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Ustensils not found',
		});
	}
	return ustensils;
});
