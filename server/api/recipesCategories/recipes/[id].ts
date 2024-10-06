import { getRecipe } from '~~/server/data/recipes';

export default defineEventHandler(async (event) => {
	const id = Number(event.context.params?.id);
	const recipe = await getRecipe(id);
	if (!recipe) {
		const notFoundError = createError({
			statusCode: 404,
			statusMessage: 'Recipe not found ',
		});
		sendError(event, notFoundError);
	}
	return recipe;
});
