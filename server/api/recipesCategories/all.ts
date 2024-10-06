import { getRecipesCategories } from '~/server/data/recipesCategories';

export default defineEventHandler(async (_event) => {
	const recipesCategories = await getRecipesCategories();
	return recipesCategories;
});
