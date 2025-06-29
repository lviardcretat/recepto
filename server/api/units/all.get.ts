import { getUnits } from '~~/server/data/units';
import type { Unit } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async () => {
	const units: Unit[] = await getUnits();
	if (!units) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Units not found',
		});
	}
	return units;
});
