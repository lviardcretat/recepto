import { ingredientCreationSchema } from '~/global/validationSchemas';
import { postIngredient } from '~/server/data/ingredients';

export default defineEventHandler(async (event) => {
	const body = await readValidatedBody(event, ingredientCreationSchema.parse);
	const ustensil = await postIngredient(
		body.name,
		body.foodTypeId,
		body.seasonalMonths,
		1,
	);
	return ustensil;
});
