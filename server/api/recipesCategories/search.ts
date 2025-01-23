import { getRecipesCategoriesAndRecipesNames } from '~/server/data/recipesCategories';

export default defineEventHandler(async (_event) => {
	const query = getQuery(_event);
	const name = query.name ?? '';
	const recipesCategoriesSearched = await getRecipesCategoriesAndRecipesNames(
		name.toString().trim(),
	);
	if (!recipesCategoriesSearched) {
		throw createError({
			statusCode: 404,
			statusMessage: 'RecipesCategoriesSearched not found',
		});
	}
	return recipesCategoriesSearched;
});
