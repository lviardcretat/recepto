import { getIngredientsSeasonalMonths } from '~/server/data/ingredients';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const foodTypeId: number = Number(JSON.parse(query.foodTypeId as string));
	if (!foodTypeId) {
		throw createError({
			statusCode: 404,
			statusMessage: 'FoodType Id unvalid',
		});
	}
	const ingredients = await getIngredientsSeasonalMonths(foodTypeId);
	if (!ingredients) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Ingredients seasonals not found',
		});
	}
	return ingredients;
});
