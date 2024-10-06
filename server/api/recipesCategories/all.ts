import { getRecipesCategories } from '~/server/data/recipesCategories';

export default defineEventHandler(async (_event) => {
	return await getRecipesCategories();
});
