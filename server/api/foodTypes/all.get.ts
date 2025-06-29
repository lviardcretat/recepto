import { getFoodTypes } from '~~/server/data/foodTypes';
import type { FoodType } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async () => {
	const foodTypes: FoodType[] = await getFoodTypes();
	if (!foodTypes) {
		throw createError({
			statusCode: 404,
			statusMessage: 'FoodTypes not found',
		});
	}
	return foodTypes;
});
