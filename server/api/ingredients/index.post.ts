import { ingredientCreationSchema } from '~/schemas/creation/ingredient';
import { postIngredient } from '~/server/data/ingredients';
import type { Ingredient } from '~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
	const body = await readValidatedBody(event, ingredientCreationSchema.parse);
	const ingredient: Ingredient = await postIngredient(
		body.name,
		body.foodTypeId,
		body.seasonalMonths,
		1,
	);
	return ingredient;
});
