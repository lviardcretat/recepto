import { getRecipe } from '~/server/data/recipes';
import { idSchema } from '~/global/validationSchemas';

export default defineEventHandler(async (event) => {
	const { id } = await getValidatedRouterParams(event, idSchema.parse);
	const recipe = await getRecipe(id);
	if (!recipe) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Recipe not found',
		});
	}
	return recipe;
});
