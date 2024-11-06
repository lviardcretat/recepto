import { getUstensils } from '~/server/data/ustensils';

export default defineEventHandler(async (_event) => {
	const ustensils = await getUstensils();
	return ustensils;
});
