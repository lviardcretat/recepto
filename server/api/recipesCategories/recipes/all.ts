import { getRecipes } from '~/server/data/recipes';

export default defineEventHandler(async (_event) => {
	const recipes = await getRecipes();
	return recipes;
});
