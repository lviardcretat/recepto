import { getIngredients } from '~/server/data/ingredients';

export default defineEventHandler(async (_event) => {
	return await getIngredients();
});
