import { getIngredient } from '~/server/data/ingredients';
import { idSchema } from '~/global/validationSchemas';

export default defineEventHandler(async (event) => {
	const { id } = await getValidatedRouterParams(event, idSchema.parse);
	const ingredient = await getIngredient(id);
	if (!ingredient) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Ingredient not found',
		});
	}
	return ingredient;
});
