import { getRecipesCategoriesFiltered } from '~/server/data/recipesCategories';

export default defineEventHandler(async (_event) => {
	const recipesCategoriesFiltered = await getRecipesCategoriesFiltered(_event);
	return recipesCategoriesFiltered;
});
