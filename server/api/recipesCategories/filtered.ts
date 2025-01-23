import { getRecipesCategoriesFiltered } from '~/server/data/recipesCategories';

export default defineEventHandler(async (_event) => {
	const recipesCategoriesFiltered = await getRecipesCategoriesFiltered(_event);
	if (!recipesCategoriesFiltered) {
		throw createError({
			statusCode: 404,
			statusMessage: 'RecipesCategoriesFiltered not found',
		});
	}
	return recipesCategoriesFiltered;
});
