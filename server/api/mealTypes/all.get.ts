import { getMealTypes } from '~/server/data/mealTypes';

export default defineEventHandler(async () => {
	const mealTypes = await getMealTypes();
	if (!mealTypes) {
		throw createError({
			statusCode: 404,
			statusMessage: 'MealTypes not found',
		});
	}
	return mealTypes;
});
