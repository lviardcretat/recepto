//import { getRecipesCategoriesFiltered } from '~/server/data/recipesCategories';
import {
	recipesCategoriesFilterSchema,
	type RecipesCategoriesFilter,
} from '~/global/validationSchemas';

export default defineEventHandler(async (event) => {
	const query: RecipesCategoriesFilter = await getValidatedQuery(
		event,
		recipesCategoriesFilterSchema.parse,
	);
	const recipesCategoriesFiltered = null; //await getRecipesCategoriesFiltered(query);
	if (!recipesCategoriesFiltered) {
		throw createError({
			statusCode: 404,
			statusMessage: 'RecipesCategoriesFiltered not found',
		});
	}
	return recipesCategoriesFiltered;
});
