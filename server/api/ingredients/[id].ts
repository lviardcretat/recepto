import { getIngredient } from '~/server/data/ingredients';

export default defineEventHandler(async (event) => {
	const id = Number(event.context.params?.id);
	if (id) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Ingredient Id unvalid',
		});
	}
	const ingredient = await getIngredient(id);
	if (!ingredient) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Ingredient not found',
		});
	}
	return ingredient;
});
