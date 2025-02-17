import { getIngredient } from '~/server/data/ingredients';
import { idSchema } from '~/global/validationSchemas';
import type { Ingredient } from '~/server/utils/drizzle';

export default defineEventHandler(async (event) => {
	const { id } = await getValidatedRouterParams(event, idSchema.parse);
	const ingredient: Ingredient | undefined = await getIngredient(id);
	if (!ingredient) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Ingredient not found',
		});
	}
	return ingredient;
});
