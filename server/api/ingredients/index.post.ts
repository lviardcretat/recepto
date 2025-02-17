import { ingredientCreationSchema } from '~/global/validationSchemas';
import { postIngredient } from '~/server/data/ingredients';
import type { Ingredient } from '~/server/utils/drizzle';

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
