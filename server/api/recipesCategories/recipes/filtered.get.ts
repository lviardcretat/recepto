import { getRecipesFiltered } from '~/server/data/recipes';
import {
	recipesFilterSchema,
	type RecipesFilter,
} from '~/global/validationSchemas';
import type { RecipeWithLessData } from '~/global/types/filter';

export default defineEventHandler(async (event) => {
	const query: RecipesFilter = await getValidatedQuery(
		event,
		recipesFilterSchema.parse,
	);
	const recipesFiltered: RecipeWithLessData[] = await getRecipesFiltered(query);
	if (!recipesFiltered) {
		throw createError({
			statusCode: 404,
			statusMessage: 'RecipesFiltered not found',
		});
	}
	return recipesFiltered;
});
