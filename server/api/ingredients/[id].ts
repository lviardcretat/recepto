import { getIngredient } from '~~/server/data/ingredients';

export default defineEventHandler(async (event) => {
	const id = Number(event.context.params?.id);
	const ingredient = await getIngredient(id);
	if (!ingredient) {
		const notFoundError = createError({
			statusCode: 404,
			statusMessage: 'Ingredient not found ',
		});
		sendError(event, notFoundError);
	}
	return ingredient;
});
