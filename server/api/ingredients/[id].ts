import type { Ingredient } from '@prisma/client';
import { getIngredient } from '~~/server/data/ingredients';

export default defineEventHandler(async (event) => {
	const id = Number(event.context.params?.id);
	const ingredient: Ingredient | null = await getIngredient(id);
	if (!ingredient) {
		const notFoundError = createError({
			statusCode: 404,
			statusMessage: 'Ingredient not found ',
		});
		sendError(event, notFoundError);
	}
	return ingredient;
});
