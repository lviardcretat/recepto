import { getDishTypes } from '~~/server/data/dishTypes';
import type { DishType } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async () => {
	const dishTypes: DishType[] = await getDishTypes();
	if (!dishTypes) {
		throw createError({
			statusCode: 404,
			statusMessage: 'DishTypes not found',
		});
	}
	return dishTypes;
});
