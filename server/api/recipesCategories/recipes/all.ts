import { getRecipes } from '~/server/data/recipes';

export default defineEventHandler(async (_event) => {
	const recipes = await getRecipes();
	if (!recipes) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Recipes not found',
		});
	}
	return recipes;
});
