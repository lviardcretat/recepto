import type { Recipe } from '~/global/types';
import { getRecipe } from '~/server/data/recipes';

export default defineEventHandler(async (event) => {
	const id = Number(event.context.params?.id);
	if (!id) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Recipe Id unvalid',
		});
	}
	const recipe: Recipe | null = await getRecipe(id);
	if (!recipe) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Recipe not found',
		});
	}
	return recipe;
});
