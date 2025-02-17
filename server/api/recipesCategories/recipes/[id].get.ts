import { getRecipe } from '~/server/data/recipes';
import { idSchema } from '~/global/validationSchemas';
import type { RecipeDetail } from '~/global/types';

export default defineEventHandler(async (event) => {
	const { id } = await getValidatedRouterParams(event, idSchema.parse);
	const recipe: RecipeDetail | undefined = await getRecipe(id);
	if (!recipe) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Recipe not found',
		});
	}
	return recipe;
});
