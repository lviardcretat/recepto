import {
	getRecipesCategory,
	getRecipesCategoryName,
} from '~/server/data/recipesCategories';
import { idSchema } from '~/global/validationSchemas';

export default defineEventHandler(async (event) => {
	const { id } = await getValidatedRouterParams(event, idSchema.parse);
	const onlyName = Boolean(event.context.params?.onlyName ?? false);
	const recipesCategory = onlyName
		? await getRecipesCategoryName(id)
		: await getRecipesCategory(id);
	if (!recipesCategory) {
		throw createError({
			statusCode: 404,
			statusMessage: 'RecipesCategory not found',
		});
	}
	return recipesCategory;
});
