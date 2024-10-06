import { getRecipesCategory } from '~~/server/data/recipesCategories';

export default defineEventHandler(async (event) => {
	const id = Number(event.context.params?.id);
	const recipesCategory = await getRecipesCategory(id);
	if (!recipesCategory) {
		const notFoundError = createError({
			statusCode: 404,
			statusMessage: 'RecipesCategory not found ',
		});
		sendError(event, notFoundError);
	}
	return recipesCategory;
});
