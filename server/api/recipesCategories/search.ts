import { getRecipesCategoriesAndRecipesNames } from '~/server/data/recipesCategories';

export default defineEventHandler(async (_event) => {
	const query = getQuery(_event);
	const name = query.name ?? '';
	const recipesCategories = await getRecipesCategoriesAndRecipesNames(
		name.toString().trim(),
	);
	return recipesCategories;
});
