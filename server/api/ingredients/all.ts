import { getIngredients } from '~/server/data/ingredients';

export default defineEventHandler(async (_event) => {
	const ingredients = await getIngredients();
	if (!ingredients) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Ingredients not found',
		});
	}
	return ingredients;
});
