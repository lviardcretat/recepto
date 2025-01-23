import type { RecipesWithLessData } from '~/global/types';
import { getRecipesFiltered } from '~/server/data/recipes';

export default defineEventHandler(async (_event) => {
	const recipesFiltered: RecipesWithLessData[] =
		await getRecipesFiltered(_event);
	if (!recipesFiltered) {
		throw createError({
			statusCode: 404,
			statusMessage: 'RecipesFiltered not found',
		});
	}
	return recipesFiltered;
});
