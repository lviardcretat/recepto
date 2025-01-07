import { getRecipesFiltered } from '~/server/data/recipes';

export default defineEventHandler(async (_event) => {
	const recipesFiltered = await getRecipesFiltered(_event);
	if (!recipesFiltered) {
		throw createError({
			statusCode: 404,
			statusMessage: 'RecipesFiltered not found',
		});
	}
	return recipesFiltered;
});
