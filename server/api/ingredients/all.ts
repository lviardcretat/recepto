import type { Ingredient } from '@prisma/client';
import { getIngredients } from '~/server/data/ingredients';

export default defineEventHandler(async (_event) => {
	const ingredients: Ingredient[] | null = await getIngredients();
	return ingredients;
});
