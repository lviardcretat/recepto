import { getRecipesCategory } from '~/server/data/recipesCategories';

export default defineEventHandler(async (event) => {
	const id = Number(event.context.params?.id);
	if (id) {
		throw createError({
			statusCode: 404,
			statusMessage: 'RecipesCategory Id unvalid',
		});
	}
	const recipesCategory = await getRecipesCategory(id);
	if (!recipesCategory) {
		throw createError({
			statusCode: 404,
			statusMessage: 'RecipesCategory not found',
		});
	}
	return recipesCategory;
});
