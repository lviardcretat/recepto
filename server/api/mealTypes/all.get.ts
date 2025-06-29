import { getMealTypes } from '~/server/data/mealTypes';
import type { MealType } from '~/server/utils/drizzleUtils';

export default defineEventHandler(async () => {
	const mealTypes: MealType[] = await getMealTypes();
	if (!mealTypes) {
		throw createError({
			statusCode: 404,
			statusMessage: 'MealTypes not found',
		});
	}
	return mealTypes;
});
