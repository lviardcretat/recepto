import { getRecipesCategoriesAndRecipesNames } from '~/server/data/recipesCategories';
import { namesSearchBarSchema } from '~/schemas/search';
import type { RecipeSearched } from '~/types/search';

export default defineEventHandler(async (event) => {
	const result = await getValidatedQuery(event, namesSearchBarSchema.safeParse);
	if (!result.success) {
		return null;
	}
	const recipesCategoriesSearched: RecipeSearched[] =
		await getRecipesCategoriesAndRecipesNames(result.data.name);
	if (!recipesCategoriesSearched) {
		throw createError({
			statusCode: 404,
			statusMessage: 'RecipesCategoriesSearched not found',
		});
	}
	return recipesCategoriesSearched;
});
