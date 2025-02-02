import { getDishTypes } from '~/server/data/dishTypes';

export default defineEventHandler(async () => {
	const dishTypes = await getDishTypes();
	if (!dishTypes) {
		throw createError({
			statusCode: 404,
			statusMessage: 'DishTypes not found',
		});
	}
	return dishTypes;
});
