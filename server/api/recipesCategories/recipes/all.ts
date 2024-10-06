import { getRecipes } from '~/server/data/recipes';

export default defineEventHandler(async (_event) => {
	return await getRecipes();
});
