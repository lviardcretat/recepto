import { getFoodTypes } from '~/server/data/foodTypes';

export default defineEventHandler(async (_event) => {
	const foodTypes = await getFoodTypes();
	if (!foodTypes) {
		throw createError({
			statusCode: 404,
			statusMessage: 'FoodTypes not found',
		});
	}
	return foodTypes;
});
