import { getRecipesFiltered } from '~/server/data/recipes';

export default defineEventHandler(async (_event) => {
	const recipesFiltered = await getRecipesFiltered(_event);
	return recipesFiltered;
});
