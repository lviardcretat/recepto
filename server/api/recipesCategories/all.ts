import { getRecipesCategories } from '~/server/data/recipesCategories';

export default defineEventHandler(async (_event) => {
	const recipesCategories = await getRecipesCategories();
	if (!recipesCategories) {
		throw createError({
			statusCode: 404,
			statusMessage: 'RecipesCategories not found',
		});
	}
	return recipesCategories;
});
