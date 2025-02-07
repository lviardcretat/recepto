import { getUnits } from '~/server/data/units';

export default defineEventHandler(async () => {
	const units = await getUnits();
	if (!units) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Units not found',
		});
	}
	return units;
});
